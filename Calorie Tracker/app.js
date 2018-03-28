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
            calories    = parseInt( calories );
            newItem     = new Item( ID, name, calories );
            data.items.push( newItem );
            return newItem;
        },
        // Get total calorie count
        getTotalCalories: function( ) {
            let total = 0;
            // Loop through items and add calories
            data.items.forEach( function( items ) {
                total += items.calories;
            } );

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
        addBtn:             '.add-btn',
        itemNameInput:      '#item-name',
        itemCaloriesInput:  '#item-calories',
        totalCalories:      '.total-calories'
    }

    // PUBLIC METHODS
    return {
        // Create new list items
        populateItemList: function( items ) {
            let html    = '';
            // Loop through items from data structure and append generated HTML
            items.forEach( function( item ) {
                html    += `<li id="item-${item.id}">
                            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                            </a>
                        </li>
                        `;
            });
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
            qSelect( UISelectors.itemList ).style.display   = 'block';
            // Create li element with class and ID
            const li = document.createElement( 'li' );
            li.className = 'collection-item';
            li.id = `item-${item.id}`;

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
        // Hides empty list
        hideList: function( ) {
            qSelect( UISelectors.itemList ).style.display   = 'none';
        },
        showTotalCalories: function( totalCalories ) {
            qSelect(UISelectors.totalCalories ).textContent = totalCalories;
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
      }

    // "ADD ITEM" BUTTON SUBMIT
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

        e.preventDefault( );
    }

    // PUBLIC METHODS
    return {
        // Initialization
        init: function( ) {
            // Fetch items from data structure
            const items = itemCtrl.getItems( );

            // Check if item list is empty
            // TRUE: Hide empty list
            // FALSE: Populate UI with items from data structure
            items.length === 0  ? UICtrl.hideList( ) 
                                : UICtrl.populateItemList( items );

            // Get total calories and add to UI
            const totalCalories = itemCtrl.getTotalCalories( );
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