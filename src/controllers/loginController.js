const Login = require("../models/LoginModel");

exports.index = (req, res) => {
  res.render("login");
};

exports.register = async function (req, res) {
  try {
    const login = new Login(req.body); //login.body -> onde vem o post do formulário
    await login.register(); //Validação e criação de um user

    //Se tiver mensagem de erro na tela, ele vai exibir
    if (login.errors.length > 0) {
      req.flash("errors", login.errors);

      //Redirecionar a página de volta para a página de login, caso há erro ao registrar
      //session são os dados que queremos mantes sobre o usuário. A partir do momento que estamos no meio de uma operação que não queremos perder os dados caso a página mude ou atualize, devemos salvar a session.
      req.session.save(function () {
        return res.redirect("back"); //Retorna da onde o formualário veio
      });
      return;
    }
    req.flash("success", 'Seu usuário foi criado com sucesso');
    req.session.save(function () {
      return res.redirect("back");
    });

  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};
