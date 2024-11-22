
class Funcionario {
    constructor(nome, email, cpf, dataNascimento, ativo, dataInclusao, logradouro, bairro, cidade, estado, cep, celular, codEmpresa, dataValidadeVR, saldo) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.ativo = ativo;
        this.dataInclusao = dataInclusao;
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
        this.celular = celular;
        this.codEmpresa = codEmpresa;
        this.dataValidadeVR = dataValidadeVR;
        this.saldo = saldo;
    }

    atualizaFuncionario(nome, cpf, codEmpresa, saldo){
        this.nome = nome;
        this.cpf = cpf;
        this.codEmpresa = codEmpresa;
        this.saldo = saldo;
    }

   
}

export default Funcionario;
