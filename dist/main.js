// <li class="city-name">City name: {{name}}</li>
// <li><img src={{conditionPic}} height="42" width="42"></li> 

const tempManager = new TempManager()
const renderer = new Renderer()

const loadPage = async function () {
    await tempManager.getDataFromDB()
    renderer.renderData(tempManager.cityData)
}

$("#search-button").on("click", async function handleSearch() {
    await tempManager.getCityData( $("#cityName-input").val() )
    renderer.renderData(tempManager.cityData)
})

$("#container").on("click", ".save-button", async function saveCity() {
    console.log(`Started: saveCity()`)
    const cityName = $(this).closest(`div`).find(`.city-name`).text()
    console.log(cityName)
    await tempManager.getCityData( cityName )
    renderer.renderData(tempManager.cityData)
})

$("#container").on("click", ".remove-button", async function removeCity() {
    const cityName = $(this).closest().find(".city-name")
    console.log(cityName)
    await tempManager.removeCity( cityName )
})

loadPage()