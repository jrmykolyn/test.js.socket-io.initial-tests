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
var clientIds = [];
var gameId = null;
var playerIds = [];


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
    console.log( client.id );

    clientCount++;
    clientIds.push( client.id );

    // Ensure that first client IS the game, subsequent clients are indiv. players.
    if ( !gameId ) {
        gameId = client.id;
    } else {
        playerIds.push( client.id );
    }

    client.emit( 'joined', { clientCount: clientCount, clientId: client.id } );

    io.sockets.emit( 'client-joined', { clientCount: clientCount, playerIds, gameId } ); /// TEMP

    client.on( 'event', function( data ) {
        console.log( 'EVENT!' );
    } );

    client.on( 'disconnect', function() {
        console.log( 'DISCONNECTED!' );

        clientCount--;
    } );

    client.on( 'player-move', function( data ) {
        io.sockets.emit( 'player-moved', Object.assign( data, { gameId } ) );
    } );
} );


// --------------------------------------------------
// INIT
// --------------------------------------------------
server.listen( 3000, function() {
    console.log( 'LISTENING ON PORT 3000' );
} );
