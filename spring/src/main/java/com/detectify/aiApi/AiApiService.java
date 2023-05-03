package com.detectify.aiApi;

import com.detectify.detectify.model.Detectified;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AiApiService {

  @Value("${detectify.constant.ai.api.predict}")
  private String aiApiPredictUrl;

  public Detectified predictWithAiAPI(AiApiRequest request) {
    RestTemplate restTemplate = new RestTemplate();
    Detectified result = restTemplate.postForObject(
      aiApiPredictUrl,
      request.toMap(),
      Detectified.class
    );

    result.setUuid(request.getUuid());

    return result;
  }
}
