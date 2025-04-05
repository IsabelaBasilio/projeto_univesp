package br.com.drs.mater.service;

import br.com.drs.mater.model.Medidas;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class MedidasService extends GenericService<Medidas, Long>{
}
