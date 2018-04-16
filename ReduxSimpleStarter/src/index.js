import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar';

const API_KEY = 'AIzaSyAG5RTwrZTOLn34n4yWusLIOYRZ2n6t1YI';

const App = () => {
  return (
    <div>
      <SearchBar />
    </div>
  );
}

ReactDOM.render( <App />, document.querySelector( '.container' ));

