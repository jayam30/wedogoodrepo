const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  ngoId: { type: String, required: true },
  month: { type: String, required: true, match: /^\d{4}-(0[1-9]|1[0-2])$/ }, // YYYY-MM
  peopleHelped: { type: Number, required: true, min: 0 },
  eventsConducted: { type: Number, required: true, min: 0 },
  fundsUtilized: { type: Number, required: true, min: 0 }
});

module.exports = mongoose.model('Report', reportSchema);
