class Guide {
  constructor(name) {
    this.name = name;
  }

  get data() {
    return this.loadFromStorage();
  }
// https://stackoverflow.com/questions/41431322/how-to-convert-formdata-html5-object-to-json
  scrape() {
    var form = document.querySelector('article#guide form');
    var data = new FormData(form);
    var entries = Object.fromEntries(data); //{};
console.log(entries)
    return entries;
  }

  fill(form) {
    var data = JSON.parse(this.data);

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

  loadFromStorage() {
    var data = localStorage.getItem(this.name);
    if (data == undefined) {
      console.log("Couldn't find " + this.name);
      data = {};
    }
    return data;
  }

  saveToStorage(data) {
    localStorage.setItem(this.name, JSON.stringify(data));
    document.querySelectorAll(':checked').forEach((node) => {
      node.parentElement.classList.add("cached");
    })
    document.querySelectorAll('.cached input:not(:checked)').forEach((node) => {
      node.parentElement.classList.remove("cached");
    })
  }
}

var article;
var gameName;
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

  function load_from_storage() {
    var data = guide.loadFromStorage();
    guide.fill(data);
    statusMessage.innerText = "Loaded!"
  }

  saveButton.addEventListener('click', (e) => {
    var data = guide.scrape();
    guide.saveToStorage(data);
    statusMessage.innerText = "Saved!"
    return true;
  });

  loadButton.addEventListener('click', load_from_storage);

  article = document.querySelector('article#guide')
  if (article != undefined) {
    gameName = article.dataset.game;
    guide = new Guide(gameName);

    load_from_storage();
  }
}