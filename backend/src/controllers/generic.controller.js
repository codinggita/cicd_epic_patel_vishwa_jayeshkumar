// src/controllers/generic.controller.js
/**
 * Generic controller that handles CRUD‑like operations for any collection
 * loaded by dataService. The collection name is supplied when the router
 * is created.
 */
const dataService = require('../utils/dataService');
const HTTP_STATUS = require('../constants/httpStatus');

function createController(collectionName) {
  return {
    // GET / – list all items
    getAll: (req, res) => {
      const items = dataService.getCollection(collectionName);
      return res.status(HTTP_STATUS.OK).json({ success: true, data: items });
    },
    // GET /:id – find by id
    getById: (req, res) => {
      const item = dataService.getById(collectionName, req.params.id);
      if (!item) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: 'Not found' });
      }
      return res.status(HTTP_STATUS.OK).json({ success: true, data: item });
    },
    // GET /random – random item
    getRandom: (req, res) => {
      const items = dataService.getCollection(collectionName);
      if (!items.length) return res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: 'Empty collection' });
      const randomItem = items[Math.floor(Math.random() * items.length)];
      return res.status(HTTP_STATUS.OK).json({ success: true, data: randomItem });
    },
    // GET /latest – assume newest is last element
    getLatest: (req, res) => {
      const items = dataService.getCollection(collectionName);
      const latest = items[items.length - 1];
      if (!latest) return res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: 'Empty collection' });
      return res.status(HTTP_STATUS.OK).json({ success: true, data: latest });
    },
    // GET /trending – simply return first 5 items as placeholder
    getTrending: (req, res) => {
      const items = dataService.getCollection(collectionName).slice(0, 5);
      return res.status(HTTP_STATUS.OK).json({ success: true, data: items });
    },
    // POST – create (mock, just echo back)
    create: (req, res) => {
      // In a real DB we would insert; here we just respond with the payload
      return res.status(HTTP_STATUS.CREATED).json({ success: true, data: req.body });
    },
    // PUT – replace full object (mock)
    replace: (req, res) => {
      return res.status(HTTP_STATUS.OK).json({ success: true, data: req.body });
    },
    // PATCH – partial update (mock)
    update: (req, res) => {
      return res.status(HTTP_STATUS.OK).json({ success: true, data: req.body });
    },
    // DELETE – remove (mock)
    delete: (req, res) => {
      return res.status(HTTP_STATUS.NO_CONTENT).send();
    },
    // Additional custom endpoints can be added similarly
  };
}

module.exports = { createController };
