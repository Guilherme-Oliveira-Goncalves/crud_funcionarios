package com.example.cadastroFuncionario.controller;

import com.example.cadastroFuncionario.Funcionario.FuncionarioRequestDTO;
import com.example.cadastroFuncionario.Funcionario.FuncionarioResponseDTO;
import com.example.cadastroFuncionario.service.FuncionarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("funcionario")
public class FuncionarioController {

    @Autowired
    private FuncionarioService service;

    //Salvar funcionario
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public void saveFuncionario(@RequestBody @Valid FuncionarioRequestDTO data) {
        service.saveFuncionario(data);
    }

    //Listar todos os funcionarios
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<FuncionarioResponseDTO> getAll() {
        return service.getAllFuncionarios();
    }

    // Buscar um funcionario pelo id
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{id}")
    public FuncionarioResponseDTO getFuncionarioById(@PathVariable Long id) {
        return service.getFuncionarioById(id);
    }

    //Atualizar um funcionario
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/{id}")
    public void updateFuncionario(@PathVariable Long id, @RequestBody @Valid FuncionarioRequestDTO data) {
        service.updateFuncionario(id, data);
    }

    //Deletar um funcionario
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{id}")
    public void deleteFuncionario(@PathVariable Long id) {
        service.deleteFuncionario(id);
    }

    // Exportar excel
    @GetMapping("/export/excel")
    public ResponseEntity<byte[]> exportToExcel() {
        try {
            byte[] excelData = service.exportToExcel();
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=funcionarios.xlsx");
            headers.add("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            return new ResponseEntity<>(excelData, headers, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
