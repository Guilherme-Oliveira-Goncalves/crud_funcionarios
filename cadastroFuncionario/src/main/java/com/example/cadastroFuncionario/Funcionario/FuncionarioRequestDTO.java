package com.example.cadastroFuncionario.Funcionario;

import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.util.Date;

public record FuncionarioRequestDTO( // encapsulamento da entrada de dados

        @NotBlank(message = "Nome é obrigatório")
        @Size(min = 3, message = "Nome deve ter no mínimo 3 caracteres")
        String nome,

        @NotBlank(message = "E-mail é obrigatório")
        @Email(message = "Formato de e-mail inválido")
        String email,

        @NotNull(message = "Salário é obrigatório")
        @DecimalMin(value = "1320.00", message = "O salário não pode ser inferior ao salário mínimo de R$ 1.320,00")
        double salario,

        @NotNull(message = "Idade é obrigatória")
        @Min(value = 18, message = "Idade mínima é de 18 anos")
        Integer idade,

        @NotNull(message = "Data de admissão é obrigatória")
        @PastOrPresent(message = "A data de admissão deve ser uma data passada ou presente")
        LocalDate data_admissao
) {}