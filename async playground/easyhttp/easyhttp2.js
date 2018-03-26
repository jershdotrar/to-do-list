class EasyHTTP {
    // Make HTTP Get Request
    get( url ) {
       return new Promise( (resolve, reject ) => {
           // Fetch from input URL
           fetch( url )
               // Fetch JSON data
               .then( res  => res.json( ) )
               // Upon resolve, return data
               .then( data => resolve( data ) )
               // Upon reject, return error
               .catch( err => reject( err ) );
       } ); 
    }

    // Make HTTP POST Request
    post( url, data ) {
       return new Promise( (resolve, reject ) => {
           // Fetch from input URL
           fetch( url, {
               // Set headers, stringify sent data
               method:        'POST', 
               headers:       { 'Content-type': 'application/json' },
               body:          JSON.stringify( data )
           } )
               // Fetch JSON data
               .then( res  => res.json( ) )
               // Upon resolve, return data
               .then( data => resolve( data ) )
               // Upon reject, return error
               .catch( err => reject( err ) );
       } ); 
    }

    // Make HTTP PUT Request
    put( url, data ) {
       return new Promise( (resolve, reject ) => {
           // Fetch from input URL
           fetch( url, {
               // Set headers, stringify sent data
               method:        'PUT', 
               headers:       { 'Content-type': 'application/json' },
               body:          JSON.stringify( data )
           } )
               // Fetch JSON data
               .then( res  => res.json( ) )
               // Upon resolve, return data
               .then( data => resolve( data ) )
               // Upon reject, return error
               .catch( err => reject( err ) );
       } ); 
    }

    // Make HTTP DELETE Request
    delete( url ) {
       return new Promise( (resolve, reject ) => {
           // Fetch from input URL
           fetch( url, {
               // Set headers
               method:        'DELETE', 
               headers:       { 'Content-type': 'application/json' }
           } )
               // Fetch JSON data
               .then( res  => res.json( ) )
               // Upon resolve, return data
               .then( data => resolve( 'Resource Deleted' ) )
               // Upon reject, return error
               .catch( err => reject( err ) );
       } ); 
    }
}