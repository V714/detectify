package com.detectify.aiApi;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;

abstract interface AiApiRequestInterface {
  String image_url = new String();
  UUID uuid = UUID.randomUUID();
  Map<String, Object> toMap();
}

@AllArgsConstructor
public class AiApiRequest implements AiApiRequestInterface {

  private String image_url;

  @Getter
  private UUID uuid;

  public Map<String, Object> toMap() {
    Map<String, Object> map = new HashMap<>();
    map.put("image_url", this.image_url);
    map.put("uuid", this.uuid);
    return map;
  }
}
