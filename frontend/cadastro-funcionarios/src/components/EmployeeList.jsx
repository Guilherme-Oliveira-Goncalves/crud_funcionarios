// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import api from "../api.js";
import { Link } from "react-router-dom";

// inicializando as variaveis como vazias atraves do useState
function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterSalary, setFilterSalary] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  useEffect(() => {
    // executa uma vez quando o componente for montado
    fetchEmployees(); //obtem dados dos funcionarios
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get("");
      setEmployees(response.data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/${id}`); // deleta funcionario
      fetchEmployees(); //atualiza a lista
    } catch (error) {
      console.error("Erro ao deletar funcionário:", error);
    }
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(salary);
  };

  const handleExportExcel = async () => {
    try {
      const response = await api.get("/export/excel", {
        responseType: "blob", // cria um link temporario para download
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "funcionarios.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Erro ao exportar Excel:", error);
    }
  };

  // Função para filtrar os funcionários com base nos critérios
  const filteredEmployees = employees.filter((employee) => {
    const matchesName = employee.nome
      .toLowerCase()
      .includes(filterName.toLowerCase());
    const matchesEmail = employee.email
      .toLowerCase()
      .includes(filterEmail.toLowerCase());
    const matchesSalary = filterSalary
      ? employee.salario >= parseFloat(filterSalary)
      : true;

    // Formata a data de admissão e datas de filtro para comparação
    const employeeDate = new Date(employee.data_admissao);
    const startDate = dataInicio ? new Date(dataInicio) : null;
    const endDate = dataFim ? new Date(dataFim) : null;

    const matchesDateRange =
      (!startDate || employeeDate >= startDate) &&
      (!endDate || employeeDate <= endDate);

    return matchesName && matchesEmail && matchesSalary && matchesDateRange;
  });

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <h1>Lista de Funcionários</h1>
      <br></br>
      <div className="button-container">
        <Link to="/cadastro" className="create-button">
          Criar
        </Link>
      </div>
      {/* Filtros */}
      <div className="filter-container">
        <div className="filter-row">
          <input
            type="text"
            placeholder="Filtrar por Nome"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)} //atualiza o nome quando algo for digitado
          />
          <input
            type="text"
            placeholder="Filtrar por Email"
            value={filterEmail}
            onChange={(e) => setFilterEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Salário mínimo"
            value={filterSalary}
            onChange={(e) => setFilterSalary(e.target.value)}
          />
        </div>
        <div className="filter-row">
          <input
            type="date"
            placeholder="Data de Início"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
          <input
            type="date"
            placeholder="Data de Fim"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>
      </div>
      <div className="button-container">
        <button
          onClick={handleExportExcel}
          style={{ marginLeft: "1rem", fontSize: "1.1rem" }}
        >
          Exportar para Excel
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Salário</th>
            <th>Idade</th>
            <th>Data de Admissão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(
            (
              employee //itera na lista de funcionario e renderiza todos os funcionarios
            ) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.nome}</td>
                <td>{employee.email}</td>
                <td>{formatSalary(employee.salario)}</td>
                <td>{employee.idade}</td>
                <td>{formatDate(employee.data_admissao)}</td>
                <td>
                  <span
                    onClick={() => handleDelete(employee.id)}
                    className="icon-button"
                  >
                    <FaTrash /> {/* Icone de lixeira para deletar */}
                  </span>
                  <Link to={`/editar/${employee.id}`} className="icon-button">
                    <FaEdit />
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
