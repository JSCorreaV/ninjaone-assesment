import { Selector, RequestLogger } from 'testcafe';
import { Device } from '../models/Device';

fixture`API tests`;

test('Get devices from API and print details', async (t) => {
    const response = await t.request({
        url: `http://localhost:3000/devices`,
        method: "GET",
    });
    console.log(response);
    await t.expect(response.status).eql(200);

  const devices = [];

  // Loop through the API response data and create Device objects
  for (const device of response.body) {
    devices.push(new Device(device.id, device.system_name, device.type, device.hdd_capacity));
  }

  // Print the total number of devices
  console.log(`Total devices from API: ${devices.length}`);

  // Print information for each device using the Device model
  for (const device of devices) {
    console.log(`  - ID: ${device.id}, Name: ${device.systemName}, Type: ${device.type}, Capacity: ${device.hddCapacity} GB`);
  }
});
