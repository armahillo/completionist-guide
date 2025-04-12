console.log("Storage loaded");
class Storage {
  constructor(key) {
    this.key = key;
  }

  get data() {
    try {
      var data = JSON.parse(localStorage.getItem(this.key));
      return data;
    } catch(error) {
      console.log("Couldn't find " + this.key);
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
