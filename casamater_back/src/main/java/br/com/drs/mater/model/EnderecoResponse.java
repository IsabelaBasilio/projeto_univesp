package br.com.drs.mater.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnderecoResponse {
    private String cep;
    private String logradouro;
    private String complemento;
    private String bairro;
    private String localidade;
    private String estado;
}
