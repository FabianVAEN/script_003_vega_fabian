function addClass(containerDiv, className){
    containerDiv.classList.add(className)
}

function genratePattern(dimension,boxes){
    const pattern = []
    while (pattern.length < boxes ){
        const randomNumber = Math.floor(1+Math.random() * dimension * dimension)
        if(!pattern.includes(randomNumber)){
            pattern.push(randomNumber)
        }
    }
    return pattern
}

function createMatrix(dimension, container, boxes, seconds){
    container.innerHTML = ""
    let counter = 1

    let rights = 0
    let fails = 0
    let discovered = new Set()

    const pattern = genratePattern(dimension, boxes)

    for (let i = 0; i < dimension; i++ ){
        const div = document.createElement("div")
        addClass(div, "demo")

        for (let j = 0; j < dimension; j++ ){
            const content = document.createElement("div")
            addClass(content, "content")
/*          content.textContent = counter*/
            const num = counter;
            if (pattern.includes(num)){
                addClass(content, "highlight")

                content.onclick = function(){
                    if (!discovered.has(num)) {
                        discovered.add(num)
                        rights++
                        document.getElementById("rights-count").textContent = rights
                    }

                    if (rights === pattern.length){
                        alert("Ganaste")
                    }
                }

            } else {

                content.onclick = function(){
                    fails++
                    document.getElementById("fails-count").textContent = fails
                    console.log("Incorrecto")
                }
            }

            div.appendChild(content)
            counter++
        }

        container.appendChild(div)
    }

    const highlights = container.querySelectorAll(".highlight")

    setTimeout(() => {
        highlights.forEach(element => element.classList.remove("highlight"))
    }, seconds * 1000)
}


function createMemoryGame(){
    const container = document.getElementById("game")
    const dimensionValue = parseInt(document.getElementById("dimension").value)
    const boxesValue = parseInt(document.getElementById("boxes").value)
    const secondsValue = parseInt(document.getElementById("seconds").value)

    createMatrix(dimensionValue, container, boxesValue, secondsValue)
}

document.addEventListener("DOMContentLoaded", function (){
    console.log("Ya se cargo este DOM")
    document.getElementById("generate-matrix").addEventListener("click", createMemoryGame)
})
