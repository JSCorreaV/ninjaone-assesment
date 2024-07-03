const uuid = require('short-uuid');

export function getRandomDeviceType() {
    const deviceTypes = ['WINDOWS WORKSTATION', 'WINDOWS SERVER', 'MAC'];
    const randomIndex = Math.floor(Math.random() * deviceTypes.length);
    return deviceTypes[randomIndex];
  }

export function getRandomNumberString() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    return randomNumber.toString();
  }

export function uuidGenerator(){
    return uuid.generate();
  }

