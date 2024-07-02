import { Selector, t, expect } from 'testcafe';
import DeviceListPage from "../page-objects/DeviceListPage";
import { Device } from '../models/DeviceListModel';
import { compareListOfDevices } from '../utils/CompareDevices';

fixture`e2e tests for device list`.page("http://localhost:3001");

  /*
  Make an API call to retrieve the list of devices.
  Use the list of devices to check the elements are visible in the DOM. Check the name, type and capacity of each element of the list using the class names and make sure they are correctly displayed.
  Verify that all devices contain the edit and delete buttons.
  */
test('Compare API and UI device lists', async (t) => {

    const response = await t.request({
      url: 'http://localhost:3000/devices',
      method: 'GET',
    });
    
    await t.expect(response.status).eql(200);
    const apiDevices = response.body.map(device => new Device(...Object.values(device)));
    const uiDevicesCount = await DeviceListPage.getDeviceCount();
    const uiDevices = await DeviceListPage.jstestSaveDevices();
    await t.expect(uiDevicesCount).eql(apiDevices.length);
    await t.expect(compareListOfDevices(uiDevices, apiDevices)).eql(true)
  });










