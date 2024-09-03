package com.example.login.service;



import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
@Service
public class JobTitleService {

    public List<String> getAllJobTitles() {
        // Return a static list of job titles
        return Arrays.asList(
                "CEO", "CFO", "COO", "CTO", "CIO",
                "Vice President", "Senior Manager", "Manager",
                "Team Lead", "Software Engineer",
                "Junior Engineer", "Intern"
        );
    }
}
