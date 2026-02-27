const Config = require('../models/Config');

const createConfig = async (req, res, next) => {
  try {
    const config = await Config.create(req.body);
    res.status(201).json(config);
  } catch (error) {
    next(error);
  }
};

const getConfigs = async (_req, res, next) => {
  try {
    const configs = await Config.find();
    res.json(configs);
  } catch (error) {
    next(error);
  }
};

const getConfigById = async (req, res, next) => {
  try {
    const config = await Config.findById(req.params.id);

    if (!config) {
      return res.status(404).json({ message: 'Config not found' });
    }

    res.json(config);
  } catch (error) {
    next(error);
  }
};

const updateConfigById = async (req, res, next) => {
  try {
    const config = await Config.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!config) {
      return res.status(404).json({ message: 'Config not found' });
    }

    res.json(config);
  } catch (error) {
    next(error);
  }
};

const deleteConfigById = async (req, res, next) => {
  try {
    const config = await Config.findByIdAndDelete(req.params.id);

    if (!config) {
      return res.status(404).json({ message: 'Config not found' });
    }

    res.json({ message: 'Config deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConfig,
  getConfigs,
  getConfigById,
  updateConfigById,
  deleteConfigById,
};
