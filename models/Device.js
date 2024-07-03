export class Device {
    constructor(id, systemName, type, hddCapacity) {
      this.systemName = systemName;
      this.type = type;
      this.hddCapacity = hddCapacity.replace(/ GB$/, '');
      this.id = id;
    }

    isEqualExceptId(otherDevice) {
      return (
        this.systemName === otherDevice.systemName &&
        this.type === otherDevice.type &&
        this.hddCapacity === otherDevice.hddCapacity
      );
    }

    toString() {
      return `ID: ${this.id}, System Name: ${this.systemName}, Type: ${this.type}, HDD Capacity: ${this.hddCapacity}GB`;
    }
  }