import { Selector, t } from 'testcafe';

class NewDevicePage {
  constructor() {
    this.nameInput = Selector('#system_name');
    this.typeSelect = Selector('#type');
    this.typeOption = this.typeSelect.find('option');
    this.capacityInput = Selector('#hdd_capacity');
    this.saveButton = Selector('.submitButton');
  }

  async typeName(name){
    await t.typeText(this.nameInput, name);
  }

  async selectType(type) {
    await t
    .click(this.typeSelect)
    .click(this.typeOption.withText(type))
    .expect(this.typeSelect.value).eql(type);
  }

  async typeCapacity(capacity){
    await t.typeText(this.capacityInput, capacity);
  }

  async clickOnSave () {
    await t.click(this.saveButton);
  }

  async fillNewDeviceForm(name, type, capacity) {
    this.typeName(name);
    this.selectType(type);
    this.typeCapacity(capacity);
    this.clickOnSave();
  }
}

export default new NewDevicePage();