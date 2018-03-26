class UI {
    constructor( ) {
        this.location   = qSel( '#w-location' );
        this.desc       = qSel( '#w-desc' );
        this.string     = qSel( '#w-string' );
        this.details    = qSel( '#w-details' );
        this.icon       = qSel( '#w-icon' );
        this.humidity   = qSel( '#w-humidity' );
        this.feelsLike  = qSel( '#w-feels-like' );
        this.dewpoint   = qSel( '#w-dewpoint' );
        this.wind       = qSel( '#w-wind' );
    }

    paint( weather ) {
        this.location.textContent   = weather.display_location.full;
        this.desc.textContent       = weather.weather;
        this.string.textContent     = weather.temperature_string;
        this.humidity.textContent   = `Relative Humidity: ${weather.relative_humidity}`;
        this.feelsLike.textContent  = `Feels Like: ${weather.feelslike_string}`;
        this.dewpoint.textContent   = `DewPoint: ${weather.dewpoint_string}`;
        this.wind.textContent       = `Wind: ${weather.wind_string}`;
        this.icon.setAttribute( 'src', weather.icon_url );
    }
}