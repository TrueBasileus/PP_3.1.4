package ru.kata.spring.boot_security.demo.services;



import ru.kata.spring.boot_security.demo.entities.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    User getUserById(int id);

    User findByEmail(String email);

    void removeUser(User user);

    void updateUser(User user);

    void addUser(User user);

}
