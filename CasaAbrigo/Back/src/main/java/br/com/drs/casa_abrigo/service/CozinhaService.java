package br.com.drs.casa_abrigo.service;

import br.com.drs.casa_abrigo.model.Cozinha;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CozinhaService extends GenericService<Cozinha, Long>{
}
