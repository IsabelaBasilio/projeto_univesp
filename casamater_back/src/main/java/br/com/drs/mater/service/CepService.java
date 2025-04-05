package br.com.drs.mater.service;

import br.com.drs.mater.model.EnderecoResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CepService {

    private static final String VIA_CEP_URL = "https://viacep.com.br/ws/{cep}/json/";

    public EnderecoResponse buscarEnderecoPorCep(String cep) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(VIA_CEP_URL, EnderecoResponse.class, cep);
    }
}

