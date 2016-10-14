const mongoose = require('mongoose');

var albumSchema = {
  album: String,
  artist: String,
  year: Number,
  art: String

}

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
