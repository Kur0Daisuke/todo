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
        <div class="list task" data-description="${data[i].desc}">
            <div class="date"><p>at ${data[i].time}</p></div>
            <div class="nameoftodo">${data[i].name}</div>
            <input class="check" onchange="Check(this)" type="checkbox" name="" id="">
        </div>
        `
    }
})()

window.onmousemove = e => {
    let target = e.target.closest(".list.task")
    cursor.x = e.clientX;
    cursor.y = e.clientY;

    if(target) {
        let desc = target.getAttribute("data-description")
        if(desc == "") {
            description.innerHTML = "no description";
        }else description.innerHTML = desc;

        description.style.opacity = "100%"
        
    }else description.style.opacity = "0"

    description.style.transform = `translateX(${cursor.x}px) translateY(${cursor.y}px)`
}

function AddNewTask() {
    if(Inputname.value == "" || Inputname.value.trim() == "" || Inputtime.value == "") return;
    
    mainBody.innerHTML +=  `
    <div class="list task new" data-description="${Inputdesc.value}">
        <div class="date"><p>at ${Inputtime.value}</p></div>
        <div class="nameoftodo">${Inputname.value}</div>
        <input class="check" onchange="Check(this)" type="checkbox" name="" id="">
    </div>
    `
    data.push({
        name: Inputname.value,
        time: Inputtime.value,
        desc: Inputdesc.value,
    })
    localStorage.setItem("list", JSON.stringify(data));
    CloseNav()
}

function Check(box) {
    if(box.checked) {
        console.log("checked")
    }
}

function OpenNav() {
    Inputname.value = "";
    Inputtime.value = "";
    Inputdesc.value = "";
    nav.classList.add("opened")
}

function CloseNav() {
    nav.classList.remove("opened")
}
