package kz.kazniisa.sms.logic.controller;

import kz.kazniisa.sms.logic.model.AGSKDocumentType;
import kz.kazniisa.sms.logic.service.AGSKDocumentService;
import kz.kazniisa.sms.logic.service.AGSKDocumentTypeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

//@CrossOrigin(origins = { "http://localhost:3000" })
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class AGSKDocumentTypeController {

    private static Logger logger = LoggerFactory.getLogger(AGSKDocumentTypeController.class);

    @Autowired
    private AGSKDocumentTypeService agskDocumentTypeService;

    @Autowired
    private AGSKDocumentService agskDocumentService;

    @GetMapping("/agsk-document-types")
    public List<AGSKDocumentType> getAllDocumentTypes() {
        return agskDocumentTypeService.getAll();
    }

    @DeleteMapping("/agsk-document-types/{id}")
    public ResponseEntity<Void> deleteDocumentType(@PathVariable Long id) {

        AGSKDocumentType documentType = agskDocumentTypeService.delete(id);

        if (documentType != null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/agsk-document-types/{id}")
    public AGSKDocumentType getDocumentType(@PathVariable Long id) {
        return agskDocumentTypeService.findById(id);
    }

    @PutMapping("/agsk-document-types/{id}")
    public ResponseEntity<AGSKDocumentType> updateDocumentType(@PathVariable Long id, @RequestBody AGSKDocumentType documentType) {

        //logger.debug("PutMapping updateDocumentType " + id + " " + documentType.getCode() + " " + documentType.getName());

        AGSKDocumentType documentTypeUpdated = agskDocumentTypeService.save(documentType);

        return new ResponseEntity<AGSKDocumentType>(documentTypeUpdated, HttpStatus.OK);
    }

    @PostMapping("/agsk-document-types")
    public ResponseEntity<Void> createDocumentType(@RequestBody AGSKDocumentType documentType) {

        //logger.debug("PostMapping createDocumentType " + documentType.getCode() + " " + documentType.getName());

        AGSKDocumentType createdDocumentType = agskDocumentTypeService.save(documentType);

        // Location
        // Get current resource url
        /// {id}
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdDocumentType.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }
}
