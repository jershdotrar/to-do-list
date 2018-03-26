function easyHTTP( ) {
  this.http             = new XMLHttpRequest( );
}

// Make an HTTP GET Request
easyHTTP.prototype.get  = function( url, callback ) {
  this.http.open( 'GET', url, true );

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

  this.http.send( );
}

// Make an HTTP POST Request
easyHTTP.prototype.post = function( url, data, callback ) {
  this.http.open( 'POST', url, true );
  this.http.setRequestHeader( 'Content-type', 'application/json' );

  let self              = this;
  this.http.onload      = function( ) {
      callback( null, self.http.responseText );
  }

  this.http.send( JSON.stringify( data ) );
}

// Make an HTTP PUT Request
easyHTTP.prototype.put = function( url, data, callback ) {
  this.http.open( 'PUT', url, true );
  this.http.setRequestHeader( 'Content-type', 'application/json' );

  let self              = this;
  this.http.onload      = function( ) {
      callback( null, self.http.responseText );
  }

  this.http.send( JSON.stringify( data ) );
}

// Make an HTTP DELETE Request
easyHTTP.prototype.delete = function( url, callback ) {
  this.http.open( 'DELETE', url, true );

  let self              = this;
  this.http.onload      = function( ) {
    if( self.http.status === 200 ) {
      callback( null, 'Post Deleted!');
    } else {
      callback( `Error: ${self.http.status}` );
    }
  }

  this.http.send( );
}