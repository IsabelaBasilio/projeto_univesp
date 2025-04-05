package br.com.drs.mater.controlller;

import br.com.drs.mater.model.ListaPresenca;
import br.com.drs.mater.model.Medidas;
import br.com.drs.mater.service.ExcelMedidasService;
import br.com.drs.mater.service.MedidasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/medidas")
public class MedidasController {

    @Autowired
    private MedidasService medidasService;
    @Autowired
    private ExcelMedidasService excelMedidasService;

    @PostMapping
    public String salvar(@RequestBody Medidas medidas) {
        medidasService.salvar(medidas);
        return "Medidads salvas com sucesso!";
    }

    @GetMapping
    public List<Medidas> listarTodos() {
        return medidasService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Medidas> pesquisarPorId(@PathVariable Long id) {
        return medidasService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public String atualizar(@PathVariable Long id, @RequestBody Medidas medidas) {
        medidas.setId(id);
        medidasService.atualizar(medidas);
        return "Medidad atualizada com sucesso!";
    }

    @DeleteMapping("/{id}")
    public String excluir(@PathVariable Long id) {
        medidasService.deletarPorId(id);
        return "Medidas apagadas com sucesso!";
    }

    @PostMapping("/importar")
    public ResponseEntity<?> importarESalvarExcel() {
        try {
            List<Medidas> medidasList = excelMedidasService.importarESalvarExcel();
            return ResponseEntity.ok(medidasList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao processar os dados: " + e.getMessage());
        }
    }
}
