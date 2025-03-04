package br.com.drs.casa_abrigo.repository;

import br.com.drs.casa_abrigo.model.Pessoa;
import org.springframework.data.repository.CrudRepository;

public interface PessoaRepository extends GenericRepository<Pessoa, Long> {
}
