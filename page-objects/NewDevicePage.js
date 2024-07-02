import { Selector } from 'testcafe';

class NewDevicePage {
  constructor() {
    this.formContainer = Selector('.device-form');
    this.nameInput = this.formContainer.find('#system_name');
    this.typeSelect = this.formContainer.find('#type');
    this.capacityInput = this.formContainer.find('#hdd_capacity');
    this.saveButton = this.formContainer.find('.submitButton');
  }

  async setName(name) {
    await this.nameInput.set(name);
  }

  async setType(type) {
    await this.typeSelect.select(type);
  }

  async setCapacity(capacity) {
    await this.capacityInput.set(capacity);
  }

  async clickSave() {
    await click(this.saveButton);
  }

  async fillNewDeviceForm(name, type, capacity) {
    await this.setName(name);
    await this.setType(type);
    await this.setCapacity(capacity);
  }
}

export default new NewDevicePage();