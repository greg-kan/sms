package kz.kazniisa.sms.logic.controller;

import kz.kazniisa.sms.logic.model.AGSKDocumentClass;
import kz.kazniisa.sms.logic.service.AGSKDocumentClassService;
import kz.kazniisa.sms.logic.service.AGSKDocumentService;
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
public class AGSKDocumentClassController {

    @Autowired
    private AGSKDocumentClassService agskDocumentClassService;

    @Autowired
    private AGSKDocumentService agskDocumentService;

    @GetMapping("/agsk-document-classes")
    public List<AGSKDocumentClass> getAllDocumentClasses() {
        return agskDocumentClassService.getAll();
    }

    @DeleteMapping("/agsk-document-classes/{id}")
    public ResponseEntity<Void> deleteDocumentClass(@PathVariable Long id) {

        AGSKDocumentClass documentClass = agskDocumentClassService.delete(id);

        if (documentClass != null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/agsk-document-classes/{id}")
    public AGSKDocumentClass getDocumentClass(@PathVariable Long id) {
        return agskDocumentClassService.findById(id);
    }

    @PutMapping("/agsk-document-classes/{id}")
    public ResponseEntity<AGSKDocumentClass> updateDocumentClass(@PathVariable Long id, @RequestBody AGSKDocumentClass documentClass) {

        AGSKDocumentClass documentClassUpdated = agskDocumentClassService.save(documentClass);

        return new ResponseEntity<AGSKDocumentClass>(documentClassUpdated, HttpStatus.OK);
    }

    @PostMapping("/agsk-document-classes")
    public ResponseEntity<Void> createDocumentClass(@RequestBody AGSKDocumentClass documentClass) {
        AGSKDocumentClass createdDocumentClass = agskDocumentClassService.save(documentClass);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdDocumentClass.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
}
