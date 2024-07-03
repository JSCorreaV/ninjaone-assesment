import DeviceListPage from "../pageObjects/DeviceListPage";
import NewDevicePage from "../pageObjects/NewDevicePage";
import { Device } from '../models/Device';
import { compareListOfDevices } from '../utils/CompareDevices';
import { getRandomDeviceType, getRandomNumberString, uuidGenerator } from "../utils/RandomGenerator";
import { getDevices, updateDevice } from '../api/Devices';


fixture`e2e tests for device list`.page("http://localhost:3001");

  test('Test 1: Compare API and UI device lists matches, and verify edit and remove buttons are visible', async (t) => {
    //Step 1: Make an API call to retrieve the list of devices.
    const response = await getDevices();
    await t.expect(response.status).eql(200);

    //Step 2: Use the list of devices to check the elements are visible in the DOM. Check the name, type and capacity of each element of the list using the class names and make sure they are correctly displayed.
    const apiDevices = response.body.map(device => new Device(...Object.values(device)));
    const uiDevicesCount = await DeviceListPage.getDeviceCount();
    const uiDevices = await DeviceListPage.saveListOfDevices();
    await t.expect(uiDevicesCount).eql(apiDevices.length);
    await t.expect(compareListOfDevices(uiDevices, apiDevices)).eql(true);

    //Step 3: Verify that all devices contain the edit and delete buttons.
    for (const device of uiDevices) {
      await t.expect(DeviceListPage.getDeviceEditButtonByName(device.systemName).visible).ok('Edit Button should be visible');
      await t.expect(DeviceListPage.getDeviceRemoveButtonByName(device.systemName).visible).ok('Remove Button should be visible');
    }
  });

  test('Test 2: Create Device and verify its existance on the list', async (t) => {
    //Step 1: Verify that devices can be created properly using the UI.
    DeviceListPage.clickOnaddDevice();
    const uuIdSuffix = uuidGenerator();
    const newDevice = new Device(null, `Device-${uuIdSuffix}`, "MAC" , "10")
    NewDevicePage.fillNewDeviceForm(newDevice.systemName, newDevice.type, newDevice.hddCapacity);
    
    //Step 2: Verify the new device is now visible. Check name, type and capacity are visible and correctly displayed to the user.
    await t.expect(DeviceListPage.getDeviceByName(newDevice.systemName).visible).ok(`Device ${newDevice.systemName} should be visible`);
    await t.expect(DeviceListPage.getDeviceType(newDevice.systemName).innerText).eql(newDevice.type);
    await t.expect(DeviceListPage.getDeviceCapacity(newDevice.systemName).innerText).contains(newDevice.hddCapacity);
  });

  test('Test 3: Rename device on API and verify changes are reflected in UI', async (t) => {
    //Step 1: Make an API call that renames the first device of the list to “Renamed Device”.
    const getDevicesResponse = await getDevices();
    await t.expect(getDevicesResponse.status).eql(200);

    const apiDevices = getDevicesResponse.body.map(device => new Device(...Object.values(device)));
    const firstDeviceId = apiDevices.length > 0 ? apiDevices[0].id : null;
    const newDeviceName = `Renamed Device-${uuidGenerator()}`;
    const updateDeviceResponse = await updateDevice(firstDeviceId, newDeviceName, getRandomDeviceType(), getRandomNumberString());
    await t.expect(updateDeviceResponse.status).eql(200);
    
    //Step 2: Reload the page and verify the modified device has the new name.
    await t.eval(() => window.location.reload(true));
    await t.expect(DeviceListPage.getDeviceByName(newDeviceName).visible).ok(`Device ${newDeviceName} should be visible`);
  });
