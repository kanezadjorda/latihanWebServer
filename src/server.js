const Hapi = require('@hapi/hapi');
const routers = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
        headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
        additionalHeaders: ['cache-control', 'x-requested-with'],
        credentials: true,
      },
    },
  });

  server.route(routers);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
