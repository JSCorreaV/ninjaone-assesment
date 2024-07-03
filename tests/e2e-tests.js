import { Selector } from "testcafe";
import DeviceListPage from "../pageObjects/DeviceListPage";
import { Device } from '../models/Device';
import { compareListOfDevices } from '../utils/CompareDevices';
import { getDevices } from '../api/Devices';

fixture`e2e tests for device list`.page("http://localhost:3001");

  /* Test 1 (required)
  Step 1: Make an API call to retrieve the list of devices.
  Step 2: Use the list of devices to check the elements are visible in the DOM. Check the name, type and capacity of each element of the list using the class names and make sure they are correctly displayed.
  Step 3: Verify that all devices contain the edit and delete buttons.
  */
test('Compare API and UI device lists', async (t) => {
    //Step 1
    const response = await getDevices()
    await t.expect(response.status).eql(200);

    //Step 2
    const apiDevices = response.body.map(device => new Device(...Object.values(device)));
    const uiDevicesCount = await DeviceListPage.getDeviceCount();
    const uiDevices = await DeviceListPage.saveListOfDevices();
    await t.expect(uiDevicesCount).eql(apiDevices.length);
    await t.expect(compareListOfDevices(uiDevices, apiDevices)).eql(true)

    //TODO: Step 3 with list of devices
    for (const device of uiDevices) {
      await t.expect(DeviceListPage.getDeviceEditButtonByName(device.systemName).visible).ok('Edit Button should be visible');
      await t.expect(DeviceListPage.getDeviceRemoveButtonByName(device.systemName).visible).ok('Remove Button should be visible');
    }
  });










