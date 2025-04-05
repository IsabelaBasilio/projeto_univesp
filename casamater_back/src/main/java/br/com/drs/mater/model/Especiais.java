package br.com.drs.mater.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "especiais")
public class Especiais {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipoLeite;

    private String gramas;

    private int inicial;

    private int janeiro;

    private int fevereiro;

    private int marco;

    private int abril;

    private int maio;

    private int junho;

    private int julho;

    private int agosto;

    private int setembro;

    private int outubro;

    private int novembro;

    private int dezembro;

    private int total;

    private String ano;
}
