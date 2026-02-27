const express = require('express');

const createCrudRoutes = (controller) => {
  const router = express.Router();

  router.post('/', controller.create);
  router.get('/', controller.getAll);
  router.get('/:id', controller.getById);
  router.put('/:id', controller.updateById);
  router.delete('/:id', controller.deleteById);

  return router;
};

module.exports = createCrudRoutes;
