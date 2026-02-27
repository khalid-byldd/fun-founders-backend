require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const apiRoutes = require('./routes');
const openApiSpec = require('./docs/openapi');
const { sendResponse } = require('./utils/response');

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  return sendResponse(res, 200, 'Service is healthy', { status: 'ok' });
});

app.get('/openapi.json', (_req, res) => {
  return res.json(openApiSpec);
});

app.get('/docs', (_req, res) => {
  res.type('html').send(`<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Fun Founders API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.ui = SwaggerUIBundle({
        url: '/openapi.json',
        dom_id: '#swagger-ui'
      });
    </script>
  </body>
</html>`);
});

app.use('/', apiRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  return sendResponse(res, 500, 'Internal server error', null);
});

const port = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});
