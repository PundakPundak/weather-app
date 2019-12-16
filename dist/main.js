const tempManger = new TempManager()
const renderer = new Renderer()

const loadPage = function () {
    tempManger.getDataFromDB()
    renderer.renderData(tempManger.cityData)
}

const handleSearch = async function(cityInput) {
    await tempManger.getCityData(cityInput)
    renderer.renderData(tempManger.cityData)
}

$("button").on("click", async function handleSearch() {
    await tempManger.getCityData( $("#city-input").val() )
    renderer.renderData(tempManger.cityData)
})

$(".save-button").on("click", async function saveCity() {
    const cityName = $(this).closest().find(".city-name")
    await tempManger.getCityData( cityName )
    renderer.renderData(tempManger.cityData)
})

$(".remove-button").on("click", async function removeCity() {
    const cityName = $(this).closest().find(".city-name")
    await tempManger.removeCity( cityName )

    //loadPage()
})

loadPage()