package com.detectify.detectify.controller;

import com.detectify.detectify.model.Detectified;
import com.detectify.detectify.service.DetectifyService;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class DetectifyController {

  @Autowired
  private DetectifyService detectifyService;

  @PostMapping("/detectify")
  public ResponseEntity<?> Detectify(@RequestParam("file") MultipartFile file)
    throws IOException {
    return detectifyService.detectify(file);
  }

  @GetMapping("/detectified")
  public List<Detectified> getAllDetectified() {
    return detectifyService.getAllDetectified();
  }

  @GetMapping("/detectified/{uuid}")
  public Detectified getDetectified(@PathVariable UUID uuid) {
    return detectifyService.getDetectified(uuid);
  }
}
