const qSelect = q => document.querySelector( q );

// ===================================
// S T O R A G E   C O N T R O L L E R
// ===================================



// =============================
// I T E M   C O N T R O L L E R
// =============================

const itemCtrl = ( function ( ) {
    // ITEM CONTROLLER
    const Item = function( id, name, calories ) {
        this.id         = id;
        this.name       = name;
        this.calories   = calories;
    }

    // DATA STRUCTURE
    const data = {
        items: [
            // { id: 0, name: 'Steak Dinner',  calories: 1200 },
            // { id: 1, name: 'Cookie',        calories: 400 },
            // { id: 2, name: 'Eggs',          calories: 300 },
        ],
        currentItem:       null,
        totalCalories:     0
    }

    // PUBLIC METHODS
    return {
        // Get items list from data structure
        getItems: function( ) {
            return data.items;
        },
        // Add new item to items list in data structure
        addItem: function( name, calories ) {
            // Figure out the item's ID
            // If data items exist: Append ID to end
            // If data items don't: Append ID to beginning
            let ID  = data.items.length;
            ID > 0  ? data.items[data.items.length - 1].id + 1 
                    : 0;

            // Parse calories to number, create new item, push to items array, and return
            calories = parseInt( calories );
            newItem  = new Item( ID, name, calories );
            data.items.push( newItem );
            return newItem;
        },
        // Fetch item by ID
        getItemByID: function( id ) {
            let found = null;
            // Loop through items
            data.items.forEach( item => { if( item.id === id ) { found = item } } );
            // Return ID
            return found;
        },
        // Set current item in data structure
        setCurrentItem: function( item ) {
            data.currentItem = item;
        },
        // Get current item in data structure
        getCurrentItem: function( ) {
            return data.currentItem;
        },
        // Get total calorie count
        getTotalCalories: function( ) {
            let total = 0;
            // Loop through items and add calories
            data.items.forEach( items => total += items.calories );

            // Set total calories in data structure
            data.totalCalories = total;
            return data.totalCalories;
        },
        // Log data structure
        logData: function( ) {
            return data;
        }
    }
} )( );



// =========================
// U I   C O N T R O L L E R
// =========================

const UICtrl = ( function ( ) {
    // UI SELECTORS
    const UISelectors = {
        itemList:           '#item-list',
        itemNameInput:      '#item-name',
        itemCaloriesInput:  '#item-calories',
        totalCalories:      '.total-calories',
        addBtn:             '.add-btn',
        updateBtn:          '.update-btn',
        deleteBtn:          '.delete-btn',
        backBtn:            '.back-btn'
    }

    // PUBLIC METHODS
    return {
        // Create new list items
        populateItemList: function( items ) {
            let html = '';
            // Loop through items from data structure and append generated HTML
            items.forEach( ( item ) => { html +=
                 `<li id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>`; } );
            // Insert list items into DOM
            qSelect( UISelectors.itemList ).innerHTML = html;
        },
        // Fetches user input in name and calories forms
        getItemInput: function( ) {
            return {
                name:       qSelect( UISelectors.itemNameInput ).value,
                calories:   qSelect( UISelectors.itemCaloriesInput ).value
            }
        },
        // Adds new item to UI
        addListItem: function( item ) {
            // Show item list
            qSelect( UISelectors.itemList ).style.display = 'block';
            // Create li element with class and ID
            const li     = document.createElement( 'li' );
            li.className = 'collection-item';
            li.id        = `item-${item.id}`;

            // Add HTML
            li.innerHTML = `
                            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                            </a>
                            `;
            // Insert item to list
            qSelect( UISelectors.itemList ).insertAdjacentElement( 'beforeend', li );
        },
        // Clear input fields
        clearInput: function( ) {
            qSelect( UISelectors.itemNameInput ).value      = '';
            qSelect( UISelectors.itemCaloriesInput ).value  = '';
        },
        // Add current item to edit form
        addItemToForm: function( ) {
            qSelect( UISelectors.itemNameInput ).value      = itemCtrl.getCurrentItem( ).name;
            qSelect( UISelectors.itemCaloriesInput ).value  = itemCtrl.getCurrentItem( ).calories;
            UICtrl.showEditState( );
        },
        // Hides empty list
        hideList: function( ) {
            qSelect( UISelectors.itemList ).style.display   = 'none';
        },
        // Show total calories
        showTotalCalories: function( totalCalories ) {
            qSelect(UISelectors.totalCalories ).textContent = totalCalories;
        },
        //  Clear edit state of buttons
        clearEditState: function( ) {
            UICtrl.clearInput( );
            qSelect( UISelectors.updateBtn ).style.display  = 'none';
            qSelect( UISelectors.deleteBtn ).style.display  = 'none';
            qSelect( UISelectors.backBtn ).style.display    = 'none';
            qSelect( UISelectors.addBtn ).style.display     = 'inline';
        },
        //  Clear edit state of buttons
        showEditState: function( ) {
            qSelect( UISelectors.updateBtn ).style.display  = 'inline';
            qSelect( UISelectors.deleteBtn ).style.display  = 'inline';
            qSelect( UISelectors.backBtn ).style.display    = 'inline';
            qSelect( UISelectors.addBtn ).style.display     = 'none';
        },
        // Fetches UI selectors
        getSelectors: function( ){
            return UISelectors;
        }
    }
} )( );



// ===========================
// A P P   C O N T R O L L E R
// ===========================

const App = ( function ( itemCtrl, UICtrl) {
    // LOAD EVENT LISTENERS
    const loadListeners = function( ) {
        // Get UI selectors
        const UISelectors = UICtrl.getSelectors( );
        // Add new item event
        qSelect( UISelectors.addBtn ).addEventListener( 'click', itemAddSubmit );
        // Edit icon click event
        qSelect( UISelectors.itemList ).addEventListener( 'click', itemEditClick );
    }

    // ADD ITEM BUTTON SUBMIT
    const itemAddSubmit = function( e ) {
        // Get form input from UI controller
        const input = UICtrl.getItemInput( );

        // Check for valid name and calorie input
        if( input.name !== '' && input.calories !== '' ) {
            // If valid input: Add item to data structure and UI
            const newItem = itemCtrl.addItem( input.name, input.calories );
            UICtrl.addListItem( newItem );

            // Get total calories and add to UI
            const totalCalories = itemCtrl.getTotalCalories( );
            UICtrl.showTotalCalories( totalCalories );

            // Clear input fields
            UICtrl.clearInput( );
        } else {
            // If no valid input: Prompt input
        }

        // Prevent default behavior
        e.preventDefault( );
    }

    // EDIT ITEM BUTTON
    const itemEditClick = function( e ) {
        // Delegate event
        if( e.target.classList.contains( 'edit-item' ) ) {
            // Get list item ID (item-0, item-1, etc)
            const listID     = e.target.parentNode.parentNode.id;
            // Split into array and get actual ID
            const listIDArr  = listID.split( '-' );
            const id         = parseInt( listIDArr[1] );

            // Get & set current item
            const itemToEdit = itemCtrl.getItemByID( id );
            itemCtrl.setCurrentItem( itemToEdit );
            // Add item to form
            UICtrl.addItemToForm( );
        }

        // Prevent default behavior
        e.preventDefault( );
    }

    // PUBLIC METHODS
    return {
        // Initialization
        init: function( ) {
            // Set initial state
            UICtrl.clearEditState( );

            // Fetch items from data structure
            const items = itemCtrl.getItems( );

            // Check if item list is empty
            // TRUE: Hide empty list
            // FALSE: Populate UI with items from data structure
            items.length === 0  ? UICtrl.hideList( ) 
                                : UICtrl.populateItemList( items );

            // Get total calories
            const totalCalories = itemCtrl.getTotalCalories( );
            // Add item to UI
            UICtrl.showTotalCalories( totalCalories );

            // Load event listeners
            loadListeners( );
        }
    }

} )( itemCtrl, UICtrl );


// =======
// I N I T
// =======

App.init();