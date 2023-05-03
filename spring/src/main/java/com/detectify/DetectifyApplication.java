package com.detectify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = { "com.detectify.detectify.model" })
@EnableJpaRepositories(basePackages = { "com.detectify.detectify.repository" })
public class DetectifyApplication {

  public static void main(String[] args) {
    SpringApplication.run(DetectifyApplication.class, args);
  }
}
