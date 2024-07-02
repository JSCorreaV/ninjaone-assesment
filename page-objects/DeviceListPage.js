import { Selector, t } from "testcafe";
import { Device } from '../models/DeviceListModel';

class DeviceListPage {
    constructor(){
        this.addDevice = Selector(".submitButton");
        this.deviceList = Selector(".device-info");
      }

    async getDeviceCount() {
        // Get the number of devices by counting the elements in the list
        return await this.deviceList.count;
      }
    
      async getDevice(deviceName) {
        // Find the device element by name using text content filtering
        const device = await this.deviceList.withText(deviceName.textContent);
        return device;
      }
    
      async getName(deviceName) {
        // Get the device name element based on the device object
        const device = await this.getDevice(deviceName);
        const nameElement = device.child(Selector('.device-name'));
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
        await click(editButton);
      }
    
      async clickRemove(deviceName) {
        // Get the remove button element based on the device object
        const device = await this.getDevice(deviceName);
        const removeButton = device.sibling(Selector('.device-options')).child(Selector('.device-remove'));
        await click(removeButton);
      }

      //jstest save list of all devices
      async jstestSaveDevices() {
        const deviceCount = await this.deviceList.count;
        const deviceList = [];
        for (let i = 0; i < deviceCount; i++) {
          const deviceElement = await this.deviceList.nth(i);
          const deviceName = await deviceElement.child('.device-name').textContent;
          const deviceType = await deviceElement.child('.device-type').textContent;
          const deviceCapacity = await deviceElement.child('.device-capacity').textContent;
          deviceList.push(new Device(null, deviceName, deviceType, deviceCapacity));
      }
      return deviceList;

    }
}
    
export default new DeviceListPage();
