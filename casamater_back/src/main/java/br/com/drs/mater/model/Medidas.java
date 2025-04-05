package br.com.drs.mater.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "medidas")
public class Medidas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String responsavel;

    private String crianca;

    private String nisMae;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate entrada;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate nascimento;

    private String mesAno;

    private Float peso;

    private Float estatura;

    private String observacao;
}
