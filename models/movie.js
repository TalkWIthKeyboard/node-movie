/**
 * Created by CoderSong on 16/8/16.
 */
var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
var Movie = mongoose.model('Movie',MovieSchema);

module.exports = Movie;