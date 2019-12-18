class Renderer{
    renderData(allCityData) {
        $("#container").empty()
        const allCityDataObj = {allCityData}
        const source = $('#cities-template').html()
        const template = Handlebars.compile(source)
        const newHTML = template(allCityDataObj)
        $("#container").append(newHTML)
    }
}
