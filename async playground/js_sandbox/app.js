function qSelect( q ) { return document.querySelector( q ); }

qSelect( '#button1' ).addEventListener( 'click', loadCustomer );
qSelect( '#button2' ).addEventListener( 'click', loadCustomers );

// Load Single Customer
function loadCustomer( ) {
  // Create an XHR Object
  const xhr     = new XMLHttpRequest( );
  // Get async data from file
  xhr.open( 'GET', 'customer.json', true );

  // On data load - all readyState values processed
  xhr.onload    = function( ) {
    if( this.status === 200 ) {
      // console.log( this.responseText );
      const customer = JSON.parse( this.responseText );
      const output = `<ul>
                       <li>ID: ${customer.ID}</li>
                       <li>Name: ${customer.name}</li>
                       <li>Company: ${customer.company}</li>
                       <li>Phone: ${customer.phone}</li>
                     </ul>`;

      qSelect( '#customer' ).innerHTML = output;
    }
  }

  xhr.send( );
}

// Load Customers
function loadCustomers( ) {
  // Create an XHR Object
  const xhr     = new XMLHttpRequest( );
  // Get async data from file
  xhr.open( 'GET', 'customers.json', true );

  // On data load - all readyState values processed
  xhr.onload    = function( ) {
    if( this.status === 200 ) {
      const customers = JSON.parse( this.responseText );

      // define output
      let output = '';
      customers.forEach( function( customers ) {
        // Append output for each new entry, not replace
        output += `<ul>
                       <li>ID: ${customers.ID}</li>
                       <li>Name: ${customers.name}</li>
                       <li>Company: ${customers.company}</li>
                       <li>Phone: ${customers.phone}</li>
                     </ul>`;

      });
      
      qSelect( '#customers' ).innerHTML = output;
    }
  }

  xhr.send( );
}

  // readyState Values:
  // 0 request not initialized
  // 1 server connection established
  // 2 request received
  // 3 processing request
  // 4 request finished, response ready

  // Optional - Used for spinners/loaders
  //  xhr.onprogress = function( ) { console.log( 'READYSTATE', xhr.readyState ); }

  // On data receipt error
  // xhr.onerror = function( ) { console.log( 'Request error...' ); }
