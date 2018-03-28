// Init vars
const qSelect = q => document.querySelector( q );
// UI
const home    = qSelect( '#home' ),
      about   = qSelect( '#about' ),
      contact = qSelect( '#contact' );

// Set Page State
const PageState = function( ) {
  // Set current state
  let currentState  = new homeState( this );
  // Init page state
  this.init   = function( ) { this.change( new homeState ); }
  // Change page state
  this.change = function( state ) { currentState = state; }
};

// Home State
const homeState = function( page ) {
  qSelect( '#heading' ).textContent  = null;
  qSelect( '#content' ).innerHTML    = `
    <div class="jumbotron">
      <h1 class="display-3">Hello, world!</h1>
      <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      <hr class="my-4">
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      <p class="lead">
        <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
      </p>
    </div>
  `;
};

// About State
const aboutState = function( page ) {
  qSelect( '#heading' ).textContent = 'About Us';
  qSelect( '#content' ).innerHTML   = `<p class="z-red">This is the about page</p>`;
};

// Contact State
const contactState = function( page ) {
  qSelect( '#heading' ).textContent = 'Contact Us';
  qSelect( '#content' ).innerHTML   = `
  <form>
    <div class="form-group">
      <label>Name</label>
      <input type="text" class="form-control">
    </div>
    <div class="form-group">
    <label>Email address</label>
    <input type="email" class="form-control">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
  </form>
`;
};

// Instantiate initial page
const page = new PageState( );
page.init( );


// Change pageState to Home
home.addEventListener( 'click', ( e ) => {
  page.change( new homeState );
  e.preventDefault( );
} );

// Change pageState to About
about.addEventListener( 'click', ( e ) => {
  page.change( new aboutState );
  e.preventDefault( );
} );

// Change pageState to Contact
contact.addEventListener( 'click', ( e ) => {
  page.change( new contactState );
  e.preventDefault( );
} );