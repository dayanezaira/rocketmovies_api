const { Router } = require('express')
const routes = Router()

const usersRouters = require('./users.routes')
const moviesNotesRouters = require('./movies_notes.routes')
const moviesTagsRouters = require('./movies_tags.routes')
const sessionsRouters = require('./sessions.routes')

routes.use('/users', usersRouters)
routes.use('/movies_notes', moviesNotesRouters)
routes.use('/movies_tags', moviesTagsRouters)
routes.use('/sessions', sessionsRouters)

module.exports = routes