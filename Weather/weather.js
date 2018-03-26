class Weather {
    constructor( city, state ) {
        this.apiKey    = '36430ee6ba9e1bf7';
        this.city      = city;
        this.state     = state;
    }

    async getWeather( ) {
        const response = await fetch( `http://api.wunderground.com/api/${this.apiKey}/conditions/q/${this.state}/${this.city}.json` );
        const responseData = await response.json( );
        return responseData.current_observation;
    }

    // Change weather location
    changeLocation( city, state ) {
        this.city = city;
        this.state = state;
    }
}