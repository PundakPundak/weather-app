class TempManager{
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        const DBdata = await $.get(`/cities`)
        console.log(DBdata)
        this.cityData = DBdata
    }

    async getCityData(cityName) {
            const APIdata = await $.get(`/city/${cityName}`)
            console.log(APIdata)
            if ( Object.values(APIdata)[0] != null ) {
                if ( this.cityData.find(d => d.name == cityName) == undefined )
                {
                    this.cityData.push(APIdata)
                }
            }
        
    }

    async saveCity(cityName) {
        let newCity = this.cityData.find(d => d.name == cityName)
        const saveCitydata = await $.post(`/city`, newCity) 
        console.log(saveCitydata)
    }
    
    async removeCity(cityName) {
        //const deleteCitydata = await $.delete(`/city/${cityName}`) 
        await $.ajax({
            url: '/city/${cityName}',
            type: 'DELETE',
            success: function(result) {
                console.log(result)
            }
        })
    }   
}
