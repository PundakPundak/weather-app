class Renderer{
    renderData(allCityData) {
        const allCityDataObj = {allCityData}
        console.log(allCityDataObj)
        const source = $('#cities-template').html()
        // console.log(`source = `)
        // console.log(source)
        const template = Handlebars.compile(source)
        // console.log(`template = `)
        // console.log(template)
        const newHTML = template(allCityDataObj)
        // console.log(`newHTML = `)
        // console.log(newHTML)
        $("#container").append(newHTML)
    }
}
