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
            { id: 0, name: 'Steak Dinner',  calories: 1200 },
            { id: 1, name: 'Cookie',        calories: 400 },
            { id: 2, name: 'Eggs',          calories: 300 },
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
            let ID      = data.items.length > 0 ? data.items[data.items.length - 1].id + 1 : 0;

            // Parse calories to number, create new item, and add to items array
            calories    = parseInt( calories );
            newItem     = new Item( ID, name, calories );
            data.items.push( newItem );
            return newItem;
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
        itemCaloriesInput:  '#item-calories'
    }

    // PUBLIC METHODS
    return {
        // Create new list items
        populateItemList: function( items ) {
            let html = '';
            // Loop through items from data structure and append generated HTML
            items.forEach( function( item ) {
                html += `<li id="item-${item.id}">
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
            // If valid input: Add item
            const newItem = itemCtrl.addItem( input.name, input.calories );
            console.log(newItem);
        } else {
            // If no valid input: Prompt input
            console.log('Oops');
        }

        e.preventDefault( );
    }

    // PUBLIC METHODS
    return {
        // Initialization
        init: function( ) {
            // Fetch items from data structure
            const items = itemCtrl.getItems( );
            // Populate UI list with items
            UICtrl.populateItemList( items );
            // Load event listeners
            loadListeners( );
        }
    }

} )( itemCtrl, UICtrl );


// =======
// I N I T
// =======

App.init();