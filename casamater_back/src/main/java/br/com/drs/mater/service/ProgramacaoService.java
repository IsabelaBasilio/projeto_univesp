package br.com.drs.mater.service;

import br.com.drs.mater.model.Programacao;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ProgramacaoService extends GenericService<Programacao, Long> {
}
