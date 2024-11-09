package com.example.cadastroFuncionario.service;

import com.example.cadastroFuncionario.Funcionario.Funcionario;
import com.example.cadastroFuncionario.Funcionario.FuncionarioRepository;
import com.example.cadastroFuncionario.Funcionario.FuncionarioRequestDTO;
import com.example.cadastroFuncionario.Funcionario.FuncionarioResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import java.util.List;

//logica de negocio
@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository repository;

    public void saveFuncionario(FuncionarioRequestDTO data) {
        Funcionario funcionarioData = new Funcionario(data);
        repository.save(funcionarioData);
    }

    public List<FuncionarioResponseDTO> getAllFuncionarios() {
        return repository.findAll().stream().map(FuncionarioResponseDTO::new).toList();
    }

    public FuncionarioResponseDTO getFuncionarioById(Long id) {
        Funcionario funcionario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));
        return new FuncionarioResponseDTO(funcionario);
    }


    public void updateFuncionario(Long id, FuncionarioRequestDTO data) {
        Funcionario funcionario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        funcionario.setNome(data.nome());
        funcionario.setEmail(data.email());
        funcionario.setSalario(data.salario());
        funcionario.setIdade(data.idade());
        funcionario.setData_admissao(data.data_admissao());

        repository.save(funcionario);
    }

    public void deleteFuncionario(Long id) {
        Funcionario funcionario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));
        repository.delete(funcionario);
    }

    public byte[] exportToExcel() throws IOException {
        List<Funcionario> funcionarios = repository.findAll();

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Funcionarios");

            // Criando o cabeçalho
            Row headerRow = sheet.createRow(0);
            String[] headers = {"ID", "Nome", "Email", "Salário", "Idade", "Data de Admissão"};
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }

            // Preenchendo as linhas com dados dos funcionários
            int rowIdx = 1;
            for (Funcionario funcionario : funcionarios) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(funcionario.getId());
                row.createCell(1).setCellValue(funcionario.getNome());
                row.createCell(2).setCellValue(funcionario.getEmail());
                row.createCell(3).setCellValue(funcionario.getSalario());
                row.createCell(4).setCellValue(funcionario.getIdade());
                row.createCell(5).setCellValue(funcionario.getData_admissao().toString());
            }

            workbook.write(out);
            return out.toByteArray();
        }
    }
}
