import { Selector, t } from "testcafe";
import { Device } from '../models/Device';

class DeviceListPage {
    constructor(){
        this.addDeviceButton = Selector('.submitButton');
        this.deviceInfoList = Selector(".device-info");
        this.deviceNameSelector = Selector(".device-name");
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

    getDeviceEditButtonByName(deviceName) {
      return this.getDeviceByName(deviceName).child("div").child('.device-edit')
    }

    getDeviceRemoveButtonByName(deviceName) {
      return this.getDeviceByName(deviceName).child("div").child('.device-remove')
    }

    //getEditButtonByName
    //getEditButtonByName

    async clickOnEditDeviceByName(deviceName) {
      await t.click(this.getDeviceEditButtonByName(deviceName));
    }

    async clickOnRemoveDeviceByName(deviceName) {
      await t.click(this.getDeviceRemoveButtonByName(deviceName));
    }

    




    //TODO
    
      async getName(deviceName) {
        // Get the device name element based on the device object
        const device = await this.getDevice(deviceName);
        const nameElement = device.child(this.deviceNameSelector);
        return await nameElement.textContent;
      }
    
      async getType(deviceName) {
        // Get the device type element based on the device object
        const device = await this.getDevice(deviceName);
        const typeElement = device.child(Selector('.device-type'));
        return await typeElement.textContent;
      }
    
      async getCapacity(deviceName) {
        // Get the device capacity element based on the device object
        const device = await this.getDevice(deviceName);
        const capacityElement = device.child(Selector('.device-capacity'));
        return await typeElement.textContent;
      }
    
      async clickEdit(deviceName) {
        // Get the edit button element based on the device object
        const device = await this.getDevice(deviceName);
        const editButton = device.sibling(Selector('.device-options')).child(Selector('.device-edit'));
        await t.click(editButton);
      }
    
      async clickRemove(deviceName) {
        // Get the remove button element based on the device object
        const device = await this.getDevice(deviceName);
        const removeButton = device.sibling(Selector('.device-options')).child(Selector('.device-remove'));
        await click(removeButton);
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
