package com.detectify.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@ControllerAdvice
public class RestExceptionHandler {

  @ExceptionHandler(MaxUploadSizeExceededException.class)
  public ResponseEntity<Object> handleMaxUploadSizeExceededException(
    MaxUploadSizeExceededException e
  ) {
    return ResponseEntity.badRequest().body("Maximum upload size exceeded!");
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Object> handleIllegalArgumentException(
    IllegalArgumentException e
  ) {
    return ResponseEntity.badRequest().body("Invalid file!");
  }

  @ExceptionHandler(value = { ExternalApiException.class })
  protected ResponseEntity<Object> handleExternalApiException(
    ExternalApiException ex
  ) {
    String message = ex.getMessage();
    return ResponseEntity
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .body(message);
  }
}
