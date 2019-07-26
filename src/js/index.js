import easyScroll from "easy-scroll";

const site = require("file-loader?name=[name].[ext]!../index.html");
const styles = require("file-loader?name=[name].[ext]!../styles/main.css");

const bootstrap = (function() {
  const bootstrapEl = document.querySelector("[data-bootstrap]");
  const bootstrapData = Object.freeze(
    JSON.parse(
      (bootstrapEl && bootstrapEl.innerHTML) || '{ "icons": [], "credits": []}'
    )
  );
  bootstrapEl && bootstrapEl.remove();
  return bootstrapData;
})();

const $ = document.querySelector.bind(document);
const $$ = function(selector) {
  return Array.prototype.slice.call(document.querySelectorAll(selector));
};

const body = $("body");
const scroller = $("[data-scroller]");
const templates = $$("[data-template-email], [data-template-credit]");
const menu = $("[data-menu]");
const page = $("[data-page]");
const closepage = $("[data-clear-page]");
const distance = $("[data-input-distance]");
const datetime = $("[data-input-datetime]");
const media = $("[data-media]");
const video = $("video");
const audio = $("audio");
const scrollBuffer = window.innerHeight;
const scrollRate = scrollBuffer * 2.67;
const scrollMaxChildren = 5;
const captureDelay = 1500;
let currentDateTime;
let captured = false;

class Johnny {
  constructor() {
    this.addEventListeners();
    this.autoScroll();

    window.______saveImage = this.saveImage.bind(this);
  }

  addEventListeners() {
    scroller.addEventListener("DOMMouseScroll", this.preventDefault);
    scroller.addEventListener("mousewheel", this.preventDefault);
    scroller.addEventListener("touchmove", this.preventDefault);
    ["change", "touchend"].forEach(type => {
      menu.addEventListener(type, event => {
        this.playBlip(event);
      });
    });
    ["click", "touchend"].forEach(type => {
      closepage.addEventListener(type, event => {
        this.unloadPage(event);
      });
    });
    menu.addEventListener("change", event => {
      window.location.hash = event.target.value;
    });
    window.addEventListener("hashchange", event => {
      this.loadPage();
    });
    window.addEventListener("load", event => {
      this.loadPage();
      this.startVideo();
    });
  }

  preventDefault(event) {
    event.preventDefault();
  }

  importTemplate(templateEl) {
    return document.importNode(templateEl.cloneNode(true).content, true);
  }

  parseSVG(svgString) {
    const div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
    div.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg">' + svgString + "</svg>";
    const frag = document.createDocumentFragment();
    while (div.firstChild.firstChild) {
      frag.appendChild(div.firstChild.firstChild);
    }
    return frag;
  }

  buildSvgIconSprite(type) {
    return this.parseSVG(`
            <svg class="icon" viewBox="0 0 8 8">
                <use xlink:href="/assets/svg/open-iconic.svg#${type}"></use>
            </svg>
        `);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getRandom(arr) {
    return arr[this.getRandomInt(arr.length)];
  }

  getRandomIcon() {
    return this.getRandom(bootstrap.icons);
  }

  getRandomCredit() {
    return this.getRandom(bootstrap.credits);
  }

  getRandomIconSprite() {
    return this.buildSvgIconSprite(this.getRandomIcon());
  }

  shouldAppendContent() {
    return (
      scroller.clientHeight >
      scroller.scrollHeight - scroller.scrollTop - scrollBuffer
    );
  }

  shouldUnloadContent() {
    return scroller.children.length > scrollMaxChildren;
  }

  appendContent() {
    const card = this.importTemplate(this.getRandom(templates));
    const icon = card.querySelector(".credit-icon");
    const name = card.querySelector(".credit-name");

    icon && icon.appendChild(this.getRandomIconSprite());
    name && (name.textContent = this.getRandomCredit());

    scroller.appendChild(card);
  }

  unloadContent() {
    while (scroller.firstChild) {
      if (scroller.children.length == 2) {
        break;
      }
      scroller.removeChild(scroller.firstChild);
    }
  }

  autoScroll() {
    if (this.shouldAppendContent()) {
      this.appendContent();
    }
    if (this.shouldUnloadContent()) {
      this.unloadContent();
    }
    easyScroll({
      scrollableDomEle: scroller,
      direction: "bottom",
      duration: scrollRate,
      easingPreset: "linear",
      onRefUpdateCallback: distance => {
        this.setDistance(distance);
        this.setDateTime(new Date());
      },
      onAnimationCompleteCallback: () => {
        this.autoScroll();
      }
    });
  }

  setDistance(val) {
    distance.value = val;
  }

  setDateTime(val) {
    if (val !== currentDateTime) {
      datetime.value = val;
      currentDateTime = val;
    }
  }

  startVideo() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          video.srcObject = stream;
          setTimeout(() => {
            this.saveImage();
          }, captureDelay);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  request(obj) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(obj.method || "GET", obj.url);
      if (obj.headers) {
        Object.keys(obj.headers).forEach(key => {
          xhr.setRequestHeader(key, obj.headers[key]);
        });
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send(JSON.stringify(obj.body));
    });
  }

  captureImage() {
    const scale = 1;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // const svg = new XMLSerializer().serializeToString(this.getRandomIconSprite());
    // const encodedData = `data:image/svg+xml;base64,${window.btoa(svg)}`;
    // const img = new Image();

    // img.onload = () => {
    //     context.drawImage(img, 0, 0);
    //     resolve(canvas.toDataURL());
    // }

    // img.src = encodedData;

    return canvas.toDataURL();
  }

  saveImage() {
    !captured &&
      this.request({
        url: "https://j-hnnybens-n.com/uploads/",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: {
          img: this.captureImage()
        }
      })
        .then(data => {
          captured = true;
        })
        .catch(error => {});
  }

  playBlip(event) {
    audio.volume = 1;
    audio.play();
  }

  getHash() {
    return window.location.hash.substr(1);
  }

  setHash(val = "") {
    window.location.hash = val;
  }

  onEsc(event) {
    if (event.keyCode === 27) {
      this.unloadPage();
      window.removeEventListener("keyup", this.onEsc);
    }
  }

  onClickBody(event) {
    if (
      event.currentTarget.closest(".browser-chrome, .page-description") ===
      null
    ) {
      this.unloadPage();
      body.removeEventListener("click", this.onClickBody);
    }
  }

  listenForClose() {
    window.addEventListener("keyup", this.onEsc.bind(this));
    body.addEventListener("click", this.onClickBody.bind(this));
  }

  loadPage() {
    const templateEl = $('[data-template-page="' + this.getHash() + '"]');
    if (templateEl) {
      page.appendChild(this.importTemplate(templateEl));
      this.listenForClose();
    }
  }

  unloadPage(event) {
    while (page.lastChild) {
      page.removeChild(page.lastChild);
    }
    this.setHash();
    menu.selectedIndex = 0;
  }
}

new Johnny();
