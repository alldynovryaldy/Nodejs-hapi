const Hapi = require('@hapi/hapi');

// import routes
const routes = require('./routes');

const init = async () => {
  // konfigurasi server
  const server = Hapi.server({
    port: 5000,
    // host: 'localhost',
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  // start server
  await server.start();

  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
