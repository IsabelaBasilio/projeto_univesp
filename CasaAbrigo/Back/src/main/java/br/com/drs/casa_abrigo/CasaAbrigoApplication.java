package br.com.drs.casa_abrigo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class CasaAbrigoApplication {

    public static void main(String[] args) {
        SpringApplication.run(CasaAbrigoApplication.class, args);
    }

}
