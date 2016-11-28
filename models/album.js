const mongoose = require('mongoose');

var albumSchema = {
  art: String,
  artist: String,
  album: String,
  year: Number
}

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
