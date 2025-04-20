console.log("Main loaded");

var article;
var gameName;
var gameSection;
var guide;
var statusMessage;

window.onload = function() {
  article = document.querySelector('article#guide')
  if (article != undefined) {
    gameName = article.dataset.game;
    gameSection = article.dataset.section;

    const storage = new Storage(gameName);
    

    guide = new Guide(storage, gameName, gameSection);

    guide.load();
    const statusMessage = document.getElementById('status_message');
    console.log(statusMessage);
    statusMessage.innerText = "Loaded!"

    const checkboxes = document.querySelectorAll('article#guide input[type="checkbox"]')

    //Array.prototype.forEach.call(checkboxes, function (e) {
    //  e.removeAttribute('disabled');
    //});

    const saveButton = document.querySelector('button#save');
    const loadButton = document.querySelector('button#load');
    const resetButton = document.querySelector('button#reset');

    saveButton.addEventListener('click', (e) => {
      guide.save();
      statusMessage.innerText = "Saved!"
      guide.updateStale();
      return true;
    });

    loadButton.addEventListener('click', (e) => {
      guide.load();
      statusMessage.innerText = "Loaded!"
      return true;
    });

    resetButton.addEventListener('click', (e) => {
      guide.reset();
      statusMessage.innerText = "Reset!"
      return true;
    });

    var lastSavedTime = Date.now();

    const inputs = document.querySelectorAll('article#guide input');
    Array.prototype.forEach.call(inputs, function (input) {
      input.addEventListener("change", (event) => {
        guide.save();
        var delta = parseInt((Date.now() - lastSavedTime) / 1000);
        lastSavedTime = Date.now();
        var saveMsg = "Just saved!";

        if (delta > 1) {
          saveMsg = "Last saved " + delta + " seconds ago";
        }
        statusMessage.innerText = saveMsg;
        return true;
      });
    });
  }
}