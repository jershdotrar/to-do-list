function easyHTTP( ) {
  this.http             = new XMLHttpRequest( );
}

// Make an HTTP GET Request
easyHTTP.prototype.get  = function( url, callback ) {
  this.http.open( 'GET', url, true );
  // Set content type request header for adding data, not needed for GET or DELETE
  //this.http.setRequestHeader( 'Content-type', 'application/json' );

  // Bind this to self for function scope to reference outer this
  let self              = this;
  this.http.onload      = function( ) {
    // Check if status is good
    if( self.http.status === 200 ) {
      // Take two args, first arg to check for any errors, second for response
      // If no error, pass null + responseText
      callback( null, self.http.responseText );
    } else {
      // Else if error, return error code
      callback( `Error: ${self.http.status}` );
    }
  }

  // Send
  this.http.send( );
}

// Make an HTTP POST Request
easyHTTP.prototype.post = function( url, data, callback ) {
  this.http.open( 'POST', url, true );
  // Set content type request header for adding data, not needed for GET or DELETE
  this.http.setRequestHeader( 'Content-type', 'application/json' );

  // Bind this to self for function scope to reference outer this
  let self              = this;
  this.http.onload      = function( ) {
    // Don't need to check connection status if POST/PUT, no client data receipt
    // Take two args, first arg to check for any errors, second for response
    callback( null, self.http.responseText );
  }

  // Send correctly parsed data
  this.http.send( JSON.stringify( data ) );
}

// Make an HTTP PUT Request
easyHTTP.prototype.put = function( url, data, callback ) {
  this.http.open( 'PUT', url, true );
  // Set content type request header for adding data, not needed for GET or DELETE
  this.http.setRequestHeader( 'Content-type', 'application/json' );

  // Bind this to self for function scope to reference outer this
  let self              = this;
  this.http.onload      = function( ) {
      callback( null, self.http.responseText );
  }

  // Send correctly parsed data
  this.http.send( JSON.stringify( data ) );
}

// Make an HTTP DELETE Request
easyHTTP.prototype.delete = function( url, callback ) {
  this.http.open( 'DELETE', url, true );
  // Set content type request header for adding data, not needed for GET or DELETE
  //this.http.setRequestHeader( 'Content-type', 'application/json' );

  // Bind this to self for function scope to reference outer this
  let self              = this;
  this.http.onload      = function( ) {
    // Check if status is good
    if( self.http.status === 200 ) {
      // Take two args, first arg to check for any errors, second for response
      // If no error, pass null + deletion message
      callback( null, 'Post Deleted!');
    } else {
      // Else if error, return error code
      callback( `Error: ${self.http.status}` );
    }
  }

  // Send
  this.http.send( );
}