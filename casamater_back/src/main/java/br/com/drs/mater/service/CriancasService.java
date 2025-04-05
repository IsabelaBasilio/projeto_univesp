package br.com.drs.mater.service;

import br.com.drs.mater.model.Criancas;
import br.com.drs.mater.repository.CriancasRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class CriancasService extends GenericService<Criancas, Long> {

    private final CriancasRepository criancaRepository;

    public CriancasService(CriancasRepository criancasRepository) {
        this.criancaRepository = criancasRepository;
    }

    public List<Criancas> buscarPorAtendido(String atendido) {
        return criancaRepository.findByAtendido(atendido);
    }

    public void salvarTodos(List<Criancas> criancas) {
        if (criancas.isEmpty()) {
            System.out.println("Nenhum dado para salvar!");
            return;
        }
        System.out.println("Salvando " + criancas.size() + " crianças no banco...");
        criancaRepository.saveAll(criancas);
        System.out.println("Dados salvos com sucesso!");
    }

}