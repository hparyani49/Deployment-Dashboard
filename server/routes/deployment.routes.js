let express = require('express'),
    router = express.Router();

// Deployment controller
let deploymentController = require('../controller/Deployment');

router.post('/add-deployment', deploymentController.add)
router.post('/delete-deployment', deploymentController.delete)
router.get('/get-deployment', deploymentController.getAll)
router.get('/get-templates', deploymentController.getAllTemplates)

module.exports = router;
