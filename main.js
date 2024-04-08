const description = document.querySelector(".description")
const nav = document.querySelector(".nav")

window.onmousemove = e => {
    let target = e.target.closest(".list.task");
    let x = e.clientX;
    let y = e.clientY;

    if(target) {
        let desc = target.getAttribute("data-description")
        description.style.opacity = "100%"
        description.innerHTML = desc;
    }else description.style.opacity = "0"

    description.style.transform = `translateX(${x}px) translateY(${y}px)`
}

function OpenNav() {
    nav.classList.contains("opened") ? nav.classList.remove("opened") : nav.classList.add("opened")
}