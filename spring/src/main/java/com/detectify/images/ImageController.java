package com.detectify.images;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/image")
public class ImageController {

  @Value("${detectify.constant.imgs.directory}")
  private String imgsPath;

  @GetMapping("/original/{uuid}")
  public ResponseEntity<byte[]> getOriginalImage(@PathVariable UUID uuid)
    throws IOException {
    String imagePath = imgsPath + uuid + ".webp";
    Path file = Paths.get(imagePath);
    byte[] imageBytes = Files.readAllBytes(file);
    return ResponseEntity
      .ok()
      .contentType(MediaType.parseMediaType("image/webp"))
      .body(imageBytes);
  }

  @GetMapping("/predicted/{uuid}")
  public ResponseEntity<byte[]> getPredictedImage(@PathVariable UUID uuid)
    throws IOException {
    String imagePath = imgsPath + uuid + "_pred.webp";
    Path file = Paths.get(imagePath);
    byte[] imageBytes = Files.readAllBytes(file);
    return ResponseEntity
      .ok()
      .contentType(MediaType.parseMediaType("image/webp"))
      .body(imageBytes);
  }
}
