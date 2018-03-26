// Init qSel
const qSel = q => document.querySelector( q );

class Storage {
    constructor( ) {
        this.city;
        this.state;
        this.defaultCity    = 'Dallas';
        this.defaultState   = 'TX';
    }

    getLocationData( ) {
        // If no existing city, set to defaultCoty
        if( localStorage.getItem( 'city' ) === null ) {
            this.city = this.defaultCity;
        } else {
            this.city = localStorage.getItem( 'city' );
        }

        // If no existing state, set to defaultState
        if( localStorage.getItem( 'state' ) === null ) {
            this.state = this.defaultState;
        } else {
            this.state = localStorage.getItem( 'state' );
        }

        // Return city and state
        return {
            city: this.city,
            state: this.state
        }
    }

    setLocationData( city, state ) {
        localStorage.setItem( 'city', city );
        localStorage.setItem( 'state', state );
    }
}