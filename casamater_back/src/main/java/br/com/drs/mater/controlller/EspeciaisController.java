package br.com.drs.mater.controlller;

import br.com.drs.mater.model.Entrega;
import br.com.drs.mater.model.Especiais;
import br.com.drs.mater.service.EspeciaisService;
import br.com.drs.mater.service.ExcelEspeciaisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/especiais")
public class EspeciaisController {

    @Autowired
    private EspeciaisService especialService;
    @Autowired
    private ExcelEspeciaisService excelEspeciaisService;

    @PostMapping
    public String salvar(@RequestBody Especiais especiais) {
        especialService.salvar(especiais);
        return "Leite especial salvo com sucesso!";
    }

    @GetMapping
    public List<Especiais> listarTodos() {
        return especialService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Especiais> buscarPorId(@PathVariable Long id) {
        return especialService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public String atualizar(@PathVariable Long id, @RequestBody Especiais especiais) {
        especiais.setId(id);
        especialService.atualizar(especiais);
        return "Especiais atualizado com sucesso!";
    }

    @DeleteMapping("/{id}")
    public String excluir(@PathVariable Long id) {
        especialService.deletarPorId(id);
        return "Especiais excluido com sucesso!";
    }

    @PostMapping("/importar")
    public ResponseEntity<?> importarESalvarExcel() {
        try {
            List<Especiais> especiaisList = excelEspeciaisService.importarESalvarExcel();
            return ResponseEntity.ok(especiaisList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao processar os dados: " + e.getMessage());
        }
    }
}
