const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const LoginSchema = new mongoose.Schema({
    email:{ type: String, required:true },
    password:{ type: String, required:true },
})
const validator = require('validator')
const LoginModel = mongoose.model('Login', LoginSchema)

class Login{
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }

    async login(){
        this.valida_dados()
        if(this.errors.length > 0) returnthis

        this.user = await LoginModel.findOne({email: this.body.email})
        if(!this.user){
            this.errors.push("Usuário ou senha inválidos")
            return
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push("Usuário ou senha inválidos")
            this.user = null
            return
        }
    }

    
    async register(){
        
        this.valida_dados()
        if(this.errors.length > 0) return
        
        await this.userExists()
        if(this.errors.length > 0) return
        
        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)

        this.user = await LoginModel.create(this.body)  
    }

    async userExists(){
        const user = await LoginModel.findOne({email: this.body.email})
        if(user) this.errors.push('Usuário já existe.')
    }

    valida_dados(){
        this.cleanUp()
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.')

        if(this.body.password.length < 4 || this.body.password.length > 20){
            this.errors.push('A senha precisa ter entre  5 a 20 caracteres.')
        }
        //validação
        //O email precisa ser valido
        //Senha precisa ter de 5 a 20
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }



}

module.exports = Login