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
  }

  const checkboxes = document.querySelectorAll('article#guide input[type="checkbox"]')
  const statusMessage = document.getElementById('status_message');

  //Array.prototype.forEach.call(checkboxes, function (e) {
  //  e.removeAttribute('disabled');
  //});

  const saveButton = document.querySelector('button#save');
  const loadButton = document.querySelector('button#load');
  const resetButton = document.querySelector('button#reset');

  saveButton.addEventListener('click', (e) => {
    guide.save();
    statusMessage.innerText = "Saved!"
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
}