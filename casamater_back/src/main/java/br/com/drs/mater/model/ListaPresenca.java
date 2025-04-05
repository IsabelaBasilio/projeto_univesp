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
@Table(name = "presenca")
public class ListaPresenca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mae;

    private String documento;

    private String crianca;

    private String nis;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate nascimento;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate entrada;

    private String reuniao01;

    private String reuniao02;

    private String reuniao03;
}
