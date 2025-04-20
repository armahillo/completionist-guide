console.log("Guide loaded");

class Guide {
  constructor(storage, game, section) {
    this.storage = storage;
    this.game = game;
    this.section = section;
    this.data = this.load();
  }

  // This feels backwards, but: load() pulls the entries and assigns them to the fields
  load() {
    var entries;
    try {
      entries = this.storage.data[this.section];
      if (entries == undefined) {
        throw TypeError;
      }
    }
    catch(error) {
      entries = {};
    }
    
    // Repopulate the fields from the known entries
    this.fields = entries;

    this.updateStale();
  }

  // And save() combs the entries and then sends them to the storage
  save() {
    var cachedData;
    // First reload the entire game entry
    try {
      cachedData = this.storage.data;
    }
    catch(TypeError) {
      cachedData[this.section] = {};
    }
    
    // Update this one section with the current data
    cachedData[this.section] = this.fields;
    // Then re-save the entire key with the total data
    this.storage.data = cachedData;
  }

  // Dole out the entries to the form elements
  set fields(entries) {
    for (const[key, value] of Object.entries(entries)) {
      var nodes = document.getElementsByName(key);
      nodes.forEach((node) => {
        if (node.value == value) {
          node.checked = true;
        }
      });
    }
  }

  // Retrieve all existing field data as entries
  get fields() {
    const form = document.querySelector('article#guide form');
    const data = new FormData(form);
    // https://stackoverflow.com/questions/41431322/how-to-convert-formdata-html5-object-to-json

    try {
      const entries = Object.fromEntries(data);  
      return entries;
    }
    catch(TypeError) {
      return {}
    }
  }

  // Refres the page to mark anything that is already checked.
  updateStale() {
    document.querySelectorAll(':checked').forEach((node) => {
      node.parentElement.classList.add("cached");
    })
    document.querySelectorAll('.cached input:not(:checked)').forEach((node) => {
      node.parentElement.classList.remove("cached");
    })
  }

  reset() {
    this.storage.reset();
    this.load();
  }
}
