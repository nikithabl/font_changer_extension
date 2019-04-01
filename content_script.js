
chrome.runtime.onMessage.addListener(
  function(request, sender, updateIcon) {
    if (request.extensionStorage) {
      var newFont = request.extensionStorage.replacementFont;

      var changeFont = function () {
        var els = document.querySelectorAll('body, body *');

        for (var i=0;i<els.length;i++) {
          var oldStyle = window.getComputedStyle(els[i]).fontFamily;
          if ([0,1].indexOf(oldStyle.indexOf(newFont)) === -1) {
            els[i].style.fontFamily = "'" + newFont + "', " + oldStyle;
          }
        }
      };

      var target = document.querySelectorAll('body')[0];

      var observer, callback;

      callback = function(changes) {
        changes.forEach(function(change) {
          changeFont();
        });
      };

      observer = new MutationObserver(callback);

      observer.observe(target, { attributes: true, childList: true});

      changeFont();
      updateIcon();
    }
  }
);
