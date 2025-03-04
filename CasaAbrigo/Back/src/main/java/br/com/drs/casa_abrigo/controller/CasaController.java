package br.com.drs.casa_abrigo.controller;

import br.com.drs.casa_abrigo.model.Casa;
import br.com.drs.casa_abrigo.service.CasaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/casa")
public class CasaController {

    @Autowired
    private CasaService casaService;

    @PostMapping
    public String salvar(@RequestBody Casa casa) {
        casaService.salvar(casa);
        return "Casa salva com sucesso!";
    }

    @GetMapping
    public List<Casa> listarTodos() {
        return casaService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Casa> buscarPorId(@PathVariable Long id) {
        return casaService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public String atualizar(@PathVariable Long id, @RequestBody Casa casa) {
        casa.setId(id);
        casaService.atualizar(casa);
        return "Casa atualizada com sucesso!";
    }

    @DeleteMapping("/{id}")
    public String excluir(@PathVariable Long id) {
        casaService.deletarPorId(id);
        return "Casa Apagada com sucesso!";
    }
}