const { eq } = require('drizzle-orm');
const { db } = require('../db/client');
const { config } = require('../db/schema');
const { sendResponse } = require('../utils/response');

const toApiConfig = (row) => ({
  id: row.id,
  current_season: row.currentSeason,
  seasons: row.seasons,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});

const createConfig = async (req, res, next) => {
  try {
    const payload = {
      currentSeason: req.body.current_season,
      seasons: Array.isArray(req.body.seasons) ? req.body.seasons : [],
      updatedAt: new Date(),
    };
    const [record] = await db.insert(config).values(payload).returning();
    return sendResponse(res, 201, 'Config created successfully', toApiConfig(record));
  } catch (error) {
    next(error);
  }
};

const getConfigs = async (_req, res, next) => {
  try {
    const rows = await db.select().from(config);
    return sendResponse(res, 200, 'Configs fetched successfully', rows.map(toApiConfig));
  } catch (error) {
    next(error);
  }
};

const getConfigById = async (req, res, next) => {
  try {
    const [row] = await db.select().from(config).where(eq(config.id, Number(req.params.id))).limit(1);
    if (!row) return sendResponse(res, 404, 'Config not found', null);
    return sendResponse(res, 200, 'Config fetched successfully', toApiConfig(row));
  } catch (error) {
    next(error);
  }
};

const updateConfigById = async (req, res, next) => {
  try {
    const [row] = await db
      .update(config)
      .set({
        ...(req.body.current_season ? { currentSeason: req.body.current_season } : {}),
        ...(Array.isArray(req.body.seasons) ? { seasons: req.body.seasons } : {}),
        updatedAt: new Date(),
      })
      .where(eq(config.id, Number(req.params.id)))
      .returning();

    if (!row) return sendResponse(res, 404, 'Config not found', null);
    return sendResponse(res, 200, 'Config updated successfully', toApiConfig(row));
  } catch (error) {
    next(error);
  }
};

const deleteConfigById = async (req, res, next) => {
  try {
    const [row] = await db.delete(config).where(eq(config.id, Number(req.params.id))).returning();
    if (!row) return sendResponse(res, 404, 'Config not found', null);
    return sendResponse(res, 200, 'Config deleted successfully', toApiConfig(row));
  } catch (error) {
    next(error);
  }
};

module.exports = { createConfig, getConfigs, getConfigById, updateConfigById, deleteConfigById };
