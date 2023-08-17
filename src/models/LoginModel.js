const mongoose = require("mongoose");
const validator = require('validator'); //modulo de validação

const LoginSchema = new mongoose.Schema({ //O que vai ser salvo no banco de dados
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = []; //Se tiver algum erro aqui
    this.user = null; //Não será criado o user no banco
  }

  async register() { //Retorna uma promessa e tudo que ele retorna é promess
    //Vai criar o usuario após a validação, pois ele mesmo chama o metodo valida
    this.valida();
    if(this.errors.length > 0) return; //Se tiver algum erro na array, ele não executa

    //Sempre que é async/await tem que envolver num try/cacth
    try {
      this.user = await LoginModel.create(this.body) //Mandando para a base de dados, criando um user
    } catch(e){
      console.log(e);
    }
  }

  valida() {//método
    this.cleanUp();

    //Validação do email
    //Se ele não for válido, vai enviar um erro lá na array de erros
    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')

    //Validação da senha (entre 3 e 50)
    if(this.body.password.length < 3 || this.this.body.password.length > 50) this.errors.push("A senha precisa ter entre 3 e 50 caracteres");
  }

  cleanUp() {
    for (const key in this.body) {
      //Vai iretar na chave do body(campo do formulário)
      if (typeof this.body[key] !== "string") {
        //Acessa a chave e vai garantir que tudo que está no body é string
        this.body[key] = ""; //Se não for, vai ser uma string vazia
      }
    }

    this.body = {
      //Garante que meu objeto tenha somente os campos que eu quero
      email: this.body.emal,
      password: this.body.password,
    };
  }
}

module.exports = Login;
