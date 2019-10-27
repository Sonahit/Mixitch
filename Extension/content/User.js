import { MIXER, MIXER_API } from "./index.js";

export default class User {
  constructor(token) {
    this.token = token;
    this.data = false;
  }

  get userName() {
    if (this.data) return this.data.username;
  }

  get level() {
    if (this.data) return this.data.level;
  }

  setToken() {
    const token = () => {
      const imgs = document.getElementsByTagName("img");
      for (let i = 0; i < imgs.length; i++) {
        const img = imgs[i];
        if (img && img.src.includes("/api/v1/users/")) {
          const s = img.src.substr(MIXER.length, img.src.length);
          return s.split("/")[4];
        }
      }
    };
    this.token = token();
    this.setUserData();
  }

  setUserData() {
    return fetch(`${MIXER_API}/users/${this.token}`).then(async data => {
      return data.json().then(data => (this.data = data));
    });
  }
}
