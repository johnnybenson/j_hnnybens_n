import easyScroll from 'easy-scroll';

const site = require('file-loader?name=[name].[ext]!../index.html');
const styles = require('file-loader?name=[name].[ext]!../styles/main.css');

const body = document.querySelector('body');
const wrapper = document.querySelector('.🆒');
const templates = document.querySelectorAll('template');
const bottomScrollReveal = window.innerHeight;
const scrollRate = bottomScrollReveal * 2.67;

const skills = [
    { name: 'full stack', icon: 'terminal' },
    { name: 'DAUs', icon: 'terminal' },
    { name: 'Week Over Week', icon: 'terminal' },
    { name: 'KPIs', icon: 'terminal' },
    { name: 'machines learning', icon: 'terminal' },
    { name: 'feeds', icon: 'terminal' },
    { name: 'THE FIRE HOSE', icon: 'terminal' },
    { name: 'adobe', icon: 'terminal' },
    { name: 'culture', icon: 'terminal' },
    { name: 'product narrative', icon: 'terminal' },
    { name: 'sustainable', icon: 'terminal' },
    { name: 'best practices', icon: 'terminal' },
    { name: 'tech conferences', icon: 'terminal' },
    { name: 'bootstrapping', icon: 'terminal' },
    { name: 'no one understands CSS Flexbox syntax', icon: 'terminal' },
    { name: 'code for people, not machines', icon: 'terminal' },
    { name: 'Docker in Production', icon: 'terminal' },
    { name: 'Feature Flags', icon: 'terminal' },
    { name: 'Why is Tumblr so slow', icon: 'terminal' },
    { name: 'Yahoo :(', icon: 'terminal' },
    { name: 'design systems', icon: 'terminal' },
    { name: 'co-founder', icon: 'terminal' },
    { name: 'cryptocurrencies', icon: 'terminal' }, // @todo: remove this when it's not cool anymore
    { name: 'lurker', icon: 'terminal' },
    { name: 'maximize engagement', icon: 'terminal' },
    { name: 'conversion rates', icon: 'terminal' },
    { name: 'service workers', icon: 'terminal' },
    { name: 'offline', icon: 'terminal' },
    { name: 'scalable patterns', icon: 'terminal' },
    { name: 'self-documenting', icon: 'terminal' },
    { name: 'open source', icon: 'terminal' },
    { name: 'javascript', icon: 'terminal' },
    { name: '100% a hundred percent', icon: 'terminal' },
    { name: 'git push --force', icon: 'terminal' },
    { name: 'user stories', icon: 'terminal' },
    { name: 'Lagavulin 16yr', icon: 'terminal' },
    { name: 'Product Manager', icon: 'terminal' },
    { name: 'swiss army knife', icon: 'terminal' },
    { name: 'Avoid hybrid roles', icon: 'terminal' },
    { name: 'gulp and webpack built times getting out of hand', icon: 'terminal' },
    { name: 'forced repaints', icon: 'terminal' },
    { name: 'you don\'t need a CSS framework', icon: 'terminal' },
    { name: 'not built with Notepad', icon: 'terminal' },
    { name: '💯', icon: 'terminal' },
    { name: 'Let\'s fix the MTA', icon: 'terminal' },
];


function buildSvgSprite(type) {
    return `<svg class="icon" viewBox="0 0 8 8"><use xlink:href="/assets/svg/open-iconic.svg#${type}"></use></svg>`;
}


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandom(arr) {
    return arr[getRandomInt(arr.length)];
}

function shouldAppendContent() {
    return wrapper.clientHeight > (wrapper.scrollHeight - wrapper.scrollTop - bottomScrollReveal);
}

function appendContent() {
    const template = getRandom(templates).cloneNode(true);
    const skill = (template.dataset.templateSkill === "") ? getRandom(skills) : false;
    const card = document.importNode(template.content, true);

    if (skill) {
        card.querySelector('.skill-icon').innerHtml = buildSvgSprite(skill.icon);
        card.querySelector('.skill-name').textContent = skill.name;
    }

    wrapper.appendChild(card);
}

function autoScroll() {
    if (shouldAppendContent()) {
        appendContent();
    }
    easyScroll({
        'scrollableDomEle': wrapper,
        'direction': 'bottom',
        'duration': scrollRate,
        'easingPreset': 'linear',
        'onAnimationCompleteCallback': autoScroll,
    });
}

wrapper.addEventListener('DOMMouseScroll', function (event) { event.preventDefault() });
wrapper.addEventListener('mousewheel', function(event){ event.preventDefault() });
wrapper.addEventListener('touchmove', function(event){ event.preventDefault() });

appendContent();
autoScroll();

const video = document.querySelector('video');
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });
}

const audio = document.querySelector('audio');
const select = document.querySelector('select');
select.addEventListener("input", function(){
    audio.play();
});

// function captureImage() {
//     const canvas = document.createElement("canvas");
//     canvas.width = video.videoWidth * scale;
//     canvas.height = video.videoHeight * scale;
//     canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

//     var img = document.createElement("img");
//     img.src = canvas.toDataURL();
//     $output.prepend(img);
// };