package com.example.cadastroFuncionario.Funcionario;

public record FuncionarioResponseDTO(Long id, String nome, String email, double salario, Integer idade, java.time.LocalDate data_admissao) {

    public FuncionarioResponseDTO(Funcionario funcionario){
        this(funcionario.getId(), funcionario.getNome(), funcionario.getEmail(), funcionario.getSalario(), funcionario.getIdade(), funcionario.getData_admissao());
    }
}
