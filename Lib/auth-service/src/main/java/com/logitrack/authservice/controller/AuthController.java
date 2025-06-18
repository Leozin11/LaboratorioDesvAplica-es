package com.logitrack.authservice.controller;

import com.logitrack.authservice.model.User;
import com.logitrack.authservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> payload) {
        Optional<User> user = authService.authenticate(payload.get("email"), payload.get("password"));
        return user.isPresent() ? "Login bem-sucedido" : "Credenciais inválidas";
    }
}
