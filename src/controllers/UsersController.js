const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
class UsersController {
    
    async create(request, response){
        const { name, email, password, avatar } = request.body

        const database = await sqliteConnection()
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(checkUserExists) {
            throw new AppError('Este e-mail já está em uso!')            
        }
        
        const hashedPassword = await hash(password, 10)

        await database.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
            [name, email, hashedPassword]
        )

        return response.status(201).json({status: 'success', message: 'Usuário cadastrado com sucesso!'})
      
    }
    
    async update(request, response){
        const { name, email, password, old_password } = request.body
        const user_id = request.user.id
   
        const database = await sqliteConnection()
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])
   
        if(!user) {
         throw new AppError("Usuário não encontrado.")
        }
   
        if (email) {
            const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])
   
            if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
                throw new AppError('Este e-mail já está em uso.')
            }
        }
           
        user.name = name ?? user.name
        user.email= email ?? user.email
   
        if(password && !old_password) {
         throw new AppError("Você precisa informar a senha antiga para definir uma nova senha.")    
        }
   
        if(password && old_password) {
            const checkOldPassword = await compare(old_password, user.password)
   
         if(!checkOldPassword) {
           throw new AppError("A senha antiga não confere.")
         }
   
         user.password = await hash(password, 10)
        }
   
        await database.run(`
         UPDATE users SET
         name = ?,
         email = ?,
         password = ?,
         updated_at = DATETIME('now')
         WHERE id = ?`, 
         [user.name, user.email, user.password, user_id]
       )
   
       return response.json()
     }


    async show(request, response){
        const { id } = request.params

        const user = await knex('users').where('id', id).first()
        if(user){
          return response.json(user)
        }

        return response.status(404).json({status: 'error', message: 'Usuário não encontrado!'})
    }

    async delete(request, response){
        
        const { id } = request.params

        await knex('users').where('id', id).delete()

        response.status(200).json({status: 'success', message: 'Usuário deletado com sucesso!'})
    }
}

module.exports = UsersController