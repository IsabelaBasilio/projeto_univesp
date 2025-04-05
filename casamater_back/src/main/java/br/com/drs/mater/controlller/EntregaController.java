package br.com.drs.mater.controlller;

import br.com.drs.mater.model.Entrega;
import br.com.drs.mater.model.ListaPresenca;
import br.com.drs.mater.service.EntregaService;
import br.com.drs.mater.service.ExcelEntregaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/entrega")
public class EntregaController {

    @Autowired
    private EntregaService entregaService;
    @Autowired
    private ExcelEntregaService excelEntregaService;

    @PostMapping
    public String salvar(@RequestBody Entrega entrega) {
        entregaService.salvar(entrega);
        return "Entrega salva com sucesso!";
    }

    @GetMapping
    public List<Entrega> listarTodos() {
        return entregaService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Entrega> buscarPorId(@PathVariable Long id) {
        return entregaService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public String atualizar(@PathVariable Long id, @RequestBody Entrega entrega) {
        entrega.setId(id);
        entregaService.atualizar(entrega);
        return "Entrega atualizada com sucesso!";
    }

    @DeleteMapping("/{id}")
    public String excluir(@PathVariable Long id) {
        entregaService.deletarPorId(id);
        return "Entrega apagada com sucesso!";
    }

    @PostMapping("/importar")
    public ResponseEntity<?> importarESalvarExcel() {
        try {
            List<Entrega> entregaList = excelEntregaService.importarESalvarExcel();
            return ResponseEntity.ok(entregaList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao processar os dados: " + e.getMessage());
        }
    }
}