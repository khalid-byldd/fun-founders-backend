const Config = require('../models/Config');
const { sendResponse } = require('../utils/response');

const createConfig = async (req, res, next) => {
  try {
    const config = await Config.create(req.body);
    return sendResponse(res, 201, 'Config created successfully', config);
  } catch (error) {
    next(error);
  }
};

const getConfigs = async (_req, res, next) => {
  try {
    const configs = await Config.find();
    return sendResponse(res, 200, 'Configs fetched successfully', configs);
  } catch (error) {
    next(error);
  }
};

const getConfigById = async (req, res, next) => {
  try {
    const config = await Config.findById(req.params.id);

    if (!config) {
      return sendResponse(res, 404, 'Config not found', null);
    }

    return sendResponse(res, 200, 'Config fetched successfully', config);
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
      return sendResponse(res, 404, 'Config not found', null);
    }

    return sendResponse(res, 200, 'Config updated successfully', config);
  } catch (error) {
    next(error);
  }
};

const deleteConfigById = async (req, res, next) => {
  try {
    const config = await Config.findByIdAndDelete(req.params.id);

    if (!config) {
      return sendResponse(res, 404, 'Config not found', null);
    }

    return sendResponse(res, 200, 'Config deleted successfully', config);
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
