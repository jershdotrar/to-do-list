function qSelect( q ) { return document.querySelector( q ); }

qSelect( '.get-jokes' ).addEventListener( 'click', getJokes );

function getJokes( e ) {
  const number = qSelect( 'input[type="number"]' ).value;
  const xhr = new XMLHttpRequest( );

  xhr.open( 'GET', `http://api.icndb.com/jokes/random/${number}`, true );

  xhr.onload = function( ) {
    if( this.status === 200 ) {
      const response = JSON.parse( this.responseText );
      let output = '';

      if( response.type === 'success' ) {
        // response.forEach returns JSON object because of this API's formatting
        // response.value.forEach returns the array inside JSON object because of formatting
        response.value.forEach( function( joke ){
          output += `<li>${joke.joke}</li>`;
        } );
      } else {
        output += '<li>Something went wrong</li>';
      }

      qSelect( '.jokes' ).innerHTML = output;
    }
  }

  xhr.send( );

  e.preventDefault( );
}