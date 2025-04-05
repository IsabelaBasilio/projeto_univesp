package br.com.drs.mater.controlller;

import br.com.drs.mater.model.EnderecoResponse;
import br.com.drs.mater.service.CepService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/cep")
public class CepController {

    private final CepService cepService;

    public CepController(CepService cepService) {
        this.cepService = cepService;
    }

    @GetMapping("/{cep}")
    public EnderecoResponse buscarEndereco(@PathVariable String cep) {
        return cepService.buscarEnderecoPorCep(cep);
    }
}
