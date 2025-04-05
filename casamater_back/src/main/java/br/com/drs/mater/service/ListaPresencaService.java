package br.com.drs.mater.service;

import br.com.drs.mater.model.ListaPresenca;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ListaPresencaService extends GenericService<ListaPresenca, Long>{
}
