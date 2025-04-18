const express = require('express');
const router = express.Router();
const Report = require('../models/Report');


router.post('/report', async (req, res) => {
  try {
    const { ngoId, month, peopleHelped, eventsConducted, fundsUtilized } = req.body;
    console.log('Incoming Data:', req.body); 

    if (!ngoId || !month || peopleHelped == null || eventsConducted == null || fundsUtilized == null) {
      console.log('Validation failed'); 
      return res.status(400).json({ message: 'All fields are required' });
    }

    const report = new Report({ ngoId, month, peopleHelped, eventsConducted, fundsUtilized });
    await report.save();

    res.status(201).json({ message: 'Report submitted successfully' });
  } catch (error) {
    console.error('Error submitting report:', error); 
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});





router.get('/dashboard', async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: 'Month is required (YYYY-MM)' });
    }

    const reports = await Report.find({ month });

    const totalPeopleHelped = reports.reduce((sum, r) => sum + Number(r.peopleHelped), 0);
    const totalEvents = reports.reduce((sum, r) => sum + Number(r.eventsConducted), 0);
    const totalFunds = reports.reduce((sum, r) => sum + Number(r.fundsUtilized), 0);

    res.json({ month, totalPeopleHelped, totalEvents, totalFunds });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
    console.error('Error in /dashboard:', error);
  }
});

module.exports = router;