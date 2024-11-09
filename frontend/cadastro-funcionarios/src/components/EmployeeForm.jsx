// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import api from "../api.js";
import { useNavigate, useParams, Link } from "react-router-dom";

function EmployeeForm() {
  const [form, setForm] = useState({
    //form armazena e set atualiza
    nome: "",
    email: "",
    salario: "",
    idade: "",
    data_admissao: "",
  });

  const [errors, setErrors] = useState({}); // Estado para armazenar mensagens de erro
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) fetchEmployee(id);
  }, [id]);

  const fetchEmployee = async (id) => {
    // buscando dados do funcionario para edição
    try {
      const response = await api.get(`/${id}`);
      const data = response.data;
      setForm({
        ...data,
        data_admissao: data.data_admissao
          ? data.data_admissao.split("T")[0]
          : "", // Formato "YYYY-MM-DD"
      });
    } catch (error) {
      console.error("Erro ao buscar funcionário:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...form,
        data_admissao: form.data_admissao.split("T")[0], // Garante o formato "YYYY-MM-DD"
      };
      if (id) {
        await api.put(`/${id}`, formattedData);
      } else {
        await api.post("", formattedData);
      }
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        // Atualiza o estado de erros com as mensagens retornadas do backend
        setErrors(error.response.data);
      } else {
        console.error("Erro ao salvar funcionário:", error);
      }
    }
  }; // envia os dados do funcionario e retorna para a lista inicial

  return (
    <div>
      <Link
        to="/"
        style={{
          color: "var(--link-color)",
          marginBottom: "1rem",
          display: "inline-block",
        }}
      >
        Voltar à Lista de Funcionários
      </Link>
      <h1>{id ? "Editar Funcionário" : "Cadastrar Funcionário"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
          {errors.nome && <p style={{ color: "red" }}>{errors.nome}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <label>Salário:</label>
          <input
            type="number"
            name="salario"
            value={form.salario}
            onChange={handleChange}
            required
          />
          {errors.salario && <p style={{ color: "red" }}>{errors.salario}</p>}
        </div>
        <div>
          <label>Idade:</label>
          <input
            type="number"
            name="idade"
            value={form.idade}
            onChange={handleChange}
            required
          />
          {errors.idade && <p style={{ color: "red" }}>{errors.idade}</p>}
        </div>
        <div>
          <label>Data de Admissão:</label>
          <input
            type="date"
            name="data_admissao"
            value={form.data_admissao}
            onChange={handleChange}
            required
          />
          {errors.data_admissao && (
            <p style={{ color: "red" }}>{errors.data_admissao}</p>
          )}
        </div>
        <button type="submit">{id ? "Salvar Alterações" : "Cadastrar"}</button>
        {errors.error && <p style={{ color: "red" }}>{errors.error}</p>}
      </form>
    </div>
  );
}

export default EmployeeForm;
