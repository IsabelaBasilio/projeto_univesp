package br.com.drs.casa_abrigo.controller;

import br.com.drs.casa_abrigo.model.Quarto;
import br.com.drs.casa_abrigo.service.QuartoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/quarto")
public class QuartoController {

    @Autowired
    private QuartoService quartoService;

    @PostMapping
    public String salvar(@RequestBody Quarto quarto) {
        quartoService.salvar(quarto);
        return "Quarto salvo com sucesso!";
    }

    @GetMapping
    public List<Quarto> listarTodos() {
        return quartoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Quarto> buscarPorId(@PathVariable Long id) {
        return quartoService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public String atualizar(@PathVariable Long id, @RequestBody Quarto quarto) {
        quarto.setId(id);
        quartoService.atualizar(quarto);
        return "Quarto atualizado com sucesso!";
    }

    @DeleteMapping("/{id}")
    public String excluir(@PathVariable Long id) {
        quartoService.deletarPorId(id);
        return "Quarto excluido com sucesso!";
    }
}