package com.example.login.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;


@Entity
@Table(name = "\"user\"")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email(message = "Username must be a valid email address")
    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[@#$%^&+=]).{8,}$", message = "Password must contain at least one number, one special character, and be at least 8 characters long")
    private String password;

     // Job Title name (e.g., CEO, CFO, VP, etc.)

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Location is required")
    private String location;


    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[1-9]\\d{9}$", message = "Mobile number must be 10 digits long without country code")
    private String mobileNumber;


    @NotBlank(message = "TitleName must not be blank")
    private String titleName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @Email(message = "Username must be a valid email address") @NotBlank(message = "Username is required") String getUsername() {
        return username;
    }

    public void setUsername(@Email(message = "Username must be a valid email address") @NotBlank(message = "Username is required") String username) {
        this.username = username;
    }

    public @NotBlank(message = "Password is required") @Size(min = 8, message = "Password must be at least 8 characters long") @Pattern(regexp = "^(?=.*[0-9])(?=.*[@#$%^&+=]).{8,}$", message = "Password must contain at least one number, one special character, and be at least 8 characters long") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "Password is required") @Size(min = 8, message = "Password must be at least 8 characters long") @Pattern(regexp = "^(?=.*[0-9])(?=.*[@#$%^&+=]).{8,}$", message = "Password must contain at least one number, one special character, and be at least 8 characters long") String password) {
        this.password = password;
    }

    public @NotBlank(message = "First name is required") String getFirstName() {
        return firstName;
    }

    public void setFirstName(@NotBlank(message = "First name is required") String firstName) {
        this.firstName = firstName;
    }

    public @NotBlank(message = "Last name is required") String getLastName() {
        return lastName;
    }

    public void setLastName(@NotBlank(message = "Last name is required") String lastName) {
        this.lastName = lastName;
    }

    public @NotBlank(message = "Location is required") String getLocation() {
        return location;
    }

    public void setLocation(@NotBlank(message = "Location is required") String location) {
        this.location = location;
    }

    public @NotBlank(message = "Mobile number is required") @Pattern(regexp = "^[1-9]\\d{9}$", message = "Mobile number must be 10 digits long without country code") String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(@NotBlank(message = "Mobile number is required") @Pattern(regexp = "^[1-9]\\d{9}$", message = "Mobile number must be 10 digits long without country code") String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public @NotBlank(message = "TitleName must not be blank") String getTitleName() {
        return titleName;
    }

    public void setTitleName(@NotBlank(message = "TitleName must not be blank") String titleName) {
        this.titleName = titleName;
    }
}

