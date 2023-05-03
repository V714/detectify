package com.detectify.detectify.repository;

import com.detectify.detectify.model.Detectified;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetectifyRepository
  extends JpaRepository<Detectified, String> {
  Detectified findByUuid(UUID uuid);
}
