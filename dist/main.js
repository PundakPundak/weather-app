// <li class="city-name">City name: {{name}}</li>
// <img src={{conditionPic}} height="42" width="42">

const tempManager = new TempManager()
const renderer = new Renderer()

const loadPage = async function () {
    await tempManager.getDataFromDB()
    //renderer.emptyContainer()
    renderer.renderData(tempManager.cityData)
}

$("#search-button").on("click", async function handleSearch() {
    let cityNameInputFlag = false
    const cityNameInput = $("#cityName-input").val()
    if (cityNameInput) {
        cityNameInputFlag = true
    }
    if (cityNameInputFlag == true)
    // if ( $("#cityName-input").val() )
    {
        await tempManager.getCityData( $("#cityName-input").val() )
        //renderer.emptyContainer()
        renderer.renderData(tempManager.cityData)
    }
})

$("#container").on("click", ".save-button", async function handleSaveCity() {
    const cityName = $(this).closest(`div`).find(`.city-name`).text()
    console.log(cityName)
    await tempManager.saveCity( cityName )
    renderer.renderData(tempManager.cityData)
})

$("#container").on("click", ".remove-button", async function handleRemoveCity() {
    const cityName = $(this).closest(`div`).find(".city-name").text()
    console.log(cityName)
    await tempManager.removeCity( cityName )
    renderer.renderData(tempManager.cityData)
})

$("#container").on("click", ".update-button", async function handleUpdateCity() {
    const cityName = $(this).closest(`div`).find(".city-name").text()
    console.log(cityName)
    await tempManager.updateCity( cityName )
    renderer.renderData(tempManager.cityData)
})

loadPage()