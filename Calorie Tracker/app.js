const qSelect       = q => document.querySelector( q );
const qSelectAll    = q => document.querySelectorAll( q );

// ===================================
// S T O R A G E   C O N T R O L L E R
// ===================================

const StorageCtrl = ( function( ) {
    // PUBLIC METHODS
    return {
        // Store new item in LS
        storeItem: function( item ) {
            let items;
            
            // If no items exist, push new item to array and set LS
            if( localStorage.getItem( 'items' ) === null ) {
                items = [];
                items.push( item );
                localStorage.setItem( 'items', JSON.stringify( items ) );
            } else {
                // If items exist, parse existing items then push & set LS
                items = JSON.parse( localStorage.getItem( 'items') );
                items.push( item );
                localStorage.setItem( 'items', JSON.stringify( items ) );
            }
        },
        // Retrieve stored items from LS
        getStoredItems: function( ) {
            let items;
            // If no items exist, create empty items array
            if( localStorage.getItem( 'items' ) === null ) {
                items = [];
            } else {
                // If items exist, parse existing items
                items = JSON.parse( localStorage.getItem( 'items' ) );
            }

            // Return items
            return items;
        },
        // Delete item in LS
        deleteStoredItem: function( id ) {
            let items = JSON.parse( localStorage.getItem( 'items' ) );

            // Loop through parsed items and update existing item
            items.forEach( (item, index) => {
                if( id === item.id ) {
                    items.splice( index, 1 );
                } } );

            // Reset LS
            localStorage.setItem( 'items', JSON.stringify( items ) );
        },
        // Clear all items from LS
        clearAllStoredItems: function( ) {
            localStorage.removeItem( 'items' );
        },
        // Update item in LS
        updateItemStorage( updatedItem ) {
            // Parse items to JSON
            let items = JSON.parse( localStorage.getItem( 'items' ) );

            // Loop through parsed items and update existing item
            items.forEach( (item, index) => {
                if( updatedItem.id === item.id ) {
                    items.splice( index, 1, updatedItem );
                } } );

            // Reset LS
            localStorage.setItem( 'items', JSON.stringify( items ) );
        }
    }
} )( );


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
        items: StorageCtrl.getStoredItems( ),
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
            data.items.forEach( item => {
                if( item.id === id ) {
                    found = item;
            } } );

            // Return ID
            return found;
        },
        // Update item in data structure
        updateItem: function( name, calories ) {
            // Assign item to found, update, and return it
            let found = null;
            // Parse calories input to number
            calories = parseInt( calories );

            // Locate item in data by matching ID
            data.items.forEach( item => {
                if( item.id === data.currentItem.id ) {
                    item.name       = name;
                    item.calories   = calories;
                    found           = item;
            } } );

            // Return ID
            return found;
        },
        // Delete item in data structure
        deleteItem: function( id ) {
            // Map data item IDs
            ids = data.items.map( item => { return item.id } );

            // Find target ID within the map and splice from data
            const index = ids.indexOf( id );
            data.items.splice( index, 1 );
        },
        clearAllItems: function( ) {
            data.items = [];
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
        listItems:          '#item-list li',
        itemNameInput:      '#item-name',
        itemCaloriesInput:  '#item-calories',
        totalCalories:      '.total-calories',
        addBtn:             '.add-btn',
        updateBtn:          '.update-btn',
        deleteBtn:          '.delete-btn',
        backBtn:            '.back-btn',
        clearBtn:           '.clear-btn'
    }

    // PUBLIC METHODS
    return {
        // Create new list items
        populateItemList: function( items ) {
            let html = '';
            // Loop through items from data structure and append generated HTML
            items.forEach( ( item ) => {
                html += `<li id="item-${item.id}">
                            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                            </a>
                        </li>`;
            } );

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
        // Update item in UI
        updateListItem: function( item ) {
            // Grab all list items as Node list, then convert to array
            let listItems = qSelectAll( UISelectors.listItems );
            listItems = Array.from( listItems );

            // Loop through array by ID and update listItem HTML
            listItems.forEach( listItem => {
                const itemID = listItem.getAttribute( 'id' );
                if( itemID === `item-${item.id}`) {
                    qSelect( `#${itemID}`).innerHTML = `
                        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                        </a>`;
                } } );
        },
        // Delete item from UI
        deleteListItem: function( id ) {
            // Select item by ID and remove it
            const item = qSelect( `#item-${id}` );
            item.remove( );
        },
        clearAllListItems: function( ) {
            // Grab all list items as Node list, then convert to array
            let listItems = qSelectAll( UISelectors.listItems );
            listItems = Array.from( listItems );
            // Loop through array and remove each item
            listItems.forEach( item => item.remove( ) );

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

const App = ( function ( itemCtrl, UICtrl, StorageCtrl ) {
    // LOAD EVENT LISTENERS
    const loadListeners = function( ) {
        // Get UI selectors
        const UISelectors = UICtrl.getSelectors( );
        // Add new item event
        qSelect( UISelectors.addBtn ).addEventListener( 'click', itemAddSubmit );
        // Disable submit on enter keypress
        document.addEventListener( 'keypress', function( e ) {
            if( e.keyCode === 13 || e.which === 13 ) {
                e.preventDefault( );
                return false;
            }
        });
        // Edit icon click event
        qSelect( UISelectors.itemList ).addEventListener( 'click', itemEditClick );
        // Update item event
        qSelect( UISelectors.updateBtn ).addEventListener( 'click', itemUpdateSubmit );
        // Delete item event
        qSelect( UISelectors.deleteBtn ).addEventListener( 'click', itemDeleteSubmit );
        // Back button event
        qSelect( UISelectors.backBtn ).addEventListener( 'click', UICtrl.clearEditState );
        // Clear items event
        qSelect( UISelectors.clearBtn ).addEventListener( 'click', clearAllItemsClick );
    }

    // ADD ITEM SUBMIT
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

            // Store in localStorage
            StorageCtrl.storeItem( newItem );

            // Clear input fields
            UICtrl.clearInput( );
        }

        // Prevent default behavior
        e.preventDefault( );
    }

    // EDIT ITEM SUBMIT
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

    // UPDATE ITEM SUBMIT
    const itemUpdateSubmit = function( e ) {
        // Get item input & update item in data structure
        const input        = UICtrl.getItemInput( );
        const updatedItem  = itemCtrl.updateItem( input.name, input.calories );

        // Update UI
        UICtrl.updateListItem( updatedItem );
        // Get total calories and add to UI
        const totalCalories = itemCtrl.getTotalCalories( );
        UICtrl.showTotalCalories( totalCalories );

        // Update local storage
        StorageCtrl.updateItemStorage( updatedItem );

        // Clear edit state
        UICtrl.clearEditState( );

        e.preventDefault( );
    }

    // DELETE ITEM SUBMIT
    const itemDeleteSubmit = function( e ) {
        // Get current item
        const currentItem = itemCtrl.getCurrentItem( );

        // Delete from data structure, UI, & LS
        itemCtrl.deleteItem( currentItem.id );
        UICtrl.deleteListItem( currentItem.id );
        StorageCtrl.deleteStoredItem( currentItem.id);

        // Get total calories and add to UI
        const totalCalories = itemCtrl.getTotalCalories( );
        UICtrl.showTotalCalories( totalCalories );

        // Clear edit state
        UICtrl.clearEditState( );

        e.preventDefault( );
    }

    // CLEAR ALL ITEMS SUBMIT
    const clearAllItemsClick = function( e ) {
        // Delete all items from data structure, LS, & UI, and hide list line
        itemCtrl.clearAllItems( );
        StorageCtrl.clearAllStoredItems( );
        UICtrl.clearAllListItems( );
        UICtrl.hideList( );

        // Get total calories and add to UI
        const totalCalories = itemCtrl.getTotalCalories( );
        UICtrl.showTotalCalories( totalCalories );

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

} )( itemCtrl, UICtrl, StorageCtrl );


// =======
// I N I T
// =======

App.init();