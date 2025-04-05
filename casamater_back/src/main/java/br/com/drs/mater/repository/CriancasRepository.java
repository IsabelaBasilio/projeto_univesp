package br.com.drs.mater.repository;

import br.com.drs.mater.model.Criancas;

import java.util.List;

public interface CriancasRepository extends GenericRepository<Criancas, Long>{
    List<Criancas> findByAtendido(String atendido);
}
