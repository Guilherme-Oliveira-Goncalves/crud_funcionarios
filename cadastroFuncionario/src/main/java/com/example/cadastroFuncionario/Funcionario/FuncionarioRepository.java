package com.example.cadastroFuncionario.Funcionario;

import org.springframework.data.jpa.repository.JpaRepository;

//interface usada para manipular os métodos de acesso do banco de dados, extendidos pela JpaRepository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
}
