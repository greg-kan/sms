package kz.kazniisa.sms.logic.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Properties;

//@CrossOrigin(origins = { "http://localhost:3000" })
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping(path = "/files")
public class FilesUploadDownloadController {
    private static Logger logger = LoggerFactory.getLogger(FilesUploadDownloadController.class);

    //private Properties props = null;


    @Value("${File.Storage}")
    private String fileStoragePath;

//    private static Properties readProperties() {
//        Properties props = new Properties();
//        Path myPath = Paths.get("D:/projects/sms/backend/src/main/resources/application.properties");
//        try {
//            BufferedReader bf = Files.newBufferedReader(myPath, StandardCharsets.UTF_8);
//            props.load(bf);
//            logger.error("readProperties(): " + props.toString());
//        } catch (IOException ex) {
//            logger.error("readProperties() error: " + ex.getMessage());
//        }
//        return props;
//    }

    @RequestMapping(path = "/upload", method = RequestMethod.POST)
    public ResponseEntity  handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam("fileType") String fileType) {
        //props = readProperties();
        //fileStoragePath = props.getProperty("File.Storage");
        //logger.error("Upload: File Storage Path = " + fileStoragePath);
        try {
            //System.out.printf("File name=%s, size=%s\n", file.getOriginalFilename(), file.getSize());
            //System.out.printf("File type=%s\n", fileType);
            File fileToSave = new File(fileStoragePath + file.getOriginalFilename());
            file.transferTo(fileToSave);
        } catch (IOException ioe) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok().build();
    }


//    @GetMapping("/downloadFile/{fileName:.+}")
//    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
//        // Load file as Resource
//        Resource resource = fileStorageService.loadFileAsResource(fileName);
//
//        // Try to determine file's content type
//        String contentType = null;
//        try {
//            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
//        } catch (IOException ex) {
//            logger.info("Could not determine file type.");
//        }
//
//        // Fallback to the default content type if type could not be determined
//        if(contentType == null) {
//            contentType = "application/octet-stream";
//        }
//
//        return ResponseEntity.ok()
//                .contentType(MediaType.parseMediaType(contentType))
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
//                .body(resource);
//    }

//    @GetMapping("/agsk-documents/{id}")
//    public AGSKDocument getDocument(@PathVariable long id) {
//    return agskDocumentService.findById(id);
//}


    @RequestMapping(path = "/download/{fileName}", method = RequestMethod.GET)
    public ResponseEntity handleFileDownload(@PathVariable String fileName) {
        //System.out.printf("File name=%s\n", fileName);
        //props = readProperties();
        //fileStoragePath = props.getProperty("File.Storage");
        //logger.error("Download: Full name = " + fileStoragePath + fileName);
        try {
            File file = new File(fileStoragePath + fileName);
            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
            //logger.error("Normal return");
            return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(file.length())
                .body(resource);

        } catch (IOException ioe) {
            //logger.error("Error return");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
