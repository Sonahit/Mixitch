import Observer from "./MObserver.js";

export default class MLikeT {
  constructor() {
    this.retriever = 0;
    this.location = location;
    this.tryToRetrieveChat();
  }

  get chat() {
    return this._chat();
  }

  get location() {
    return this._location;
  }

  set location(location) {
    this._location = Object.assign({}, location);
  }

  get chatData() {
    return this._chatData();
  }

  set chatData(chatData) {
    this._chatData = chatData;
  }

  set chat(chat) {
    this._chat = chat;
  }

  get retriever() {
    return this._retriever;
  }

  set retriever(retriever) {
    if (this._retriever) clearInterval(this._retriever);
    this._retriever = retriever;
  }

  tryToRetrieveChat() {
    if (!this.retriever) {
      this.log(`Getting chat at ${this.location.href}`, "log");
      let attempts = 0;
      this.retriever = setInterval(() => {
        if (document.getElementsByClassName("chat-container")[0]) {
          const chat = document.getElementsByClassName("chat-container")[0];
          if (!chat.lastChild) return;
          if (!chat.lastChild.firstChild) return;
          if (!chat.lastChild.firstChild.firstChild) return;
          if (!chat.lastChild.firstChild.firstChild.firstChild) return;
          const chatContainer = chat.lastChild.firstChild.firstChild.firstChild;
          if (chatContainer && chatContainer.className && chatContainer.className.includes("ChatMessages")) {
            const messages = chatContainer.childNodes;
            if (messages.length > 1) {
              this.chat = () => document.getElementsByClassName("chat-container")[0];
              for (let i = 0; i < chat.children.length; i++) {
                const el = chat.children[i];
                if (el.className.includes("tabs"))
                  el.addEventListener("click", () => {
                    this.log("Getting chat from another tab", "log");
                    const timer = setInterval(() => {
                      if (this.chatData.childNodes.length > 1) {
                        this.makeLikeTwitch(this.chatData);
                        this.log("Done", "log");
                        clearInterval(timer);
                        window.dispatchEvent(new CustomEvent("gotchat", { detail: this.chatData }));
                      }
                    }, 250);
                  });
              }
              this.chatData = () => {
                const chatContainer = this.chat.lastChild.firstChild.firstChild.firstChild;
                if (chatContainer.firstChild) return chatContainer.firstChild;
              };
              this.retriever = 0;
              this.log(`Got chat at ${this.location.href} :)`, "log");
              this.makeLikeTwitch(this.chatData);
              window.dispatchEvent(new CustomEvent("gotchat", { detail: this.chatData }));
            }
          }
        }
        if (++attempts > 10) {
          this.retriever = 0;
          this.log(`Couldnt get chat at ${this.location.href}`, "log");
        }
      }, 1000);
    }
  }

  log(message, level) {
    const logStamp = `[MLikeT] [${new Date()}]`;
    switch (level) {
      case "log": {
        console.log(`${logStamp} ${message}`);
        break;
      }
      case "error": {
        console.error(`${logStamp} ${message}`);
        break;
      }
      case "warning": {
        console.warn(`${logStamp} ${message}`);
        break;
      }
    }
  }

  makeLikeTwitch(chatData) {
    const currentMsgs = chatData.childNodes;
    for (let i = 0; i < currentMsgs.length; i++) {
      const msgContainer = currentMsgs[i];
      msgLikeTwitch(msgContainer);
    }
  }
  reload() {}
}

export function msgLikeTwitch(msgContainer) {
  if (msgContainer.getAttribute && !msgContainer.getAttribute("mliket")) {
    msgContainer.setAttribute("mliket", "true");
    const [el_1, el_2] = msgContainer.childNodes;
    const msgTab = el_1 && el_1.className && el_1.className.includes("timeStamp") ? el_2 : el_1;
    if (msgTab && msgTab.getElementsByTagName) {
      let avatar, badge;
      const imgs = msgTab.getElementsByTagName("img");
      if (imgs) [avatar, badge] = imgs;
      const [userName, rankBadge] = msgTab.getElementsByTagName("span");
      if (rankBadge && rankBadge.className.includes("badge")) {
        rankBadge.removeAttribute("style");
        rankBadge.classList = [];
        rankBadge.innerText = ":";
      }
      if (avatar) {
        avatar.parentNode.removeChild(avatar);
      }
      if (badge) {
        badge.parentNode.removeChild(badge);
        userName.parentNode.prepend(badge);
      }
      userName.parentNode.style.marginLeft = "5px";
    } else {
      mixerChat.log(msgTab, "log");
    }
  }
}

const mixerChat = new MLikeT();
const observer = new Observer({ attributes: true, childList: true, subtree: true });

window.addEventListener("gotchat", e => {
  const chatData = e.detail;
  observer.observe(chatData);
});

setInterval(() => {
  if (location.href !== mixerChat.location.href) {
    mixerChat.location = location;
    mixerChat.tryToRetrieveChat();
  }
}, 1000);

window.MObserver = observer;
window.MLikeT = mixerChat;
