document.getElementById("get-color-btn").addEventListener("click", getColorScheme)

function getColorScheme() {
    const colorPicker = document.getElementById("color-picker").value
    console.log(colorPicker)
    fetch()
}