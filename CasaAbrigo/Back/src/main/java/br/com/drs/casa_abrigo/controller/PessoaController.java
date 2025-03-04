package br.com.drs.casa_abrigo.controller;

import br.com.drs.casa_abrigo.model.Pessoa;
import br.com.drs.casa_abrigo.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pessoa")
public class PessoaController {

    @Autowired
    private PessoaRepository pessoaRepository;

    @PostMapping
    public String salvar(@RequestBody Pessoa pessoa) {
        pessoaRepository.save(pessoa);
        return "Pessoa salva com sucesso!";
    }

    @GetMapping
    public List<Pessoa> listarTodos() {
        return pessoaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Pessoa> buscarPorId(@PathVariable Long id) {
        return pessoaRepository.findById(id);
    }

    @PutMapping("/{id}")
    public String atualizar(@PathVariable Long id, @RequestBody Pessoa pessoa) {
        pessoa.setId(id);
        pessoaRepository.save(pessoa);
        return "Pessoa atualizada com sucesso!";
    }

    @DeleteMapping("/{id}")
    public String apagar(@PathVariable Long id) {
        pessoaRepository.deleteById(id);
        return "Pessoa apagada com sucesso!";
    }
}
