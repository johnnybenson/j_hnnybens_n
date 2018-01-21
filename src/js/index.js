import easyScroll from 'easy-scroll';

const site = require('file-loader?name=[name].[ext]!../index.html');
const styles = require('file-loader?name=[name].[ext]!../styles/main.css');

const bootstrap = (function(){
    const bootstrapEl = document.querySelector('[data-bootstrap]');
    const bootstrapData = Object.freeze(JSON.parse(((bootstrapEl && bootstrapEl.innerHTML) || '{ "icons": [], "credits": []}')));
    bootstrapEl && bootstrapEl.remove();
    return bootstrapData;
}())

const body = document.querySelector('body');
const scroller = document.querySelector('[data-scroller]');
const templates = document.querySelectorAll('[data-template-email], [data-template-credit]');
const menu = document.querySelector('[data-menu]');
const work = document.querySelector('[data-work]');
const closeWork = document.querySelector('[data-clear-work]');
const distance = document.querySelector('[data-input-distance]');
const datetime = document.querySelector('[data-input-datetime]');
const media = document.querySelector('[data-media]');
const video = document.querySelector('video');
const audio = document.querySelector('audio');
const scrollBuffer = window.innerHeight;
const scrollRate = scrollBuffer * 2.67;
const scrollMaxChildren = 5;
let currentDateTime;

class Johnny {

    constructor() {
        this.addEventListeners();
        this.autoScroll();
        this.startVideo();
        this.loadWork();

        window.______saveImage = this.saveImage.bind(this);
    }

    addEventListeners() {
        scroller.addEventListener('DOMMouseScroll', this.preventDefault);
        scroller.addEventListener('mousewheel', this.preventDefault);
        scroller.addEventListener('touchmove', this.preventDefault);
        ['change', 'touchend'].forEach((type) => {
            menu.addEventListener(type, (event) => { this.playBlip(event); });
        });
        ['click', 'touchend'].forEach((type) => {
            closeWork.addEventListener(type, (event) => { this.unloadWork(event); });
        });
        menu.addEventListener('change', (event) => {
            window.location.hash = event.target.value;
        });
        window.addEventListener('hashchange', (event) => {
            this.loadWork();
        });
    }

    preventDefault(event) {
        event.preventDefault();
    }

    importTemplate(templateEl) {
        return document.importNode(templateEl.cloneNode(true).content, true);
    }

    parseSVG(svgString) {
        const div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
        div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + svgString + '</svg>';
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

    getRandomIcon()
    {
        return this.getRandom(bootstrap.icons);
    }

    getRandomCredit()
    {
        return this.getRandom(bootstrap.credits);
    }

    getRandomIconSprite()
    {
        return this.buildSvgIconSprite(this.getRandomIcon());
    }

    shouldAppendContent() {
        return scroller.clientHeight > (scroller.scrollHeight - scroller.scrollTop - scrollBuffer);
    }

    shouldUnloadContent() {
        return scroller.children.length > scrollMaxChildren;
    }

    appendContent() {
        const card = this.importTemplate(this.getRandom(templates));
        const icon = card.querySelector('.credit-icon');
        const name = card.querySelector('.credit-name');

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
            'scrollableDomEle': scroller,
            'direction': 'bottom',
            'duration': scrollRate,
            'easingPreset': 'linear',
            'onRefUpdateCallback': (distance) => {
                this.setDistance(distance);
                this.setDateTime(new Date());
            },
            'onAnimationCompleteCallback': () => {
                this.autoScroll();
            },
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
            navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
                video.src = window.URL.createObjectURL(stream);
                video.play();
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
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth * scale;
        canvas.height = video.videoHeight * scale;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL();
    }

    saveImage() {
        this.request({
            url: 'https://j-hnnybens-n.com/uploads/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                img: this.captureImage()
            },
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
    }

    playBlip(event) {
        audio.volume = 1;
        audio.play();
    }

    getHash() {
        return window.location.hash.substr(1);
    }

    setHash(val = '') {
        window.location.hash = val;
    }

    loadWork() {
        const templateEl = document.querySelector('[data-template-work="' + this.getHash() + '"]');
        if (templateEl) {
            work.appendChild(this.importTemplate(templateEl));
        }
    }

    unloadWork(event) {
        while (work.lastChild) {
            work.removeChild(work.lastChild);
        }
        this.setHash();
        menu.value = "";
    }
}

new Johnny();

