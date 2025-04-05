package br.com.drs.mater.controlller;

import br.com.drs.mater.model.Entrega;
import br.com.drs.mater.model.Programacao;
import br.com.drs.mater.repository.ProgramacaoRepository;
import br.com.drs.mater.service.ExcelProgramacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/programacao")
public class ProgramacaoController {

    @Autowired
    private ProgramacaoRepository programacaoRepository;
    @Autowired
    private ExcelProgramacaoService excelProgramacaoService;

    @PostMapping
    public String salvar(@RequestBody Programacao programacao) {
        programacaoRepository.save(programacao);
        return "Programação salva com sucesso!";
    }

    @GetMapping
    public List<Programacao> listarTodos() {
        return programacaoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Programacao> buscarPorId(@PathVariable Long id) {
        return programacaoRepository.findById(id);
    }

    @PutMapping("/{id}")
    public String atualizar(@PathVariable Long id, @RequestBody Programacao programacao) {
        programacao.setId(id);
        programacaoRepository.save(programacao);
        return "Programação atualizada com sucesso!";
    }

    @DeleteMapping("/{id}")
    public String excluir(@PathVariable Long id) {
        programacaoRepository.deleteById(id);
        return "Programação apagada cm sucesso!";
    }

    @PostMapping("/importar")
    public ResponseEntity<?> importarESalvarExcel() {
        try {
            List<Programacao> programacaoList = excelProgramacaoService.importarESalvarExcel();
            return ResponseEntity.ok(programacaoList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao processar os dados: " + e.getMessage());
        }
    }
}