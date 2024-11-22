
class Funcionario {
    constructor(nome, email, cpf, dataNascimento, ativo, dataInclusao, logradouro, bairro, cidade, estado, cep, celular, id_empresa, dataValidadeVR, saldo) {
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
        this.id_empresa = id_empresa;
        this.dataValidadeVR = dataValidadeVR;
        this.saldo = saldo;
    }
}

export default Funcionario;
