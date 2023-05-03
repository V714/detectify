package com.detectify.detectify.model;

import com.detectify.util.JsonNodeConverter;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnTransformer;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "detectified")
public class Detectified {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "uuid", nullable = false)
  private UUID uuid;

  @Column(name = "path", nullable = false)
  private String path;

  @Column(name = "org_path", nullable = false)
  private String org_path;

  @ColumnTransformer(write = "?::jsonb")
  @Column(name = "results", columnDefinition = "jsonb")
  @Convert(converter = JsonNodeConverter.class)
  private JsonNode results;

  @ColumnTransformer(write = "?::jsonb")
  @Column(name = "counts", columnDefinition = "jsonb")
  @Convert(converter = JsonNodeConverter.class)
  private JsonNode counts;
}
