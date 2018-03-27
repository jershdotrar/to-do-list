// Selector
const qSel = q => document.querySelector( q );

// Form blur event listeners
qSel( '#name' ).addEventListener( 'blur', validateName );
qSel( '#zip' ).addEventListener( 'blur', validateZip );
qSel( '#email' ).addEventListener( 'blur', validateEmail );
qSel( '#phone' ).addEventListener( 'blur', validatePhone );

function validateName( ) {
    const name = qSel( '#name' );
    // Name must be between 2 and 10 characters, letters only
    const re = /^[a-zA-Z]{2,10}$/;

    // If user input is not valid, add is-invalid class; else, remove
    if( !re.test( name.value ) ) {
        name.classList.add( 'is-invalid' );
    } else {
        name.classList.remove( 'is-invalid' );
    }
}

function validateZip( ) {
    const zip = qSel( '#zip' );
    // Zip must be 5 digits, with optional 4 digit extension
    const re = /^[0-9]{5}(-[0-9]{4})?$/;

    // If user input is not valid, add is-invalid class; else, remove
    if( !re.test( zip.value ) ) {
        zip.classList.add( 'is-invalid' );
    } else {
        zip.classList.remove( 'is-invalid' );
    }
}

function validateEmail( ) {
    const email = qSel( '#email' );
    // Email must be valid
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,10})$/;

    // If user input is not valid, add is-invalid class; else, remove
    if( !re.test( email.value ) ) {
        email.classList.add( 'is-invalid' );
    } else {
        email.classList.remove( 'is-invalid' );
    }
}

function validatePhone( ) {
    const phone = qSel( '#phone' );
    // Phone must be 10 digits. Optional: (area code), -, ., and ' '
    const re = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;

    // If user input is not valid, add is-invalid class; else, remove
    if( !re.test( phone.value ) ) {
        phone.classList.add( 'is-invalid' );
    } else {
        phone.classList.remove( 'is-invalid' );
    }
}