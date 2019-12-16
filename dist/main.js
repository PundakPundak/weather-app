// <li><img src={{conditionPic}} height="42" width="42"></li> 

const tempManager = new TempManager()
const renderer = new Renderer()

const loadPage = function () {
    console.log(`main.js: Started loadPage()`)
    tempManager.getDataFromDB()
    renderer.renderData(tempManager.cityData)
}

$("#search-button").on("click", async function handleSearch() {
    console.log(`main.js: Started handleSearch()`)
    await tempManager.getCityData( $("#cityName-input").val() )
    console.log(`main.js: tempManager.cityData[0].name = ${tempManager.cityData[0].name}`)
    renderer.renderData(tempManager.cityData)
    loadPage()
})

$(".save-button").on("click", async function saveCity() {
    console.log(`Started: saveCity()`)
    const cityName = $(this).closest().find(".city-name")
    console.log(cityName)
    await tempManager.getCityData( cityName )
    renderer.renderData(tempManager.cityData)
    loadPage()
})

$(".remove-button").on("click", async function removeCity() {
    const cityName = $(this).closest().find(".city-name")
    console.log(cityName)
    await tempManager.removeCity( cityName )
    loadPage()
})

loadPage()