const root = document.querySelector(":root")
const wineBottles = document.querySelectorAll(".bottle-item")
let prevBottle = document.querySelector('[bottle-index="1"]')
let prevIndex = null
let currIndex = 1
let delta = 0

const wineTitles = Array.from(document.getElementById("wine-title").children)
console.log(wineTitles)
let prevTitle = null
let currTitle = wineTitles[0]

wineBottles.forEach(wineBottle => {
    wineBottle.addEventListener("click", e => {
        prevIndex = currIndex
        if (currIndex == wineBottle.getAttribute("bottle-index")) {
            return
        }
        currIndex = wineBottle.getAttribute("bottle-index")
        delta += (prevIndex - currIndex) * 20

        if (!wineBottle.classList.contains("active")) {
            e.preventDefault();
        }
        
        // console.log("curr: " + currIndex + " prev: " +  prevIndex)

        wineBottle.classList.add("active")
        prevBottle.classList.remove("active")
        prevBottle = wineBottle
        root.style.setProperty("--left-delta", delta + "%")

        prevTitle = currTitle
        currTitle = wineTitles[currIndex - 1]

        currTitle.classList.add("active-title")
        prevTitle.classList.remove("active-title")
    })

    wineBottle.addEventListener("mouseover", e => {
        if (wineBottle.classList.contains("active")) {
            return
        }
        // console.log("hovered")
        wineBottle.classList.add("hovered")
    })

    wineBottle.addEventListener("mouseleave", e => {
        wineBottle.classList.remove("hovered")
    })
});