const description = document.querySelector(".description")
const nav = document.querySelector(".nav")
const cursor = {
    x: 0,
    y: 0
}
const Inputname = document.querySelector(".taskName")
const Inputtime = document.querySelector(".taskTime")
const Inputdesc = document.querySelector(".taskDesc")
const mainBody = document.querySelector(".main > .body")

let data = JSON.parse(localStorage.getItem("list"));

if(!data) {
    localStorage.setItem("list", JSON.stringify([]))
    data = []
}


//general code

const onload = (() => {
    for (let i = 0; i < data.length; i++) {
        mainBody.innerHTML += `
        <div class="list task" data-arrayIndex="${data[i].index}" data-description="${data[i].desc}">
            <div class="date"><p>at ${data[i].time}</p></div>
            <div class="nameoftodo">${data[i].name}</div>
            <input class="check" onchange="Check(this)" type="checkbox" name="" id="">
            <div class="actions">
                <button class="confirm" onclick="removeCheckList()"><ion-icon name="checkmark-outline"></ion-icon></button>
                <button class="decline" onclick="CloseCheckConfirm()"><ion-icon name="close-outline"></ion-icon></button>
            </div>
            <div class="strike"></div>
        </div>
        `
    }
    if(data.length == 0) mainBody.innerHTML += "<b>¯\\_(ツ)_/¯ \ngot nothing to do?</b>"
})()

window.onmousemove = e => {
    let target = e.target.closest(".list.task")
    let actionparent = e.target.closest(".list.task > .actions")

    cursor.x = e.clientX;
    cursor.y = e.clientY;

    if(target && !actionparent) {
        let desc = target.getAttribute("data-description")
        if(desc == "") {
            description.innerHTML = "no description";
        }else description.innerHTML = desc;

        description.style.opacity = "100%"
        if(description.classList.contains("static")) description.classList.remove("static")
    }else {
        description.innerHTML = ""
        if(!description.classList.contains("static")) description.classList.add("static")
    }

    const keyframes = {
        transform : `translateX(${cursor.x}px) translateY(${cursor.y}px)`
    }

    description.animate(keyframes, {
        duration: 800,
        fill: 'forwards'
    })
}

function AddNewTask() {
    if(Inputname.value == "" || Inputname.value.trim() == "" || Inputtime.value == "") return;
    
    let div = document.createElement("div")
    div.classList.add("list")
    div.classList.add("task")
    div.classList.add("new")

    div.setAttribute("data-arrayIndex", data.length)
    div.setAttribute("data-description", Inputdesc.value)

    div.innerHTML +=  `
        <div class="date"><p>at ${Inputtime.value}</p></div>
        <div class="nameoftodo">${Inputname.value}</div>
        <input class="check" onchange="Check(this)" type="checkbox" name="" id="">
        <div class="actions">
            <button class="confirm" onclick="removeCheckList()"><ion-icon name="checkmark-outline"></ion-icon></button>
            <button class="decline" onclick="CloseCheckConfirm()"><ion-icon name="close-outline"></ion-icon></button>
        </div>
        <div class="strike"></div>
    `
    mainBody.appendChild(div);

    setTimeout(() => {
        div.scrollIntoView({ behavior: "smooth" });
        div.classList.remove("new")
    }, 1000)

    data.push({
        name: Inputname.value,
        time: Inputtime.value,
        desc: Inputdesc.value,
        index: data.length,
    })
    localStorage.setItem("list", JSON.stringify(data));
    CloseNav()
}

let action;
let checkbox;
let list;
let closing = false;

function Check(box) {
    if(box.checked && !closing) {
        closing = true;
        checkbox = box;
        action = box.parentElement.querySelector(".actions");
        list = box.parentElement;
        OpenCheckConfirm()
    }else {
        box.checked = false;
    }
}

function OpenNav() {
    Inputname.value = "";
    Inputtime.value = "";
    Inputdesc.value = "";
    nav.classList.add("opened")
    let date = new Date()
    Inputtime.value =  `${date.getHours()}:${date.getMinutes() < 10 ? `${date.getMinutes()}0` : date.getMinutes()}`
}

function CloseNav() { nav.classList.remove("opened") }

function OpenCheckConfirm() { action.classList.add("opened") }

function removeCheckList() {
    list.classList.add("finished");
    document.querySelector(".loadingStatus").classList.add("loading")
    setTimeout(() => {
        list.classList.add("vanish");
        setTimeout(() => {
            list.remove()
            closing = false;
            let index = parseInt(list.getAttribute("data-arrayIndex"));
            data = data.filter(function(item) {
                return item !== data[index]
            })
            localStorage.setItem("list", JSON.stringify(data))
            document.querySelector(".loadingStatus").classList.remove("loading")
            if(data.length == 0) mainBody.innerHTML += "<b>¯\\_(ツ)_/¯ \ngot nothing to do?</b>"
        }, 730)
    }, 500)
}

function CloseCheckConfirm() { 
    checkbox.checked = false;
    closing = false;
    action.classList.remove("opened") 
}