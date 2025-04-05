package br.com.drs.mater.service;

import br.com.drs.mater.model.Entrega;
import br.com.drs.mater.model.Especiais;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class EspeciaisService extends GenericService<Especiais, Long> {
}
