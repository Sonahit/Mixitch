(() => {
  let injection = document.createElement("script");
  injection.src = chrome.runtime.getURL("content/MLikeT.js");
  injection.id = "MLikeT-module";
  injection.type = "module";
  document.body.appendChild(injection);
})();
