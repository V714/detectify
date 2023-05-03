package com.detectify.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry
      .addMapping("/**") // dodajemy mapping dla wszystkich endpointów
      .allowedOrigins("*") // ustawiamy, że każdy adres może korzystać z naszej aplikacji
      .allowedMethods("GET", "POST", "DELETE") // ustawiamy dozwolone metody HTTP
      .allowedHeaders("*"); // ustawiamy dozwolone nagłówki HTTP
  }
}
