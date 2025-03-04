package br.com.drs.casa_abrigo.controller;

import br.com.drs.casa_abrigo.model.Cozinha;
import br.com.drs.casa_abrigo.service.CozinhaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cozinha")
public class CozinhaController {

    @Autowired
    private CozinhaService cozinhaService;

    @PostMapping
    public String salvar(@RequestBody Cozinha cozinha) {
        cozinhaService.salvar(cozinha);
        return "Cozinha salva com sucesso!";
    }

    @GetMapping
    public List<Cozinha> listarTodos() {
        return cozinhaService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Cozinha> buscar(@PathVariable Long id) {
        return cozinhaService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public String atualizar(@PathVariable Long id, @RequestBody Cozinha cozinha) {
        cozinha.setId(id);
        cozinhaService.atualizar(cozinha);
        return "Cozinha atualizada com sucesso!";
    }

    @DeleteMapping("/{id}")
    public String apagar(@PathVariable Long id) {
        cozinhaService.deletarPorId(id);
        return "Cozinha apagada com sucesso!";
    }
}