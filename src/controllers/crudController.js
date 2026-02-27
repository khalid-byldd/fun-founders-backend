const createCrudController = (Model, populate = '') => ({
  create: async (req, res, next) => {
    try {
      const created = await Model.create(req.body);
      const entity = populate ? await Model.findById(created._id).populate(populate) : created;
      res.status(201).json(entity);
    } catch (error) {
      next(error);
    }
  },

  getAll: async (_req, res, next) => {
    try {
      const query = Model.find();
      if (populate) query.populate(populate);
      const entities = await query;
      res.json(entities);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const query = Model.findById(req.params.id);
      if (populate) query.populate(populate);
      const entity = await query;

      if (!entity) {
        return res.status(404).json({ message: 'Record not found' });
      }

      res.json(entity);
    } catch (error) {
      next(error);
    }
  },

  updateById: async (req, res, next) => {
    try {
      const updated = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }).populate(populate);

      if (!updated) {
        return res.status(404).json({ message: 'Record not found' });
      }

      res.json(updated);
    } catch (error) {
      next(error);
    }
  },

  deleteById: async (req, res, next) => {
    try {
      const deleted = await Model.findByIdAndDelete(req.params.id);

      if (!deleted) {
        return res.status(404).json({ message: 'Record not found' });
      }

      res.json({ message: 'Record deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
});

module.exports = createCrudController;
