window.onload = function() {
  const checkboxes = document.querySelectorAll('article#guide input[type="checkbox"]')

  Array.prototype.forEach.call(checkboxes, function (e) {
    e.removeAttribute('disabled');
  });
}