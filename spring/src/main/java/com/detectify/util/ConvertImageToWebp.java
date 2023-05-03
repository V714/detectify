package com.detectify.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import org.springframework.web.multipart.MultipartFile;

public class ConvertImageToWebp {

  public static boolean convert(String filePath, MultipartFile file)
    throws IOException {
    byte[] bytes = file.getBytes();
    BufferedImage image = ImageIO.read(new ByteArrayInputStream(bytes));
    File output = new File(filePath);
    return ImageIO.write(image, "webp", output);
  }
}
