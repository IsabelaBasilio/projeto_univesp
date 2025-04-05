package br.com.drs.mater.service;

import br.com.drs.mater.model.Entrega;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class EntregaService extends GenericService<Entrega, Long> {
}
