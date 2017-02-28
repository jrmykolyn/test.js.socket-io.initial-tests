// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
var fs = require( 'fs' );
var http = require( 'http' );
var socketIo = require( 'socket.io' );


// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var server = http.createServer( handleRequest );
var io = socketIo( server );
var clientCount = 0;


// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function handleRequest( req, res ) {
    // If request *DOES NOT* include 'socket.io':
    if ( req.url.indexOf( 'socket.io' ) === -1 ) {

        // Validate `req.url`.
        var resource = ( req.url !== '/' ) ? req.url : '/index.html'

        // Return resource from `public/` dir.
        res.end( fs.readFileSync( `${__dirname}/public${resource}` ) );
    }
}


// --------------------------------------------------
// EVENTS
// --------------------------------------------------
io.on( 'connection', function( client ) {
    console.log( 'CONNECTED!' ); /// TEMP

    clientCount++;

    io.sockets.emit( 'client-joined', 'Total clients: ' + count ); /// TEMP

    client.on( 'event', function( data ) {
        console.log( 'EVENT!' );
    } );

    client.on( 'disconnect', function() {
        console.log( 'DISCONNECTED!' );

        clientCount--;
    } );
} );


// --------------------------------------------------
// INIT
// --------------------------------------------------
server.listen( 3000, function() {
    console.log( 'LISTENING ON PORT 3000' );
} );