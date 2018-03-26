const qSel = q => document.querySelector( q );

qSel( '#button1' ).addEventListener( 'click', getText );
qSel( '#button2' ).addEventListener( 'click', getJson );
qSel( '#button3' ).addEventListener( 'click', getExternal );

// Get local text file data
function getText( ) {
  // Fetch data
  fetch( 'test.txt' )
  // Then using a promise, return data's .text promise
  .then( res => res.text( ) )
  // Then using data's promise, log data & paint in DOM
  .then( data => {
    console.log( data );
    qSel( '#output' ).innerHTML = data;
  } )
  // Catch if an error occurs
  .catch( err => console.log( err ) );
}

// Get local json data
function getJson( ) {
  // Fetch data
  fetch( 'posts.json' )
  // Then using a promise, return data's .json promise
  .then( res => res.json( ) )
  // Then print & loop through json data
  .then( data => {
    console.log( data );

    // Loop through data to paint to DOM
    let output = '';
    data.forEach( posts => {
      // What to paint
      output += `<li>${posts.title}</li>`;
    } );
    // Paint to DOM
    qSel( '#output' ).innerHTML = output;
  } )
  // Catch if an error occurs
  .catch( err => console.log( err ) );
}

// Get external API
function getExternal( ) {
  // Fetch data
  fetch( 'https://api.github.com/users' )
  // Then using a promise, return data's .json promise
  .then( res => res.json( ) )
  // Then print & loop through json data
  .then( data => {
    console.log( data );

    // Loop through data to paint to DOM
    let output = '';
    data.forEach( user => {
      // What to paint
      output += `<li>${user.login}</li>`;
    } );
    // Paint to DOM
    qSel( '#output' ).innerHTML = output;
  } )
  // Catch if an error occurs
  .catch( err => console.log( err ) );
}