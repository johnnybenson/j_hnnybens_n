import easyScroll from 'easy-scroll';

const site = require('file-loader?name=[name].[ext]!../index.html');
const styles = require('file-loader?name=[name].[ext]!../styles/main.css');

const body = document.querySelector('body');
const wrapper = document.querySelector('.🆒');
const templates = document.querySelectorAll('template');
const bottomScrollReveal = window.innerHeight;
const scrollRate = bottomScrollReveal * 2.67;
const audio = document.querySelector('audio');
const select = document.querySelector('select');
const video = document.querySelector('video');
const icons = window.______icons;
const skills = window.______skills;

class Johnny {


    constructor() {
        this.addEventListeners();
        this.appendContent();
        this.autoScroll();
        this.startVideo();
    }

    parseSVG(s) {
        const div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
        div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + s + '</svg>';
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

    shouldAppendContent() {
        return wrapper.clientHeight > (wrapper.scrollHeight - wrapper.scrollTop - bottomScrollReveal);
    }

    appendContent() {
        const template = this.getRandom(templates).cloneNode(true);
        const skill = (template.dataset.templateSkill === '') ? this.getRandom(skills) : false;
        const icon = (template.dataset.templateSkill === '') ? this.getRandom(icons) : false;
        const card = document.importNode(template.content, true);

        if (skill) {
            card.querySelector('.skill-icon').appendChild(this.buildSvgIconSprite(icon));
            card.querySelector('.skill-name').textContent = skill;
        }

        wrapper.appendChild(card);
    }

    autoScroll() {
        if (this.shouldAppendContent()) {
            this.appendContent();
        }
        easyScroll({
            'scrollableDomEle': wrapper,
            'direction': 'bottom',
            'duration': scrollRate,
            'easingPreset': 'linear',
            'onAnimationCompleteCallback': () => {
                this.autoScroll();
            },
        });
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
        canvas.width = video.videoWidth * scale;
        canvas.height = video.videoHeight * scale;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

        const img = document.createElement('img');
        return canvas.toDataURL();
    }

    saveImage() {
        this.request({
            url: "/uploads/",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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

    preventDefault(event) {
        event.preventDefault();
    }

    addEventListeners() {
        wrapper.addEventListener('DOMMouseScroll', this.preventDefault);
        wrapper.addEventListener('mousewheel', this.preventDefault);
        wrapper.addEventListener('touchmove', this.preventDefault);
        ['change','touchend'].forEach(function(type) {
            select.addEventListener(type, function () { audio.volume = 1; audio.play(); });
        })

        window.______saveImage = this.saveImage.bind(this);
    }
}

new Johnny();

