const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, { 
  timestamps: true,
  strict: false // allow dynamic fields in the document
});

module.exports = mongoose.model('Item', ItemSchema);
