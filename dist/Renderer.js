class Renderer{
    renderData(allCityData) {
        const allCityDataObj = {allCityData}
        const source = $('#cities-template').html()
        const template = Handlebars.compile(source)
        const newHTML = template(recipes)
        $("#container").append(newHTML)
    }
}
