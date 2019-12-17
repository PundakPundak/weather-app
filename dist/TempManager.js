class TempManager{
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        const DBdata = await $.get(`/cities`)
        this.cityData = DBdata
    }

    async getCityData(cityName) {
        const APIdata = await $.get(`/city/${cityName}`)
        this.cityData.push(APIdata)
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
