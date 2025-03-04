package br.com.drs.casa_abrigo.service;

import br.com.drs.casa_abrigo.model.Quarto;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class QuartoService extends GenericService<Quarto, Long>{
}
