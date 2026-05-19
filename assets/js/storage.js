// TODO: Remove
// console.log("Storage loaded");
class Storage {
  constructor(key) {
    this.key = key;
  }

  get data() {
    try {
      var data = JSON.parse(localStorage.getItem(this.key));
      if (data == undefined) {
        throw TypeError;
      }
      return data;
    } catch(error) {
      console.log("Couldn't find " + this.key);
      this.data = {};
      return {};
    }
  }

  set data(jsonObject) {
    localStorage.setItem(this.key, JSON.stringify(jsonObject));
  }

  reset() {
    this.data = {};
  }
}
