var tocGenerator = (function() {
    'use strict';
    var publicAPIs = {};
    var settings;
    var defaults = { selectorHeaders: 'h2, h3, h4, h5, h6', tocTitle: '<h2>Table of Contents</h2>', selectorTocs: '[data-toc]', primaryHeaderLevels: [1, 2, 3], initClass: 'js-toc', };
    var runScript = function() {
        var headings = document.querySelectorAll(settings.selectorHeaders);
        if (headings.length < 1)
            return;
        var level = 0;
        var newLevel;
        var links = '';
        for (var i = 0; i < headings.length; i++) {
            newLevel = parseInt(headings[i].tagName.slice(1), 10);
            // TODO: Remove
            // console.log(`newLevel: ${newLevel}.`);
            if (!headings[i].id) { headings[i].id = headings[i].innerHTML.replace(/^[^a-z]+|[^\w:.-]+/gi, '_').toLowerCase(); }
            if (newLevel > level && settings.primaryHeaderLevels.indexOf(newLevel) !== -1) { links += '<ul><li>';
                // TODO: Remove
                // console.log(`A: Lvl: ${newLevel}, val: ${headings[i].textContent}.`);
            } else if (newLevel < level) { links += '</li></ul></li><li>';
                // TODO: Remove
                // console.log(`B: Lvl: ${newLevel}, val: ${headings[i].textContent}.`);
            } else { links += '</li><li>';
                // TODO: Remove
                // console.log(`C: Lvl: ${newLevel}, val: ${headings[i].textContent}.`);
            }
            links += '<a href="#' + headings[i].id + '">' + toTitleCase(headings[i].innerHTML) + '</a>';
            level = newLevel;
        }
        links += '</li></ul>';
        var toc = document.querySelector(settings.selectorTocs);
        if (!toc)
            return;
        toc.innerHTML = settings.tocTitle + links;
    };
    var addInitializationClass = function() { document.documentElement.className += settings.initClass; };
    var removeInitializationClass = function() { if (document.documentElement.classList.contains(settings.initClass)) { document.documentElement.classList.remove(settings.initClass); } };
    var extend = function() {
        var extended = {};
        var deep = false;
        var i = 0;
        if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') { deep = arguments[0];
            i++; }
        var merge = function(obj) { for (var prop in obj) { if (obj.hasOwnProperty(prop)) { if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') { extended[prop] = extend(extended[prop], obj[prop]); } else { extended[prop] = obj[prop]; } } } };
        for (; i < arguments.length; i++) { var obj = arguments[i];
            merge(obj); }
        return extended;
    };
    /*!
     * Convert a string to title case
     * source: https://gist.github.com/SonyaMoisset/aa79f51d78b39639430661c03d9b1058#file-title-case-a-sentence-for-loop-wc-js
     * @param {String} str The string to convert to title case
     * @return {String} The converted string
     */
    var toTitleCase = function(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) { str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); }
        return str.join(' ');
    };
    publicAPIs.init = function(options) { publicAPIs.destroy();
        settings = extend(defaults, options || {});
        runScript();
        addInitializationClass(); };
    publicAPIs.destroy = function() {
        if (!settings) { return; }
        var toc = document.querySelector(settings.selectorTocs);
        if (!toc)
            return;
        toc.innerHTML = '';
        removeInitializationClass();
        settings = null;
    }
    return publicAPIs;
})();