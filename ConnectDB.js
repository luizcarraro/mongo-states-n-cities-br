let mongoose = require('mongoose');


module.exports = {

    retornaConexao(){

        let conexaoBanco = this.conecta()
        return conexaoBanco;
    },

    conecta(){

        let conexao = mongoose.connect('mongodb://localhost/testStatesNCities');
        return conexao;
    }
}
