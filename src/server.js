const Hapi = require('@hapi/hapi');
const routers = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
        headers: ['Accept', 'Content-Type', 'Authorization'],
        additionalHeaders: ['cache-control', 'x-requested-with'],
        credentials: true,
      },
    },
  });

  server.route(routers);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
