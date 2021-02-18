package kz.kazniisa.sms.logic.controller;

import kz.kazniisa.sms.logic.model.AGSKDocument;
import kz.kazniisa.sms.logic.model.AGSKDocumentFile;
import kz.kazniisa.sms.logic.service.AGSKDocumentFileService;
import kz.kazniisa.sms.logic.service.AGSKDocumentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

//@CrossOrigin(origins = { "http://localhost:3000" })
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class AGSKDocumentController {

    private static Logger logger = LoggerFactory.getLogger(AGSKDocumentController.class);

    @Autowired
    private AGSKDocumentService agskDocumentService;

    @Autowired
    private AGSKDocumentFileService agskDocumentFileService;

    @GetMapping("/agsk-documents")
    public List<AGSKDocument> getAllDocuments() { return agskDocumentService.getAll(); }

    @GetMapping("/agsk-documents/{id}")
    public AGSKDocument getDocument(@PathVariable long id) { return agskDocumentService.findById(id); }

    @DeleteMapping("/agsk-documents/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable long id) {

        AGSKDocument document = agskDocumentService.delete(id);

        if (document != null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/agsk-documents/{id}")
    public ResponseEntity<AGSKDocument> updateDocument(@PathVariable long id,
                                                       @RequestBody AGSKDocument document) {

//        Set<AGSKDocumentFile> agskDocumentFiles = agskDocumentService.findById(id).getDocumentFiles();
//        agskDocumentFileService.deleteAll(agskDocumentFiles);
//        agskDocumentFiles.clear();

        Set<AGSKDocumentFile> agskDocumentFiles = new HashSet<>();
        for (String str : document.getDocumentFilesList() ) {
            agskDocumentFiles.add(new AGSKDocumentFile(str, id));
            //agskDocumentFiles.add(new AGSKDocumentFile(str, document));
        }

        document.setDocumentFiles(agskDocumentFiles);
        AGSKDocument documentUpdated = agskDocumentService.save(document);

        Set<AGSKDocumentFile> unattachedFiles = agskDocumentFileService.selectUnattachedFiles();
        agskDocumentFileService.deleteAll(unattachedFiles);

        return new ResponseEntity<>(documentUpdated, HttpStatus.OK);
    }

    @PostMapping("/agsk-documents")
    public ResponseEntity<Void> createDocument(@RequestBody AGSKDocument document) {

        Set<AGSKDocumentFile> agskDocumentFiles = new HashSet<>();
        for (String str : document.getDocumentFilesList() ) {
            AGSKDocumentFile agskDocumentFile = new AGSKDocumentFile(str);
            agskDocumentFiles.add(agskDocumentFile);
        }

        document.setDocumentFiles(agskDocumentFiles);
        AGSKDocument createdDocument = agskDocumentService.save(document);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(createdDocument.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }

    @PostMapping("/agsk-documents/filter")
    public List<AGSKDocument> getMultiFilteredDocuments(@RequestBody AGSKDocument documentAttributes) {
        return agskDocumentService.getMultiFiltered(documentAttributes);
    }

}


