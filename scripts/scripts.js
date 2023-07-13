//Solicitaçãoes de API para o background da home

const BASE_URL = 'https://api.unsplash.com/photos/random?client_id=5wlCbyHbAiamNWYmMLXLAnwPjz97JGEwefvDdFGRLb0'
const banner = document.getElementById('banner')

const getPhotoBanner = async (url) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        banner.style.background = `url('${data.urls.full}') center center / cover no-repeat`;
    } catch (error) {
        console.log(error.message)
        banner.style.background = `url('https://images.unsplash.com/photo-1651420079042-c16bb74c2357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80') center center / cover no-repeat`;
    }
}

setTimeout(getPhotoBanner(BASE_URL), '60 second')

//Form de download de midia 

const inputMidia = document.getElementById('text-01')
const buttonMidia = document.getElementById('buttonMidia')

buttonMidia.addEventListener('click', async() => {
    try {
        const response = await fetch(inputMidia.value)
        const file = await response.blob()
        const link = document.createElement('a')
        link.href = URL.createObjectURL(file)
        link.download = new Date().getTime()
        link.click()
    } catch (error) {
        alert('Erro ao tenta baixar a midia!' + error.message + error.status)
    }
})

//Conversor de moedas simples 

const valueConvertion = document.getElementById('valueConvertion')
const moedas = document.getElementById('moedas')
const buttonConvertion = document.getElementById('buttonConvertion')
const responseConvertion = document.getElementById('resConvertion')

const Conversor = async () => {
    try {
        const response = await fetch(`https://economia.awesomeapi.com.br/last/${moedas.value}`)
        const data = await response.json()
        const cotation = Object.values(data)
        const calcConvertion = cotation[0].high * Number(valueConvertion.value)
        responseConvertion.innerHTML = `
            <p style="color: #f1f1f1; text-align: center;">
                ${Number(valueConvertion.value).toLocaleString('pt-BR', { style: 'currency', currency: `${moedas.value}`})} é
                equivalente à ${calcConvertion.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}.
            </p>
        `
        valueConvertion.value = ''
        valueConvertion.focus()
    } catch (error) {
        console.log(error)
        alert('Erro ao fazer a converção!')
    }
}

const validationValues = () => {
    if(valueConvertion.value >= 1){
        return Conversor()
    }
    alert('Digite um valor válido!')
    valueConvertion.focus()
    valueConvertion.value = ''
}

buttonConvertion.addEventListener('click', () => {
    return validationValues()
})

valueConvertion.addEventListener('keypress', () => {
    const {keyCode} = window.event
    if(keyCode == 13){
        return validationValues()
    }
})

//Infinite-Scroll animation


const scrollAnimation = document.getElementById('scroll-animation')

document.addEventListener('DOMContentLoaded', () => {
    const TAGS = ['HTML', 'CSS', 'JavaScript', 'Typescript', 'Tailwind', 'React', 'Next.js', 'RemixJS', 'UI/UX', 'VueJS', 'NodeJS', 'WEB'];
    const DURATION = 15000;
    const ROWS = 5;
    const TAGS_PER_ROW = 20;

    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const shuffle = (arr) => [...arr].sort(() => .5 - Math.random());

    const createTagElement = (text) => {
        const tagElement = document.createElement('div');
        tagElement.classList.add('tag');
        tagElement.innerHTML = `<span>#</span> ${text}`;
        return tagElement;
    }

    const createInfiniteLoopSlider = (tags, duration, reverse) => {
        const loopSliderElement = document.createElement('div');
        loopSliderElement.classList.add('loop-slider');
        loopSliderElement.style.setProperty('--duration', `${duration}ms`);
        loopSliderElement.style.setProperty('--direction', reverse ? 'reverse' : 'normal');

        const innerElement = document.createElement('div');
        innerElement.classList.add('inner');

        tags.forEach(tag => {
            innerElement.appendChild(createTagElement(tag));
            innerElement.appendChild(createTagElement(tag));
        });

        loopSliderElement.appendChild(innerElement)
        return loopSliderElement;
    }

    const tagListElement = scrollAnimation.querySelector('.tag-list');

    [...new Array(ROWS)].forEach((_, i) => {
        const duration = random(DURATION - 5000, DURATION + 5000);
        const reverse = i % 2;
        const tags = shuffle(TAGS).slice(0, TAGS_PER_ROW);

        tagListElement.appendChild(createInfiniteLoopSlider(tags, duration, reverse));
    });
}) 

//Tab de conteudo de tests

const tabLinks = document.querySelectorAll('.tab-links')
const tabContents = document.querySelectorAll('.tab-content')

class TabTest {
    constructor(Links, Contents){
        this.links = Links
        this.content = Contents
    }

    OcultContent(){
        this.content.forEach((contents) => {
            const children = contents.children
            Array.from(children).forEach((conteudo) => {
                conteudo.style.display = 'none'
            })
        })
    }

    RemuveActiveClass(){
        this.links.forEach((link) => {
            const children = link.children
            Array.from(children).forEach((activate) => {
                activate.className = activate.className.replace('active', '')
            })
        })
    }

    ShowContent(id){
        const seeCont = document.querySelector(`#${id}`)
        seeCont.style.display = 'block'
    }

    SelectTabContent(event){
        this.OcultContent()
        this.RemuveActiveClass()

        const isLinkClick = event.currentTarget
        this.ShowContent(isLinkClick.dataset.id)
        isLinkClick.className = 'active'
    }

    Mutation(){
        this.links.forEach((link) => {
            const children = link.children
            Array.from(children).forEach((item) => {
                item.addEventListener('click', this.SelectTabContent.bind(this))
            })
        })
    }

    InitialContent(){
        const initialClick = document.querySelector('[data-open]')
        initialClick.click()
    }

    init(){
        this.RemuveActiveClass()
        this.OcultContent()
        this.Mutation()
        this.InitialContent()
    }
}

window.addEventListener('load', () => {
    const tabContent = new TabTest(tabLinks, tabContents)
    tabContent.init()
})

//Menu responsivo

const hamburgerMenu = document.querySelector('.mobile-menu')
const menuResponsivo = document.querySelector('.responsiva')

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active')
    menuResponsivo.classList.toggle('active')
})