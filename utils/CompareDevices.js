export function compareListOfDevices(list1, list2) {
  if (list1.length !== list2.length) return false;
  return !list1.some(device1 => !list2.some(device2 => device1.isEqualExceptId(device2)));
}
