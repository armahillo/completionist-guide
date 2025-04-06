class Guide {
  constructor(name, section) {
    this.name = name;
    this.section = section;
  }

  get data() {
    var data = JSON.parse(localStorage.getItem(this.name));
    try {
      if (this.section != undefined) {
        data = data[this.section]
      }
      return data;
    } catch(error) {
      console.log("Couldn't find " + this.name);
      return {};
    }
  }

// https://stackoverflow.com/questions/41431322/how-to-convert-formdata-html5-object-to-json
  scrape() {
    var form = document.querySelector('article#guide form');
    var data = new FormData(form);
    var entries = Object.fromEntries(data); //{};
console.log("scrape(): ");
console.log(entries)
    return entries;
  }

  fill() {
    const data = this.data;

    for (const[key, value] of Object.entries(data)) {
      var nodes = document.getElementsByName(key);
      nodes.forEach((node) => {
        if (node.value == value) {
          node.checked = true;
          node.parentElement.classList.add("cached");
        }
      })
    }
  }

  saveToStorage(data) {
console.log("saveToStorage() (pre): ");
console.log(data);
    // Merge into existing storage.
    var cached = JSON.parse(localStorage.getItem(this.name));

    if (this.section != undefined) {
      cached[this.section] = data;
    } else {
      cached = data;
    }

console.log("saveToStorage() (sectioned): ");
console.log(data);
    localStorage.setItem(this.name, JSON.stringify(cached));
    document.querySelectorAll(':checked').forEach((node) => {
      node.parentElement.classList.add("cached");
    })
    document.querySelectorAll('.cached input:not(:checked)').forEach((node) => {
      node.parentElement.classList.remove("cached");
    })
  }

  reset() {
    this.saveToStorage({});
  }
}

var article;
var gameName;
var gameSection;
var guide;
var statusMessage;

window.onload = function() {
  const checkboxes = document.querySelectorAll('article#guide input[type="checkbox"]')
  statusMessage = document.getElementById('status_message');

  Array.prototype.forEach.call(checkboxes, function (e) {
    e.removeAttribute('disabled');
  });

  const saveButton = document.querySelector('button#save');
  const loadButton = document.querySelector('button#load');
  const resetButton = document.querySelector('button#reset');

  function load_from_storage() {
    guide.fill();
    statusMessage.innerText = "Loaded!"
  }

  saveButton.addEventListener('click', (e) => {
    var data = guide.scrape();
    guide.saveToStorage(data);
    statusMessage.innerText = "Saved!"
    return true;
  });

  loadButton.addEventListener('click', load_from_storage);

  resetButton.addEventListener('click', (e) => {
    guide.reset();
    statusMessage.innerText = "Reset!"
    load_from_storage
    return true;
  });

  article = document.querySelector('article#guide')
  if (article != undefined) {
    gameName = article.dataset.game;
    gameSection = article.dataset.section;
    guide = new Guide(gameName, gameSection);

console.log(guide);

    load_from_storage();
  }
}