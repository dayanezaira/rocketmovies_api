const knex = require('../database/knex')
class MoviesTagsController {
    async index(request, response){
        const { movie_note_id } = request.params
        const user_id = request.user.id

        const tags = await knex('movie_tags')
        .where({ user_id, movie_note_id })

        return response.json(tags)
    }
}

module.exports = MoviesTagsController