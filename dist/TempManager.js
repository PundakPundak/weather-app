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
            const newCity = {
                name: APIdata.name,
                temperature: APIdata.main.temp,
                condition: `${APIdata.weather[0].main} ${APIdata.weather[0].description}`,
                conditionPic: `http://openweathermap.org/img/wn/${APIdata.weather[0].icon}@2x.png`
            }
            if ( this.cityData.find(d => d.name == cityName) == undefined )
                {
                    this.cityData.push(newCity)
                }
    }

    async saveCity(cityName) {
        let cityToSave = this.cityData.find(d => d.name == cityName)
        const saveCityRes = await $.post(`/city`, cityToSave) 
        console.log(saveCityRes)
    }
    
    async removeCity(cityName) {
        await $.ajax({
            url: `/city/${cityName}`,
            type: 'DELETE',
            success: function(result) {
                console.log(result)
            }
        })
    }  
    
    async updateCity(cityName) {
        await $.ajax({
            url: `/city/${cityName}`,
            type: 'PUT',
            success: (updateCityRes) =>  {
                console.log(updateCityRes)
                const updatedCity = {
                    name: updateCityRes.name,
                    temperature: updateCityRes.main.temp,
                    condition: `${updateCityRes.weather[0].main} ${updateCityRes.weather[0].description}`,
                    conditionPic: `http://openweathermap.org/img/wn/${updateCityRes.weather[0].icon}@2x.png`
                }
                const foundIndex = this.cityData.findIndex(d => d.name == cityName)
                this.cityData.splice(foundIndex-1, 1)
                this.cityData.push(updatedCity)
            }  
        })
    }
}
