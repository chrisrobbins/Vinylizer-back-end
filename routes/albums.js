var express = require('express');
var router = express.Router();
var Album = require('../models/album');
var _ = require('lodash');


/* GET albums */
router.get('/', (req, res, next) => {
  // console.log(albums);
  Album.find({}, (err, albums) => {
    if (err) {
      console.log('hello');
      res.status(500).send(err);
      console.log('hello');
    } else {
      res.json(albums);
      console.log(albums);
    }
  })
});
//Get albums from Discogs
router.get('/', (req, res, next) => {
  Album.find({}, (err, albums) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(albums);
    }
  })
});


router.post('/', (req, res, next) => {
  const album = new Album(req.body)
  album.save((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(album);
    }
  })
})

router.get('/:albumId', (req, res, next) => {
Album.findById(req.params.albumId, (err, album) => {
  if (err) {
    res.status(500).send(err);
  } else {
      if (album) {
        res.json(album);
      } else {
          res.status(404).send()
      }
    }
  })
})

router.delete('/:albumId', (req, res, next) => {
  Album.findById(req.params.albumId).remove((err) => {
    if (err) {
      res.status(500).send()
    } else {
      res.status(204).send()
    }
  })
})
module.exports = router;
