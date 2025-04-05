package br.com.drs.mater.controlller;

import br.com.drs.mater.model.ListaPresenca;
import br.com.drs.mater.service.ExcelFrequenciaService;
import br.com.drs.mater.service.ListaPresencaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/presenca")
public class ListaPresencaControle {

    @Autowired
    private ListaPresencaService presencaService;
    @Autowired
    private ExcelFrequenciaService excelFrequenciaService;

    @PostMapping
    public String salvar(@RequestBody ListaPresenca listaPresenca) {
        presencaService.salvar(listaPresenca);
        return "Salvo com sucesso!";
    }

    @GetMapping
    public List<ListaPresenca> listarTodos() {
        return presencaService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<ListaPresenca> buscarPorId(@PathVariable Long id) {
        return presencaService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public String atualizar(@PathVariable Long id, @RequestBody ListaPresenca listaPresenca) {
        presencaService.atualizar(listaPresenca);
        return "Atualizado com sucesso!";
    }

    @DeleteMapping("/{id}")
    public String excluir(@PathVariable Long id) {
        presencaService.deletarPorId(id);
        return "Excluido com sucesso!";
    }

    @PostMapping("/importar")
    public ResponseEntity<?> importarESalvarExcel() {
        try {
            List<ListaPresenca> presencaList = excelFrequenciaService.importarESalvarExcel();
            return ResponseEntity.ok(presencaList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao processar os dados: " + e.getMessage());
        }
    }
}
