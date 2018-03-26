class EasyHTTP {
    // Make HTTP GET Request
    async get( url ) {
        // Fetch data
        const response   = await fetch( url );
        // Parse to json
        const resData    = await response.json( );
        return resData;
    }

    // Make HTTP POST Request
    async post( url, data ) {
        // Fetch data
        const response   = await fetch( url, {
            // Set headers, stringify sent data
            method:  'POST', 
            headers: { 'Content-type': 'application/json' },
            body:    JSON.stringify( data )
        } )
        // Parse to json
        const resData    = await response.json( );
        return resData;
    }

    // Make HTTP PUT Request
    async put( url, data ) {
        // Fetch data
        const response   = await fetch( url, {
            // Set headers, stringify sent data
            method:  'PUT', 
            headers: { 'Content-type': 'application/json' },
            body:    JSON.stringify( data )
        } )
        // Parse to json
        const resData    = await response.json( );
        return resData;
    }

    // Make HTTP DELETE Request
    async delete( url ) {
        // Fetch data
        const response   = await fetch( url, {
            // Set headers
            method:        'DELETE', 
            headers:       { 'Content-type': 'application/json' }
        } )
        return 'Resource Deleted';
    }
}