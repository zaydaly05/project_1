const UserDashboard = require('../models/userDashboard.model');

// [GET] Get a user's dashboard by user ID
exports.getDashboardByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const dashboard = await UserDashboard.findOne({ userId });

    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found for this user.' });
    }

    return res.status(200).json(dashboard);
  } catch (err) {
    console.error('Error fetching dashboard:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// [POST] Create a dashboard for a user
exports.createDashboard = async (req, res) => {
  try {
    const { userId, totalReadings, activeStations, notifications } = req.body;

    const existing = await UserDashboard.findOne({ userId });
    if (existing) {
      return res.status(400).json({ message: 'Dashboard already exists for this user.' });
    }

    const dashboard = new UserDashboard({
      userId,
      totalReadings,
      activeStations,
      notifications
    });

    await dashboard.save();
    return res.status(201).json(dashboard);
  } catch (err) {
    console.error('Error creating dashboard:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// [PUT] Update a user's dashboard
exports.updateDashboard = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const dashboard = await UserDashboard.findOneAndUpdate(
      { userId },
      updates,
      { new: true }
    );

    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found.' });
    }

    return res.status(200).json(dashboard);
  } catch (err) {
    console.error('Error updating dashboard:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// [DELETE] Delete a user's dashboard
exports.deleteDashboard = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await UserDashboard.findOneAndDelete({ userId });

    if (!result) {
      return res.status(404).json({ message: 'Dashboard not found.' });
    }

    return res.status(200).json({ message: 'Dashboard deleted successfully.' });
  } catch (err) {
    console.error('Error deleting dashboard:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
