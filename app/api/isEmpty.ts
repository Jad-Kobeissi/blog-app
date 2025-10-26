export function isEmpty(arr: string[]) {
  for (let i in arr) {
    if (i.trim() == "") {
      return true;
    }
  }
  return false;
}
