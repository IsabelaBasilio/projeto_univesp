package br.com.drs.mater;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class MaterApplication {

    public static void main(String[] args) {
        SpringApplication.run(MaterApplication.class, args);
    }

}
