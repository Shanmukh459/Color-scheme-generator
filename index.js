document.getElementById("get-color-btn").addEventListener("click", getColorScheme)
let colorsArr = []

function getColorScheme() {
    const colorPickerVal = document.getElementById("color-picker").value
    const mode = document.getElementById("color-mode").value.toLowerCase()
    console.log(mode)
    const queryStr = `hex=${colorPickerVal.substring(1)}&mode=${mode}&count=5`
    fetch(`https://www.thecolorapi.com/scheme?${queryStr}`)
        .then(res => res.json())
        .then(data => {
            for(let color of data.colors) {
                colorsArr.push(color.hex.value)
            }
            renderColors()
        })
    
}

function renderColors() {
    document.getElementById("colors-container").innerHTML = getColorSchemeHtml()
}

function getColorSchemeHtml() {
    let colorsHtml = colorsArr.map(color => {
        return `
            <div class="color-inner">
                <div class="color" style="{backgroundColor: ${color};}"></div>
                <p class="color-hex">${color}</p>
            </div>
        `
    }).join('')
    console.log(colorsHtml)
    return colorsHtml
}