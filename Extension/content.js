(() => {
  let injection = document.createElement("script");
  injection.src = chrome.runtime.getURL("content/index.js");
  injection.id = "Mixitch-module";
  injection.type = "module";
  document.body.appendChild(injection);
})();
