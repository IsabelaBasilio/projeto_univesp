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
@Table(name = "programacao")
public class Programacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String responsavel;

    private String crianca;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate nascimento;

    private String nis;

    private String assinatura;
}
