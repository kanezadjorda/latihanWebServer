const Hapi = require('@hapi/hapi');
const routers = require('./routes');

const init = async () => {
  const server = Hapi.server({
    // eslint-disable-next-line no-undef
    port: process.env.PORT || 5000,
    host: '0.0.0.0',
  });

  server.ext('onPreResponse', (request, h) => {
    const response = request.response;

    if (response.isBoom) {
      response.output.headers['access-control-allow-origin'] = '*';
      response.output.headers['access-control-allow-credentials'] = 'true';
      response.output.headers['access-control-allow-methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
      response.output.headers['access-control-allow-headers'] = 'Content-Type, Authorization';
    } else {
      response.header('access-control-allow-origin', '*');
      response.header('access-control-allow-credentials', 'true');
      response.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.header('access-control-allow-headers', 'Content-Type, Authorization');
    }

    return h.continue;
  });

  server.route(routers);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

// eslint-disable-next-line no-undef
process.on('unhandledRejection', (err) => {
  console.log(err);
  // eslint-disable-next-line no-undef
  process.exit(1);
});

init();
