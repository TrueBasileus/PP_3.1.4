package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import javax.validation.Valid;
import java.security.Principal;


@Controller
@RequestMapping(value = "/admin")
public class AdminController {

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String showUsers(Principal principal, Model model) {
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("cuser", userService.findByEmail(principal.getName()));
        model.addAttribute("rols", roleService.findAll());
        model.addAttribute("nuser", new User());
        return "users";
    }

    @PostMapping("/update")
    public String updateUser(@Valid @ModelAttribute("user") User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "redirect:/admin";
        }
        userService.updateUser(user);
        return "redirect:/admin";
    }

    @PostMapping("/delete")
    public String deleteUser(@ModelAttribute("user") User user, Principal principal) {
        if (principal.getName().equals(user.getEmail())) {
            userService.removeUser(user);
            return "redirect:/logout";
        } else {
            userService.removeUser(user);
            return "redirect:/admin";
        }
    }

    @PostMapping("/new")
    public String createUser(@ModelAttribute("nuser") @Valid User user, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("rols", roleService.findAll());
            return "redirect:/admin";
        }
        userService.addUser(user);
        return "redirect:/admin";
    }
}
