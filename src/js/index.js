const site = require('file-loader?name=[name].[ext]!../index.html');
const styles = require('file-loader?name=[name].[ext]!../styles/main.css');

const body = document.querySelector('body');
const wrapper = document.querySelector('.🆒');
const template = document.querySelector('template');
const bottomScrollReveal = window.innerHeight;

function moreBenson() {
    return wrapper.clientHeight >
        (wrapper.scrollHeight - wrapper.scrollTop - bottomScrollReveal);
}

function onScroll(event) {
    if (!moreBenson()) {
        return;
    }

    benson();
}

function benson() {
    const newTemplate = template.cloneNode(true);

    template.parentNode.appendChild(newTemplate);

    newTemplate.parentNode.replaceChild(
        document.importNode(newTemplate.content, true),
        newTemplate
    );
}

wrapper.addEventListener('scroll', onScroll);

benson();