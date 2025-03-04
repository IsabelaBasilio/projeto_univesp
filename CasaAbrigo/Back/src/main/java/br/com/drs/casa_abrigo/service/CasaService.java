package br.com.drs.casa_abrigo.service;

import br.com.drs.casa_abrigo.model.Casa;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CasaService extends GenericService<Casa, Long>{
}
