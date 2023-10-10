"use strict"


// Dom Model
let lower = document.getElementById("upper")
lower.innerText = lower.innerText.toUpperCase()

let h2s = document.getElementsByTagName("h2")
h2s[h2s.length - 1].style.setProperty("color", "blue")
h2s[h2s.length - 2].style.setProperty("color", "blue")

let para = document.getElementsByClassName("byclass")[0]
para.style.setProperty('color', 'orange')

let qs = document.querySelectorAll("#dom div>p")
qs[qs.length - 1].style.setProperty('color', 'green')

para = document.querySelector("#dom #text")
console.log(para.innerHTML)
console.log(para.innerText)
console.log(para.textContent)

para = document.querySelector("#dom #classlist")
para.classList.add("bigtext")
para.classList.add("grey")

let parent = document.getElementById("parent")

console.log(parent.parentElement.childElementCount)
console.log(parent.parentElement.children)
console.log(parent.parentElement.previousSibling)
console.log(parent.parentElement.previousElementSibling)

let newPara = document.createElement('p');
newPara.textContent = "I added this para using js appendChild!!"
parent.appendChild(newPara)

parent.append("\n I was added using parent.append");

parent.prepend("\n I was added using parent.prepend");

newPara = document.createElement('p')
newPara.textContent = "I was added using parent.insertAdjacentElement beforebegin"
parent.insertAdjacentElement('beforebegin', newPara)

newPara = document.createElement('p')
newPara.textContent = "I was added using parent.insertAdjacentElement beforeend"
parent.insertAdjacentElement('beforeend', newPara)

newPara = document.createElement('p')
newPara.textContent = "I was added using parent.insertAdjacentElement afterbegin"
parent.insertAdjacentElement('afterbegin', newPara)

newPara = document.createElement('p')
newPara.textContent = "I was added using parent.insertAdjacentElement afterend"
parent.insertAdjacentElement('afterend', newPara)

function deleteChild() {
    console.log("Deleting item")
    document.querySelector("#parent p").remove();
    parent.removeChild(document.querySelector("#parent *"));
}


document.getElementById("clickablepara").onclick = () => { alert("Hello") }

let mybox = document.querySelector("#events #box");
mybox.style.height = "200px";
mybox.style.width = "200px";
mybox.style.background = "red";
mybox.style.transition = "3s";
mybox.textContent = "Click Here!";

mybox.addEventListener('click', () => { alert("I used Event Listeners!!") })

mybox.addEventListener('click', () => { alert("You can get this message only once!!!") }, { once: true })

mybox = document.querySelector("#colorbox");
mybox.style.height = "200px";
mybox.style.width = "200px";
mybox.style.background = "red";
mybox.style.transition = "100ms";
mybox.style.margin = "50px";
mybox.style.display = "flex";
mybox.addEventListener('mouseover', () => {
    const color = `rgb(${Math.round((Math.random() * 255))}, ${Math.round((Math.random() * 255))}, ${Math.round((Math.random() * 255))})`;
    mybox.style.backgroundColor = color
    console.log(color)
})

function rainbow(e) {
    e.stopPropagation()
    console.dir(e)
    this.style.backgroundColor = `rgb(${Math.round((Math.random() * 255))}, ${Math.round((Math.random() * 255))}, ${Math.round((Math.random() * 255))})`;
}

document.getElementById("chaos").addEventListener('click', () => {
    for (let item of document.querySelectorAll('*')) {
        item.addEventListener('click', rainbow);
    }
})

function echo(e) {
    document.getElementById('echobox').textContent = e.key;
}

window.addEventListener('keydown', echo);

document.getElementById("myform").addEventListener('submit', (e) => { e.preventDefault(); this.backgroundColor = 'black', console.log("Submitted") })

document.getElementById('echo2').style.width = "auto";

document.getElementById('echoinput').addEventListener('input', function (e) {
    document.getElementById('echo2').textContent = this.value;
})

function decrement(i) {
    if (i == 0) {
        document.getElementById('timer').textContent = "Click Here!"
        return
    }
    document.getElementById('timer').textContent = i
    setTimeout(decrement, 1000, i - 1);
}

document.getElementById('timer').addEventListener('click', function (e) {
    decrement(10);
})

let colors = ['red', 'green', 'yellow', 'blue', 'orange', 'violet', 'indigo']
let i = 0;
function disco() {
    setTimeout(() => {
        document.getElementById('timer').parentElement.style.backgroundColor = colors[(i++) % colors.length];
        disco();
    }, 1000)
}

document.getElementById('disco').addEventListener('click', disco)

async function promise(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() >= 0.5) {
                resolve("S3cR3t D4t4");
            } else {
                reject("No Luck!");
            }
        }, 2000); // Delay of 2 seconds (2000 milliseconds)
    });
}

async function dostuff() {
    try {
        const data = await promise();
        console.log(data);
    } catch (err) {
        console.log('interrupted:', err);
    }
    console.log('done');
}

dostuff();

/* Using XMLHttpRequest*/
const req = new XMLHttpRequest();

req.onload = function () {
    console.log(this.response);
}

req.onerror = function () {
    console.log(this);
}

req.open("GET", "https://swapi.dev/api/people/1/")
req.send()

/*FETCH*/
fetch("https://swapi.dev/api/people/2/")
    .then(res => {
        console.log(res);
        return res.json()
    })
    .then(data => console.dir(data))
    .catch(e => {
        console.log(e);
    })

/* fetch using aync */

const peopleData = async () => {
    try {
        const res = await fetch("https://swapi.dev/api/people/3");
        const data = await res.json();
        console.dir(data);
    }
    catch (e) {
        console.log(e);
    }
};

peopleData()

/*using axios */

const getPeople2 = async () => {
    const res = await axios.get("http://swapi.dev/api/people/1/");
    console.dir(res);
}

getPeople2()

const getJoke = async () => {
    const res = await (axios.get("https://icanhazdadjoke.com/", { headers: { Accept: 'application/json' } }))
    console.log(res.data.joke)
}

getJoke()