import Chat from "./MLikeT.js";
import Observer from "./MObserver.js";
import User from "./User.js";

export const MIXER = "https://mixer.com";
export const MIXER_API = `${MIXER}/api/v1`;

const mixerChat = new Chat();
const observer = new Observer({ attributes: true, childList: true, subtree: true });
const user = new User(0);

setInterval(() => {
  if (location.href !== mixerChat.location.href) {
    mixerChat.location = location;
    mixerChat.tryToRetrieveChat();
  }
  if (!user.token) {
    user.setToken();
  }
}, 1000);

window.addEventListener("gotchat", e => {
  const chatData = e.detail;
  observer.observe(chatData);
});

window.MObserver = observer;
window.MLikeT = mixerChat;
window.MUser = user;
