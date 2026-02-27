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
    schemas: {
      ApiResponse: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          data: { nullable: true },
        },
        required: ['message', 'data'],
      },
      LoginRequest: {
        type: 'object',
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
        },
        required: ['username', 'password'],
      },
      TeamPayload: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          captain: { type: 'string' },
          season: { type: 'string' },
          logo: { type: 'string' },
          members: { type: 'array', items: { type: 'string' } },
        },
        required: ['name', 'captain', 'season'],
      },
      MemberPayload: {
        type: 'object',
        properties: {
          member: { type: 'string' },
        },
        required: ['member'],
      },
      EventPayload: {
        type: 'object',
        properties: {
          season: { type: 'string' },
          winner: { type: 'integer' },
          name: { type: 'string' },
          logo: { type: 'string' },
          scores: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                team_id: { type: 'integer' },
                score: { type: 'integer' },
              },
              required: ['team_id', 'score'],
            },
          },
        },
        required: ['season', 'winner', 'name'],
      },
      ConfigPayload: {
        type: 'object',
        properties: {
          current_season: { type: 'string' },
          seasons: { type: 'array', items: { type: 'string' } },
        },
      },
      LeaderboardPayload: {
        type: 'object',
        properties: {
          season: { type: 'string' },
        },
        required: ['season'],
      },
    },
  },
  paths: {
    '/health': {
      get: {
        summary: 'Health check',
        responses: {
          200: {
            description: 'Service healthy',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } },
          },
        },
      },
    },
    '/auth/login': {
      post: {
        summary: 'Login user and get auth token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } },
          },
          400: { description: 'Invalid payload' },
          401: { description: 'Invalid credentials' },
        },
      },
    },
    '/teams': {
      get: {
        security: [{ bearerAuth: [] }],
        summary: 'Get teams',
        responses: {
          200: { description: 'Teams list', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
          401: { description: 'Unauthorized' },
        },
      },
      post: {
        security: [{ bearerAuth: [] }],
        summary: 'Create team',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/TeamPayload' } } },
        },
        responses: {
          201: { description: 'Team created', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/teams/{id}': {
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
      get: {
        security: [{ bearerAuth: [] }],
        summary: 'Get team by id',
        responses: {
          200: { description: 'Team details', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
          404: { description: 'Team not found' },
        },
      },
      put: {
        security: [{ bearerAuth: [] }],
        summary: 'Update team by id',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/TeamPayload' } } },
        },
        responses: {
          200: { description: 'Team updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
          404: { description: 'Team not found' },
        },
      },
      delete: {
        security: [{ bearerAuth: [] }],
        summary: 'Delete team by id',
        responses: {
          200: { description: 'Team deleted', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
          404: { description: 'Team not found' },
        },
      },
    },
    '/teams/{id}/members': {
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
      post: {
        security: [{ bearerAuth: [] }],
        summary: 'Add team member',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/MemberPayload' } } },
        },
        responses: {
          200: { description: 'Member added', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
          400: { description: 'Invalid payload' },
          404: { description: 'Team not found' },
        },
      },
      delete: {
        security: [{ bearerAuth: [] }],
        summary: 'Remove team member',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/MemberPayload' } } },
        },
        responses: {
          200: { description: 'Member removed', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
          400: { description: 'Invalid payload' },
          404: { description: 'Team not found' },
        },
      },
    },
    '/events': {
      get: {
        security: [{ bearerAuth: [] }],
        summary: 'Get events',
        responses: {
          200: { description: 'Events list', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
          401: { description: 'Unauthorized' },
        },
      },
      post: {
        security: [{ bearerAuth: [] }],
        summary: 'Create event',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/EventPayload' } } },
        },
        responses: {
          201: { description: 'Event created', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/events/{id}': {
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
      get: {
        security: [{ bearerAuth: [] }],
        summary: 'Get event by id',
        responses: {
          200: { description: 'Event details', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
          404: { description: 'Event not found' },
        },
      },
      put: {
        security: [{ bearerAuth: [] }],
        summary: 'Update event by id',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/EventPayload' } } },
        },
        responses: {
          200: { description: 'Event updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
          404: { description: 'Event not found' },
        },
      },
      delete: {
        security: [{ bearerAuth: [] }],
        summary: 'Delete event by id',
        responses: {
          200: { description: 'Event deleted', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
          404: { description: 'Event not found' },
        },
      },
    },
    '/config': {
      get: {
        security: [{ bearerAuth: [] }],
        summary: 'Get configs',
        responses: {
          200: { description: 'Config list', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
        },
      },
      post: {
        security: [{ bearerAuth: [] }],
        summary: 'Create config',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ConfigPayload' } } },
        },
        responses: {
          201: { description: 'Config created', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
        },
      },
    },
    '/config/{id}': {
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
      get: {
        security: [{ bearerAuth: [] }],
        summary: 'Get config by id',
        responses: {
          200: { description: 'Config details', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
          404: { description: 'Config not found' },
        },
      },
      put: {
        security: [{ bearerAuth: [] }],
        summary: 'Update config by id',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ConfigPayload' } } },
        },
        responses: {
          200: { description: 'Config updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
          404: { description: 'Config not found' },
        },
      },
      delete: {
        security: [{ bearerAuth: [] }],
        summary: 'Delete config by id',
        responses: {
          200: { description: 'Config deleted', content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } } },
          404: { description: 'Config not found' },
        },
      },
    },
    '/leaderboard': {
      post: {
        security: [{ bearerAuth: [] }],
        summary: 'Get season leaderboard',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LeaderboardPayload' },
            },
          },
        },
        responses: {
          200: {
            description: 'Leaderboard response',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiResponse' } } },
          },
          400: { description: 'Invalid payload' },
          401: { description: 'Unauthorized' },
        },
      },
    },
  },
};

module.exports = openApiSpec;
