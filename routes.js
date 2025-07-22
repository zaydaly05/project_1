const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/userDashboard.controller');

router.get('/:userId', dashboardController.getDashboardByUserId);
router.post('/', dashboardController.createDashboard);
router.put('/:userId', dashboardController.updateDashboard);
router.delete('/:userId', dashboardController.deleteDashboard);

module.exports = router;
