package com.detectify.detectify.service;

import com.detectify.aiApi.AiApiRequest;
import com.detectify.aiApi.AiApiService;
import com.detectify.detectify.model.Detectified;
import com.detectify.detectify.repository.DetectifyRepository;
import com.detectify.exceptions.ExternalApiException;
import com.detectify.util.ConvertImageToWebp;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DetectifyService {

  @Autowired
  private AiApiService aiApiService;

  @Value("${detectify.constant.imgs.directory}")
  private String imgsPath;

  public ResponseEntity<?> detectify(MultipartFile file) throws IOException {
    Map<String, UUID> response = new HashMap<>();

    UUID uuid = UUID.randomUUID();
    response.put("uuid", uuid);

    String fileName = uuid.toString() + ".webp";
    String imagePath = imgsPath + fileName;
    boolean saved = ConvertImageToWebp.convert(imagePath, file);

    if (!saved) throw new RuntimeException("Failed to write .webp file.");

    AiApiRequest aiRequest = new AiApiRequest(imagePath, uuid);

    try {
      Detectified result = aiApiService.predictWithAiAPI(aiRequest);
      this.saveNew(result);
      return ResponseEntity.ok(response);
    } catch (Exception ex) {
      throw new ExternalApiException(
        "AI API returned error. Please contact website administrator."
      );
    }
  }

  @Autowired
  private DetectifyRepository detectifyRepository;

  public Detectified getDetectified(UUID uuid) {
    return detectifyRepository.findByUuid(uuid);
  }

  public List<Detectified> getAllDetectified() {
    return detectifyRepository.findAll();
  }

  public Detectified saveNew(Detectified detectified) {
    return detectifyRepository.save(detectified);
  }
}
