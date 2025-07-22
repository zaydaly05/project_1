const UserDashboard = require('../models/userDashboard.model');

// Create
const dashboard = new UserDashboard({
  userId: someUserId,
  totalReadings: 25,
  activeStations: 3
  
});
await dashboard.save();

// Fetch
const userDash = await UserDashboard.findOne({ userId: someUserId });
// Update
userDash.totalReadings += 5;    