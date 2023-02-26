var express = require('express');
var router = express.Router();
const {
    getClients,
    getProjects,
    getClientProjects,
    getServices,
    getWorkforceTypes,
    addOperation,
    getProjectOperations,
    getBatches,
    addMeasurement,
    disableOperation,
    getClient
} = require('../controllers/indexController')

router.get('/clients', getClients)
router.get('/projects', getProjects)
router.get('/projects/client/:id', getClientProjects)
router.get('/services', getServices)
router.get('/workforces', getWorkforceTypes)
router.get('/operations/project/:id', getProjectOperations)
router.get('/batches/project/:id', getBatches)
router.get('/client/:id', getClient)

router.post('/operations', addOperation)
router.post('/measurements', addMeasurement)
router.post('/disable/:id', disableOperation)


module.exports = router;