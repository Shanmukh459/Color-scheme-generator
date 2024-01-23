const colorsContainer = document.getElementById("colors-container")

document.getElementById("get-color-btn").addEventListener("click", getColorScheme)

document.addEventListener('click', function(e) {
    if(e.target.dataset.color){
        copyToClipBoard(e.target.dataset.color)
    }
})

let colorsArr = []

function getColorScheme() {
    const colorPickerVal = document.getElementById("color-picker").value
    const mode = document.getElementById("color-mode").value.toLowerCase()
    console.log(mode)
    const queryStr = `hex=${colorPickerVal.substring(1)}&mode=${mode}&count=5`
    fetch(`https://www.thecolorapi.com/scheme?${queryStr}`)
        .then(res => res.json())
        .then(data => {
            colorsArr = []
            for(let color of data.colors) {
                colorsArr.push(color.hex.value)
            }
            renderColors()
        })  
}

function clearColorContainer() {
    colorsContainer.innerHTML = " "
}

function renderColors() {
    clearColorContainer()
    colorsContainer.innerHTML = getColorSchemeHtml()
    colorsContainer.style.display = "flex"
    for(let color of colorsArr) {
        document.getElementById(color).style.background = color
    }
}

function getColorSchemeHtml() {
    let colorsHtml = ''
    colorsHtml = colorsArr.map(color => {
        return `
            <div class="color-inner">
                <div class="color" id="${color}"></div>
                <p class="color-hex" data-color="${color}">${color}</p>
            </div>
        `
    }).join('')
    console.log(colorsHtml)
    return colorsHtml
}

function copyToClipBoard(colorToCopy) {
    navigator.clipboard.writeText(colorToCopy)
    alert("Copied the text: " + colorToCopy);
}