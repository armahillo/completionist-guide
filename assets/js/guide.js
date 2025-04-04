class Guide {
  constructor(name) {
    this.name = name;
  }

  get data() {
    return loadFromStorage();
  }

  loadFromStorage() {
    data = localStorage.getItem(this.name);
    if (data == undefined) {
      data = {};
    }
    return data;
  }

  saveToStorage(data) {
    localStorage.setItem(this.name, data)
  }
}