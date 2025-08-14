const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const ClientError = require('../../Commons/exceptions/ClientError');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');

// Interface
const users = require('../../Interfaces/http/api/users');
const authentications = require('../../Interfaces/http/api/authentications');
const universities = require('../../Interfaces/http/api/universities');
const domicile = require('../../Interfaces/http/api/domicile');
const program = require('../../Interfaces/http/api/program/index');

// Interface (LEAD, HOL, CLP)
const lead = require('../../Interfaces/http/api/program_main/lead');
// const clp = require('../../Interfaces/http/api/program_main/clp');
const hol = require('../../Interfaces/http/api/program_main/hol');

const createServer = async (container) => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    // @ts-ignore
    { plugin: Jwt },
  ]);

  server.auth.strategy('ils_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
        scope: artifacts.decoded.payload.scope,
        role: artifacts.decoded.payload.role,
        batchId: artifacts.decoded.payload.batchId,
        offeredProgramId: artifacts.decoded.payload.offeredProgramId,
      },
    }),
  });

  // Default need auth for all routes
  server.auth.default('ils_jwt');

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: async (request, h) =>
        h.response({
          status: 'success',
          message: 'Server ILS running!',
        }),
      options: {
        auth: false,
      },
    },
    {
      method: '*',
      path: '/{any*}',
      handler: (request, h) =>
        h
          .response({
            status: 'fail',
            message: 'Resources not found!',
          })
          .code(404),
      options: {
        auth: false,
      },
    },
  ]);

  await server.register([
    {
      plugin: users,
      options: { container },
    },
    {
      plugin: authentications,
      options: { container },
    },
    {
      plugin: universities,
      options: { container },
      routes: {
        prefix: '/universities',
      },
    },
    {
      plugin: domicile,
      options: { container },
      routes: {
        prefix: '/domicile',
      },
    },
    {
      plugin: program,
      options: { container },
      routes: {
        prefix: '/program',
      },
    },
    // {
    //   plugin: clp,
    //   options: { container },
    //   routes: {
    //     prefix: '/clp',
    //   },
    // },
    {
      plugin: lead,
      options: { container },
      routes: {
        prefix: '/lead',
      },
    },
    {
      plugin: hol,
      options: { container },
      routes: {
        prefix: '/hol',
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;

    if (response instanceof Error) {
      // bila response tersebut error, tangani sesuai kebutuhan
      const translatedError = DomainErrorTranslator.translate(response);

      // penanganan client error secara internal.
      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode);
        return newResponse;
      }

      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!translatedError.isServer) {
        return h.continue;
      }

      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }

    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });

  return server;
};

module.exports = createServer;
