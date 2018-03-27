let re;
// Literal characters
re = /hello/;           // RegEx
re = /hello/i;          // Case insensitive
re = /hello/g;          // Global search (all instances)

// Metacharacter symbols
re = /^h/i;             // Starts with: /^( str )/
re = /world$/i;         // Ends with: /( str )$/
re = /^hello$/i;        // Starts & Ends with: /^( str )$/
re = /h.llo/i;          // Matches any ONE character: /./
re = /h*llo/;           // Matches any character 0 or more times
re = /gre?a?y/i;        // Optional character: /( char )?/
re = /gre?a?y\?/i;      // Escape character: /( str )\?/

// [ ] - Character Sets
re = /gr[ae]y/i;        // Must be an a or e
re = /[GF]ray/;         // Must be a G or F
re = /[^GF]ray/i;       // Match anything except G or F
re = /[A-Z]ray/;        // Match any uppercase letter
re = /[a-z]ray/;        // Match any lowercase letter
re = /[A-Za-z]ray/;     // Match any letter
re = /[0-9]ray/;        // Match any digit
re = /[1-5][6-9]/;      // Match: 28

// { } - Quantifiers
re = /Hel{2}o/i;        // Must occur 2 amount of times
re = /Hel{2,4}o/i;      // Must occuer 2-4 times
re = /Hel{2,}o/i;       // Must occur at least 2 times

// ( ) - Grouping
re = /([0-9]x){3}/;     // Matches ( int )( char ), 3 times: 3x3x3x, 5x5x5x
re = /^([0-9]x){3}/;    // Matches starting with ( int )( char ), 3 times

// Shorthand character classes
re = /\w/;              // Single word character - alphanumeric or _
re = /\w+/;             // One or more word characters
re = /\W/;              // Non-word characters
re = /\d/;              // Digit character
re = /\d+/;             // One or more digit characters
re = /\D/;              // Non-digits
re = /\s/;              // Whitespace
re = /\S/;              // Non-whitespace
re = /Hell\b/i;         // Word boundary

// Assertions
re = /x(?=y)/i;         // Match x only if followed by y
re = /x(?!y)/i;         // Match x only if NOT followed by y


// String to match
const str = 'Hello, Ox! welcome to hell!';
// Log results
const result = re.exec( str );
console.log( result );

function reTest( re, str ) {
    if( re.test (str ) ) {
        console.log( `${str} matched ${re.source}` );
    } else {
        console.log( `${str} does NOT match ${re.source}` );
    }
}

reTest( re, str );

// exec( ) - Return results in array, otherwise null
// const result = re.exec( 'why, hello world' );
// console.log( result );
// console.log( result[ 0 ] );
// console.log( result.index );
// console.log( result.input );

// test( ) - Returns boolean
// const result = re.test( 'Hello' );
// console.log( result );

// match( ) - Returns result array or null
// const str = 'oh hello hey hello there hello yes hello goodbye hello';
// const result = str.match(re);
// console.log(result);

// search( ) - Returns index of first match, otherwise -1
// const str = 'ello There';
// const result = str.search(re);
// console.log(result);

// replace( ) - Returns new string with some or all matches of a pattern
// const str = 'Hello, hello, hello There! Yes, my, hello!';
// const newStr = str.replace( re, 'Hi');
// console.log(newStr);