class TempManager{
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        console.log(`TempManager.js: Started getDataFromDB()`)
        const DBdata = await $.get(`/cities`)
        if (DBdata.length >= 1) {
            DBdata.forEach( d => this.cityData.push(d))
        }
    }

    async getCityData(cityName) {
        console.log(`TempManager.js: Started getCityData()`)
        const APIdata = await $.get(`/city/${cityName}`)
        //const APIdataParsed = JSON.parse(APIdata[0]) 
        console.log(`TempManager.js: APIdata.condition= ${APIdata.condition}`)
        this.cityData.push(APIdata)
        console.log(`TempManager.js: this.cityData[0].name = ${this.cityData[0].name}`)

    }

    async saveCity(cityName) {
        let newCity = this.cityData.find(d => d.name == cityName)
        const saveCitydata = await $.post(`/city`, newCity) 
        console.log(saveCitydata)
    }
    
    async removeCity(cityName) {
        const deleteCitydata = await $.delete(`/city/${cityName}`) 
        console.log(deleteCitydata)
    }   
}
