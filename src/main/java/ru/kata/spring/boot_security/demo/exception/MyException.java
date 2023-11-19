package ru.kata.spring.boot_security.demo.exception;


public class MyException extends RuntimeException{
    public MyException(String info) {
        super(info);
    }

}