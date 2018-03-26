const http = new EasyHTTP;
// User Data
const data = {
  name: 'John Doe',
  username: 'johndoe',
  email: 'jdoe@gmail.com'
}

// Get Users
http.get('https://jsonplaceholder.typicode.com/users')
  .then( data => console.log( data ) )
  .catch( err => console.log( err ));

// Create User
// http.post( 'https://jsonplaceholder.typicode.com/users', data )
//  .then( data => console.log( data ) )
//  .catch( err => console.log( err ) );

// Update User
// http.put( 'https://jsonplaceholder.typicode.com/users/2', data )
//   .then( data => console.log( data ) )
//   .catch( err => console.log( err ) );

// Delete User
// http.delete( 'https://jsonplaceholder.typicode.com/users/2' )
//   .then( data => console.log( data ) )
//   .catch( err => console.log( err ) );