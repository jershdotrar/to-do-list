// Init objects
const storage         = new Storage( );
const weatherLocation = storage.getLocationData( );
const weather         = new Weather( weatherLocation.city, weatherLocation.state );
const ui              = new UI( );

// Get weather on DOM load
document.addEventListener( 'DOMContentLoaded', getWeather );

// Change location event
qSel( '#w-change-btn' ).addEventListener( 'click', ( ) => {
    const city  = qSel( '#city' ).value;
    const state = qSel( '#state' ).value;

    weather.changeLocation( city, state );
    storage.setLocationData( city, state );
    getWeather( );
    // Close modal
    $( '#locModal' ).modal( 'hide' );
} );

// Get weather promise, then paint to UI
function getWeather( ) {
    weather.getWeather( )
    .then( results => {
        // Paint results into UI
        ui.paint( results );
    } )
    .catch( err => console.log( err ) );
}
