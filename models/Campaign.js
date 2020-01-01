const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  leads: {
    type: String,
    required: true
  },

  connected: {
    type: String,
    required: true
  },
  closed: {
    type: String,
    required: true
  },
  tottal_sales: {
    type: String,
    required: true
  },

  created_at: {
    type: Date,
    default: Date.now
  }
});

const Campaign = mongoose.model('Campaign', CampaignSchema);

module.exports = Campaign;
