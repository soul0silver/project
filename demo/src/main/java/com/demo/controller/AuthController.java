package com.demo.controller;

import com.demo.Principle.UserPrinciple;
import com.demo.baserespon.BaseRespon;
import com.demo.baserespon.JwtResponse;
import com.demo.baserespon.MyRespon;
import com.demo.config.JwtProvider;
import com.demo.model.LoginForm;
import com.demo.model.SignForm;
import com.demo.model.User;
import com.demo.model.UserDTO;
import com.demo.password.IPasswordResetService;
import com.demo.password.PasswordResetRequest;
import com.demo.password.PasswordResetToken;
import com.demo.service.implement.RoleServiceImp;
import com.demo.service.implement.UserServiceImp;

import org.hibernate.internal.util.StringHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.nio.file.attribute.UserPrincipal;
import java.util.Random;
import java.util.UUID;


@RestController
@RequestMapping(value = "/auth")
public class AuthController {

    @Autowired
    UserServiceImp userServiceImp;
    @Autowired
    RoleServiceImp roleServiceImp;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtProvider jwtProvider;
    @Autowired
    IPasswordResetService passwordResetService;
    @Autowired
    JavaMailSender javaMailSender;

    @PostMapping("/save")
    public ResponseEntity<?> register(@RequestBody SignForm signForm) {
        MyRespon myRespon = new MyRespon();
        if (userServiceImp.existsByUsername(signForm.getUsername())) {
            myRespon.setMessage("The user is already used! Try again!");
            return new ResponseEntity<>(myRespon.getMessage(), HttpStatus.OK);
        }
        if (userServiceImp.existsByEmail(signForm.getEmail())) {
            myRespon.setMessage("The email is already used! Try again!");
            return new ResponseEntity<>(myRespon.getMessage(), HttpStatus.OK);
        }
        User user = new User(signForm.getUsername(), signForm.getPassword(), signForm.getEmail());
        userServiceImp.save(user, signForm.getRid());
        myRespon.setMessage("create user success");
        return new ResponseEntity<>(myRespon.getMessage(), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginForm loginForm) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginForm.getUsername(), loginForm.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);
        UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
        return ResponseEntity.ok(new JwtResponse(userPrincipal.getUsername(), token, userPrincipal.getAuthorities()));
    }
    @PostMapping(value = "/forget-password")
    public String forgotPass(@RequestBody PasswordResetRequest resetRequest, HttpServletRequest request) {
        String token = "";
        String passResetLink = "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
        User user = userServiceImp.findByEmail(resetRequest.getEmail());
        if (userServiceImp.existsByEmail(resetRequest.getEmail()))
            token += new Random().nextLong(100000,1000000);
        passwordResetService.generatePassReset(user, token);
        SimpleMailMessage message=new SimpleMailMessage();
        message.setTo("aloalo1981998@gmail.com");
        message.setSubject("Click to reset your password");
        message.setText((passResetLink + "/auth/reset-password?token=" + token));
        javaMailSender.send(message);
        return (passResetLink + "/auth/reset-password?token=" + token);
    }
    @PostMapping(value = "/reset-password")
    public ResponseEntity<?> resetPass(@RequestBody PasswordResetRequest request, @RequestParam("token") String token){
        if (!passwordResetService.validateToken(token).equalsIgnoreCase("valid"))
            return ResponseEntity.ok("Invalid password reset token");
        User user= passwordResetService.findByToken(token);
        if (user!= null)
            userServiceImp.resetPassword(user,request.getPassword());
        return ResponseEntity.ok("password reset successfully");

    }

}