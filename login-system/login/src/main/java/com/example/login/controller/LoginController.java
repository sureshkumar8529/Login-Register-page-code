package com.example.login.controller;

import com.example.login.model.LoginRequest;
import com.example.login.model.User;
import com.example.login.repository.UserRepository;
import com.example.login.service.JobTitleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
@Validated
public class LoginController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    private final JobTitleService jobTitleService;

    public LoginController(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, JobTitleService jobTitleService, JobTitleService jobTitleService1) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jobTitleService = jobTitleService;
    }

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        System.out.println("Received registration request: " + user);
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"message\":\"Username already exists\"}");
        }

        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\":\"User registered successfully\"}");
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request) {
        System.out.println("Received login request: " + request);
        User existingUser = userRepository.findByUsername(request.getUsername());



        if (existingUser != null && passwordEncoder.matches(request.getPassword(), existingUser.getPassword())) {
            // Here you can return additional details like a JWT token, user info, etc.
            return ResponseEntity.ok("{\"message\":\"Login successful\"}");
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\":\"Invalid credentials\"}");
    }
    @GetMapping(value = "/job-titles", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> getJobTitles() {
        // Create a static list of job titles
        List<String> jobTitles = Arrays.asList(
                "CEO", "CFO", "COO", "CTO", "CIO",
                "Vice President", "Senior Manager", "Manager",
                "Team Lead", "Software Engineer",
                "Junior Engineer", "Intern"
        );

        // Create the response map
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Job titles retrieved successfully");
        response.put("jobTitles", jobTitles);

        return ResponseEntity.ok(response);
    }


}
