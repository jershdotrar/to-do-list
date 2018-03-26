// Init 
const github       = new GitHub;
const ui           = new UI;

// Search input event listener
const searchUser   = qSel( '#searchUser' ).addEventListener( 'keyup', ( e ) => {
    // Get input text
    const userText = e.target.value;
    // If input is not empty:
    if( userText !== '' ) {
        // Make HTTP call
        github.getUser( userText )
            .then( data => {
                // If user is not found
                if( data.profile.message === 'Not Found' ) {
                    // Show alert
                    ui.showAlert( 'User not found', 'alert alert-danger');
                } else {
                    // Show profile
                    ui.showProfile( data.profile );
                    ui.showRepos( data.repos );
                }
            });
    } else {
        // Clear profile
        ui.clearProfile( );
    }
} );