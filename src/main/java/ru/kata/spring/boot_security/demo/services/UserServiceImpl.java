package ru.kata.spring.boot_security.demo.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.exception.MyException;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;


import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, @Lazy PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserById(int id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public User findByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new EntityNotFoundException();
        }
        return user;
    }

    @Override
    @Transactional
    public void removeUser(User user) {
        userRepository.deleteById(userRepository.findById(user.getId()).orElseThrow(EntityNotFoundException::new).getId());
    }

    @Override
    @Transactional
    public void updateUser(User user) {
        if (userRepository.findAllByEmail(user.getEmail()).size() > 1 ) {
            throw new MyException("Данный email занят");
        }
        if (!passwordEncoder.matches(passwordEncoder.encode(user.getPassword()), userRepository.findById(user.getId()).orElseThrow(EntityNotFoundException::new).getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void addUser(User user) {
        if (!userRepository.findAllByEmail(user.getEmail()).isEmpty()) {
            throw new MyException("Данный email занят");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

    }
}
