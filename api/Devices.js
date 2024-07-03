import { t } from 'testcafe';
const apiBaseUrl = 'http://localhost:3000/devices';

export async function getDevices() {
    return await t.request({
        url: `${apiBaseUrl}`,
        method: 'GET',
      });
  }

  export async function updateDevice(id, name, type, capacity) {
    return await t.request({
        url: `${apiBaseUrl}/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: {"system_name": `${name}`,"type": `${type}`,"hdd_capacity": `${capacity}`},
      });
  } 