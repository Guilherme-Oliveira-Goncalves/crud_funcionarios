// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/cadastro" element={<EmployeeForm />} />
        <Route path="/editar/:id" element={<EmployeeForm />} />
      </Routes>
    </Router>
  );
}

//define as rotas do frontend

export default App;
