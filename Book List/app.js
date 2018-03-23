// qSelect
function qSelect( q ) { return document.querySelector( q ); }
function qCreate( q ) { return document.createElement( q ); }

// Book Class
class Book {
    constructor( title, author, isbn ) {
        this.title      = title;
        this.author     = author;
        this.isbn       = isbn;
    }
}

// UI Class
class UI {
    addBookToList( book ) {
        const list      = qSelect( '#book-list' );
        // Create tr element
        const row       = qCreate( 'tr' );
        // Insert cols
        row.innerHTML   = `
                          <td>${book.title}</td>
                          <td>${book.author}</td>
                          <td>${book.isbn}</td>
                          <td><a href="#" class="delete">X</a></td>
                          `;
        // Appends row to book list
        list.appendChild( row );
    }

    deleteBook( target ) {
        if( target.className === 'delete' ) {
            target.parentElement.parentElement.remove( );
            this.showAlert( 'Book Removed!', 'success' );
        }
    }

    clearFields( ) {
        qSelect( '#title' ).value   = '';
        qSelect( '#author' ).value  = '';
        qSelect( '#isbn' ).value    = '';
    }

    showAlert( msg, className ) {
        // Create div, and get parent & form
        const div       = qCreate( 'div' );
        const container = qSelect( '.container' );
        const form      = qSelect( '#book-form' );

        // Add class & text
        div.className   = `alert ${className}`;
        div.appendChild( document.createTextNode( msg ) );

        // Insert alert with 3 second timeout
        container.insertBefore( div, form );
        setTimeout( function( ) { qSelect( '.alert' ).remove( ); }, 3000 );
    }
}

// Local Storage Class
class Store {
    // Searches LS for existing books
    static getBooks( ) {
        let books;

        // If no books are found, then creates an empty array
        if( localStorage.getItem( 'books' ) === null ) {
            books   = [];
        // Else books set to the existing array
        } else {
            books   = JSON.parse( localStorage.getItem( 'books' ) );
        }

        // Returns parsed LS array
        return books;
    }

    // Displays books from LS in the UI
    static displayBooks( ) {
        // Returns LS getBooks search results
        const books = Store.getBooks( );

        // For every book in LS, add it to UI
        books.forEach( function( book ) {
            const ui = new UI;
            ui.addBookToList( book );
        } );
    }

    static addBook( book ) {
        // Returns LS getBooks search results
        const books = Store.getBooks( );

        // Appends book to scope's array & updates LS array 
        books.push( book );
        localStorage.setItem( 'books', JSON.stringify( books ) );
    }

    // Removes books from LS using its ISBN
    static removeBook( isbn ) {
        // Returns LS getBooks search results
        const books = Store.getBooks( );

        // For every book in LS, splice from getBooks array if its isbn matches
        books.forEach( function( book, index ) {
            if( book.isbn === isbn ) {
                books.splice( index, 1 );
            }
        } );

        // Updates LS array
        localStorage.setItem( 'books', JSON.stringify( books ) );
    }
}

// DOM Load Event
document.addEventListener( 'DOMContentLoaded', Store.displayBooks);

// Add Book Event Listener
qSelect( '#book-form' ).addEventListener( 'submit', function( e ) {
    // Get form values
    const title     = qSelect( '#title' ).value,
          author    = qSelect( '#author' ).value,
          isbn      = qSelect( '#isbn' ).value
    // Instantiate Book & UI
    const book      = new Book( title, author, isbn );
    const ui        = new UI( );

    // Validate user's input, then add new Book to list
    if( title === '' || author === '' || isbn === '' ) {
        // Error alert
        ui.showAlert( 'Please fill out all fields', 'error' );
    } else {
        // Add book to list & local storage
        ui.addBookToList( book );
        Store.addBook( book );
        // Success alert
        ui.showAlert( 'Book Added!', 'success' );
        // Clear fields
        ui.clearFields( );
    }

    // Prevent default behavior
    e.preventDefault( );
} );

// Delete Book Event Listener
qSelect( '#book-list' ).addEventListener( 'click', function( e ) {
    // Instantiate UI
    const ui = new UI( );
    // Delete Book from UI & remove from LS
    ui.deleteBook( e.target );
    Store.removeBook( e.target.parentElement.previousElementSibling.textContent);

    // Prevent default behavior
    e.preventDefault( );
} );
