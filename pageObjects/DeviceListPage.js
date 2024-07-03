import { Selector, t } from "testcafe";
import { Device } from '../models/Device';

class DeviceListPage {
  constructor(){
    this.addDeviceButton = Selector('.submitButton');
    this.deviceInfoList = Selector(".device-info");
  }

  async clickOnaddDevice() {
    await t.click(this.addDeviceButton);
  }

  async getDeviceCount() {
    return await this.deviceInfoList.count;
  }

  getDeviceByName(deviceName) {
    return Selector('div').withText(deviceName).nth(5);
  }

  getDeviceType(deviceName) {
    return this.getDeviceByName(deviceName).child("div").child(".device-type");
  }

  getDeviceCapacity(deviceName) {
    return this.getDeviceByName(deviceName).child("div").child(".device-capacity");
  }

  getDeviceEditButtonByName(deviceName) {
    return this.getDeviceByName(deviceName).child("div").child('.device-edit');
  }

  getDeviceRemoveButtonByName(deviceName) {
    return this.getDeviceByName(deviceName).child("div").child('.device-remove');
  }

  async clickOnEditDeviceByName(deviceName) {
    await t.click(this.getDeviceEditButtonByName(deviceName));
  }

  async clickOnRemoveDeviceByName(deviceName) {
    await t.click(this.getDeviceRemoveButtonByName(deviceName));
  }

  async saveListOfDevices() {
    const deviceCount = await this.deviceInfoList.count;
    const deviceList = [];
    for (let i = 0; i < deviceCount; i++) {
      const deviceElement = await this.deviceInfoList.nth(i);
      const deviceName = await deviceElement.child('.device-name').textContent;
      const deviceType = await deviceElement.child('.device-type').textContent;
      const deviceCapacity = await deviceElement.child('.device-capacity').textContent;
      deviceList.push(new Device(null, deviceName, deviceType, deviceCapacity));
    }
  return deviceList;
  }
}
    
export default new DeviceListPage();
