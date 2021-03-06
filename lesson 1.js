// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==

let btnNextPage = document.evaluate ("//a[@aria-label='Следующая страница']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
let pager = document.evaluate ("//span[@class='pager__item pager__item_current_yes pager__item_kind_page']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
let logo = document.evaluate ("//body/header/div/div/div/a[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
let text = document.getElementById('text');


let links = document.links;
let site = location.host;

if (location.host == "yandex.ru"){
    let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Гобой", "Как звучит флейта", "Что такое валторна", "Как выглядит тромбон", "Музыкальные диктанты онлайн", "Виолончель", "Теория музыки"],
    "crushdrummers.ru":["Барабанное шоу","Шоу барабанщиков москва","Заказать барабанное шоу"]
    }
    var submit = document.querySelector("button[type='submit']")
    if (text != null){
        site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
        let keywords = sites[site];
        let keyword = keywords[getRandom(0,keywords.length)];
        document.cookie = 'site='+site;
        writeWord(keyword);
    }
    else {
        site = getCookie('site');
    }
    getYandexPage();
}
else {
    if (getRandom(0,100)>20){
        let index = getRandom(0,links.length);
        if(links[index].href.indexOf(site)!=-1 && links[index].href.indexOf('#')== -1 && links[index].href.indexOf('.jpg')== -1) {
            setTimeout(()=>{links[index].click();}, getRandom(3000, 10000));
		}
        else location.href = `https://${site}/`;
    }
    else location.href = "https://yandex.ru";
}

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

function writeWord(keyword){
  let i = 0;
  let timerId = setInterval(()=>{
  setTimeout(()=>{
    text.value += keyword[i]==undefined?'':keyword[i];
    i++;
    if (i==keyword.length) {
        clearInterval(timerId);
        submit.click();
    }
    },getRandom(0,1000));
  },300);
}

function getYandexPage() {
	let goNextPage = true;
	for (let i=0;i<links.length;i++){
		if (links[i].href.indexOf(site) != -1){
            let link = links[i];
            setTimeout(()=>{link.scrollIntoView(true);},2000);
            goNextPage = false;
            links[i].removeAttribute('target');
            setTimeout(()=>link.click(), getRandom(3000,10000));
     break;
		}
	}

	if (goNextPage) { setTimeout(()=>{
			if (pager.singleNodeValue.innerText == "10") {
				logo.singleNodeValue.click();
			}
			else {
				btnNextPage.singleNodeValue.click()
			};
		}, getRandom(3000,10000));
	}
}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
 }
