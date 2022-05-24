// appel du module http de node
const http = require('http');

// import de l'application
const app = require('./app')

// écoute le port par défaut ou le port 3000
const PORT = process.env.PORT || 3000

// configure le port
app.set('port', PORT);

// création d'un serveur
const server = http.createServer(app);

// écoute le port
server.listen(PORT, (error) => {
	if (error) {
		console.log('Something went wrong', error);
	} else {
		console.log('Server is listening on port ' + PORT);
	}
});

// // definition de l'app a utiliser 
// const app = require('./app');

// const normalizePort = val => {
//     const port = parseInt(val, 10);

//     if(isNaN(port)){
//         return val;
//     }
//     if(port >= 0){
//         return port;
//     }
//     return false;
// };

// // definition du port d'ecoute de l'app
// const port = normalizePort(process.env.PORT || 3000);
// app.set('port', port);

// const errorHandler = error => {
//     if(error.syscall !== 'listen'){
//         throw error;
//     }
//     const address = server.address();
//     const bind = typeof address === 'string' ? 'pipe' + address : 'port:' + port;
//     switch (error.code){
//         case'EACCES':
//             console.error(bind + 'requires elevated privileges.');
//             process.exit(1);
//             break;
//         case 'EADDRINUSE':
//             console.error(bind + 'is already in use.');
//             process.exit(1);
//             break;
//         default:
//             throw error;
        
//     }
// };


// const server = http.createServer(app);

// server.on('error', errorHandler);
// server.on('listening', () => {
//     const address =server.address();
//     const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;
//     console.log('Listening on' + bind);
// });

// server.listen(port);
