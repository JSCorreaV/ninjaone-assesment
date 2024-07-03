import { t } from 'testcafe';

export async function getDevices() {
    return await t.request({
        url: 'http://localhost:3000/devices',
        method: 'GET',
      });
  }