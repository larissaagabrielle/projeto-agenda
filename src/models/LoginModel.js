const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = []; //Se tiver algum erro aqui
    this.user = null //Não será criado o user no banco
  }

  valida() { //método
    //validação 
    

  }
}

module.exports = Login;
