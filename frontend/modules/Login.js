import validator from 'validator'
export default class Login{
    constructor(formClass){
        this.form = document.querySelector(formClass)
    }

    init(){
        this.events()
    }

    events(){
        if(!this.form) return  
        this.form.addEventListener('submit', e=>{
            e.preventDefault()
            this.validate(e)
        })
    }

    validate(e){
        let erro = false
        const el = e.target
        const inputEmail = el.querySelector('input[name="email"]')
        const inputPassword = el.querySelector('input[name="password"]')

        if(!validator.isEmail(inputEmail.value)){
            erro = true
            inputEmail.classList.add('is-invalid')
        }
        if(inputPassword.value.length < 3 && inputPassword.value.length > 20  ){
            erro = true
            inputEmail.classList.add('is-invalid')
        }

        if(!erro) el.submit()
    }
}
