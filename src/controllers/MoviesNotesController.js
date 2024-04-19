const knex = require('../database/knex')
class MoviesNotesController {
    async index(request, response){
        const { title, tags} = request.query

        const user_id = request.user.id

        let movie_notes

        movie_notes = await knex('movie_notes')
            .where({ user_id})
            .whereLike('title', `%${title}%`)
            .select('id', 'title', 'description', 'rating')
            .orderBy('title')

        const userTags = await knex('movie_tags').where({ user_id });

        const notesWithTags = movie_notes.map(note => {
            const noteTags = userTags.filter(item => item.note_id === note.id)

            return {
                ...note,
                tags: noteTags
            }
        })

        return response.json(notesWithTags)
    }

    async show(request, response){
        const { id } = request.params
        const movie_note = await knex('movie_notes').where('id', id).first().select('id', 'title', 'description', 'rating', 'created_at')
        const tags = await knex('movie_tags').where('note_id', id).orderBy('name').select('name', 'id')

        if(movie_note){
          return response.json({...movie_note, tags})
        }
        
        return response.status(404).json({status: 'error', message: 'Nota não encontrada!'})
    }

    async create(request, response){
        const { title, description, rating, tags } = request.body
        const user_id = request.user.id

        const [note_id] = await knex('movie_notes').insert({title, description, rating, user_id})

        const tagsInsert = tags.map(name => {
            return {
                name,
                note_id,
                user_id
            }
        });

        await knex('movie_tags').insert(tagsInsert)

        return response.json({status: 'success', message: 'Nota cadastrada com sucesso!'})
    }

    async delete(request, response){
        const { id } = request.params
        const movie_note = await knex('movie_notes').where('id', id).first()

        if (!id || !movie_note) {
            return response.status(404).json({status: 'error', message: 'Nota não encontrada!'})
        }
        await knex('movie_tags').where('note_id', id).delete()
        await knex('movie_notes').where('id', id).delete()

        return response.status(200).json({status: 'success', message: 'Nota deletada com sucesso!'})

    }

    async update(request, response){

        return response.status(200).json({status: 'success', message: 'Nota deletada com sucesso!'})
        
    }
}

module.exports = MoviesNotesController