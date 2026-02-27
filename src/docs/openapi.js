const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Fun Founders Backend API',
    version: '1.0.0',
    description: 'Authenticated API for teams, events, config, and leaderboard.',
  },
  servers: [{ url: 'http://localhost:3000' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    '/auth/login': {
      post: {
        summary: 'Login user and get auth token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string' },
                  password: { type: 'string' },
                },
                required: ['username', 'password'],
              },
            },
          },
        },
        responses: {
          200: { description: 'Login successful' },
          401: { description: 'Invalid credentials' },
        },
      },
    },
    '/teams': { get: { security: [{ bearerAuth: [] }], summary: 'Get teams' }, post: { security: [{ bearerAuth: [] }], summary: 'Create team' } },
    '/teams/{id}/members': {
      post: { security: [{ bearerAuth: [] }], summary: 'Add team member' },
      delete: { security: [{ bearerAuth: [] }], summary: 'Remove team member' },
    },
    '/events': { get: { security: [{ bearerAuth: [] }], summary: 'Get events' }, post: { security: [{ bearerAuth: [] }], summary: 'Create event' } },
    '/config': { get: { security: [{ bearerAuth: [] }], summary: 'Get configs' }, post: { security: [{ bearerAuth: [] }], summary: 'Create config' } },
    '/leaderboard': {
      post: {
        security: [{ bearerAuth: [] }],
        summary: 'Get season leaderboard',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { season: { type: 'string' } },
                required: ['season'],
              },
            },
          },
        },
        responses: { 200: { description: 'Leaderboard response' } },
      },
    },
  },
};

module.exports = openApiSpec;
