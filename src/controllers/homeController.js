const Contato = require('../model/ContatoModel')
module.exports.index = async (req,res,next)=>{
    const contatos = await Contato.findContatos()
    res.render('index', {contatos})
    return
}
