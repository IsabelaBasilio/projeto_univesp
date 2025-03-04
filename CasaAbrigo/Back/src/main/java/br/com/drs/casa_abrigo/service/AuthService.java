package br.com.drs.casa_abrigo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Value("${app.security.username}")
    private String appUsername;

    @Value("${app.security.password}")
    private String appPassword;

    public boolean validarLogin(String username, String password) {
        return appUsername.equals(username) && appPassword.equals(password);
    }
}
