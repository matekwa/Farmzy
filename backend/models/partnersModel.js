const mongoose = require('mongoose');

const partnerLogoSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

const PartnerLogoModel = mongoose.model('skyfalke_partners', partnerLogoSchema);

module.exports = PartnerLogoModel;
