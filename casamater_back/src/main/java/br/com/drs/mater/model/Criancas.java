package br.com.drs.mater.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "crianca")
public class Criancas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String atendido;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate nascimento;

    private String logradouro;

    private int numero;

    private String bairro;
}
