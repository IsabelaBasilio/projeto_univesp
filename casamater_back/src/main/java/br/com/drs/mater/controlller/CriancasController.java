package br.com.drs.mater.controlller;

import br.com.drs.mater.model.Criancas;
import br.com.drs.mater.service.CriancasService;
import br.com.drs.mater.service.ExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/crianca")
public class CriancasController {

    @Autowired
    private CriancasService criancaService;

    @Autowired
    private ExcelService excelService;

    @PostMapping
    public ResponseEntity<String> salvar(@RequestBody Criancas criancas) {
        criancaService.salvar(criancas);
        return ResponseEntity.ok("Criança " + criancas.getAtendido() + " salva com sucesso!");
    }

    @GetMapping
    public List<Criancas> listarTodos() {
        return criancaService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Criancas> buscarPorId(@PathVariable Long id) {
        return criancaService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> atualizar(@PathVariable Long id, @RequestBody Criancas criancas) {
        criancaService.atualizar(criancas);
        return ResponseEntity.ok("Crianca " + criancas.getAtendido() + " atualizada com sucesso!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluir(@PathVariable Long id, @RequestBody Criancas criancas) {
        criancaService.deletarPorId(id);
        return ResponseEntity.ok("Crianca apagada com sucesso!");
    }

    @PostMapping("/buscar")
    public List<Criancas> buscarPorAtendido(@RequestBody Criancas criancas) {
        return criancaService.buscarPorAtendido(criancas.getAtendido());
    }

    @PostMapping("/importar")
    public ResponseEntity<?> importarESalvarExcel() {
        try {
            List<Criancas> criancasList = excelService.importarESalvarExcel();
            return ResponseEntity.ok(criancasList);  // Retorna os dados importados e salvos
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao processar os dados: " + e.getMessage());
        }
    }
}
