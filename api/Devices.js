require('dotenv').config();
const apiBaseUrl = process.env.API_BASEURL;
import { t } from 'testcafe';

export async function getDevices() {
    return await t.request({
        url: `${apiBaseUrl}`,
        method: 'GET',
      });
  }

export async function updateDevice(id, name, type, capacity) {
    return await t.request.put({
        url: `${apiBaseUrl}/${id}`,
        headers: { 'Content-Type': 'application/json' },
        body: {"system_name": `${name}`,"type": `${type}`,"hdd_capacity": `${capacity}`},
      });
  }

export async function deleteDevice(id) {
    return await t.request.delete({
        url: `${apiBaseUrl}/${id}`,
      });
  } 