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
    var json = Object.fromEntries(data); //{};

    return json;
  }

  fill(form) {
    var data = JSON.parse(this.data);

    for (const[key, value] of Object.entries(data)) {
      console.log(document.getElementsByName(key));
      document.getElementsByName(key)[0].checked = true;
    }

    console.log(data);
  }

  loadFromStorage() {
    var data = localStorage.getItem(this.name);
    if (data == undefined) {
      console.log("Couldn't find it");
      data = {};
    }
    return data;
  }

  saveToStorage(data) {
    localStorage.setItem(this.name, JSON.stringify(data));
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

  saveButton.addEventListener('click', (e) => {
    var data = guide.scrape();
    guide.saveToStorage(data);
    statusMessage.innerText = "Saved!"
    return true;
  });

  loadButton.addEventListener('click', (e) => {
    var data = guide.loadFromStorage();
    guide.fill(data);
    statusMessage.innerText = "Loaded!"
    return true;
  });

  article = document.querySelector('article#guide')
  if (article != undefined) {
    gameName = article.dataset.game;
    guide = new Guide(gameName);

    console.log(gameName);
    console.log(guide.data);
    console.log(guide.scrape());
  }
}