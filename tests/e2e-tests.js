import { Selector } from "testcafe";
import DeviceListPage from "../pageObjects/DeviceListPage";
import NewDevicePage from "../pageObjects/NewDevicePage";
import { Device } from '../models/Device';
import { compareListOfDevices } from '../utils/CompareDevices';
import { getDevices } from '../api/Devices';
const uuid = require('short-uuid');

fixture`e2e tests for device list`.page("http://localhost:3001");

  /* Test 1 (required)
  Step 1: Make an API call to retrieve the list of devices.
  Step 2: Use the list of devices to check the elements are visible in the DOM. Check the name, type and capacity of each element of the list using the class names and make sure they are correctly displayed.
  Step 3: Verify that all devices contain the edit and delete buttons.
  */
  test.skip('Test 1: Compare API and UI device lists matches, and verify edit and remove buttons are visible', async (t) => {
    //Step 1
    const response = await getDevices()
    await t.expect(response.status).eql(200);

    //Step 2
    const apiDevices = response.body.map(device => new Device(...Object.values(device)));
    const uiDevicesCount = await DeviceListPage.getDeviceCount();
    const uiDevices = await DeviceListPage.saveListOfDevices();
    await t.expect(uiDevicesCount).eql(apiDevices.length);
    await t.expect(compareListOfDevices(uiDevices, apiDevices)).eql(true)

    //Step 3
    for (const device of uiDevices) {
      await t.expect(DeviceListPage.getDeviceEditButtonByName(device.systemName).visible).ok('Edit Button should be visible');
      await t.expect(DeviceListPage.getDeviceRemoveButtonByName(device.systemName).visible).ok('Remove Button should be visible');
    }
  });

  /* Test 2 (optional)
  Step 1: Verify that devices can be created properly using the UI.
  Step 2: Verify the new device is now visible. Check name, type and capacity are visible and correctly displayed to the user.
  */
  test('Test 2: Create Device and verify its existance on the list', async (t) => {
    //Step 1
    DeviceListPage.clickOnaddDevice();
    const shortName = uuid.generate();
    const newDevice = new Device(null, `Device-${shortName}`, "MAC" , "10")
    NewDevicePage.fillNewDeviceForm(newDevice.systemName, newDevice.type, newDevice.hddCapacity);
    
    //Step 2
    await t.expect(DeviceListPage.getDeviceByName(newDevice.systemName).visible).ok(`Device ${newDevice} should be visible`);
    await t.expect(DeviceListPage.getDeviceType(newDevice.systemName).innerText).eql(newDevice.type);
    await t.expect(DeviceListPage.getDeviceCapacity(newDevice.systemName).innerText).contains(newDevice.hddCapacity);
  });










