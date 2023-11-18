package ru.kata.spring.boot_security.demo.exception;


public class MyException {

    private String info;

    public MyException() {
    }

    public MyException(String info) {
        this.info = info;
    }

    public String getInfo() {
        return info;
    }
}