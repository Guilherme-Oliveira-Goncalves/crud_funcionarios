package com.example.cadastroFuncionario.Funcionario;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Table(name = "funcionario")
@Entity(name = "funcionario")
@Getter
@Setter
@NoArgsConstructor //construtor sem parametro
@AllArgsConstructor //com parametro
@EqualsAndHashCode(of = "id")
public class Funcionario {

    // Classe usada para mapear as tabelas do banco e trata-las como objetos em Java.
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "funcionario_seq")
    @SequenceGenerator(name = "funcionario_seq", sequenceName = "funcionario_seq", allocationSize = 1)
    private Long id;

    private String nome;

    private String email;

    private double salario;

    private Integer idade;


    private LocalDate data_admissao;

    public Funcionario(FuncionarioRequestDTO data){

        this.nome = data.nome();
        this.email = data.email();
        this.salario = data.salario();
        this.idade = data.idade();
        this.data_admissao = data.data_admissao();
    }

}
