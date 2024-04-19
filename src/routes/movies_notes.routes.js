const { Router } = require('express')

const MoviesNotesController = require('../controllers/MoviesNotesController');

const moviesRouters = Router();

const usersRouters = require('./users.routes');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const moviesNotesController = new MoviesNotesController();

usersRouters.use(ensureAuthenticated)

usersRouters.post('/movies_notes', moviesNotesController.create);
usersRouters.get('/movies_notes/:id', moviesNotesController.show);
usersRouters.delete('/movies_notes/:id', moviesNotesController.delete);
usersRouters.get('/movies_notes/', moviesNotesController.index);

module.exports = moviesRouters