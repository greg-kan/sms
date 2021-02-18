package kz.kazniisa.sms.logic.controller;

import kz.kazniisa.sms.logic.model.AGSKTerm;
import kz.kazniisa.sms.logic.service.AGSKTermService;
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
public class AGSKTermController {

    @Autowired
    private AGSKTermService agskTermService;

    @GetMapping("/agsk-terms")
    public List<AGSKTerm> getAllTerms() {
        return agskTermService.getAll();
    }

    @DeleteMapping("/agsk-terms/{id}")
    public ResponseEntity<Void> deleteTerm(@PathVariable long id) {

        AGSKTerm term = agskTermService.delete(id);

        if (term != null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/agsk-terms/{id}")
    public AGSKTerm getTerm(@PathVariable long id) {
        return agskTermService.findById(id);
    }

    @PutMapping("/agsk-terms/{id}")
    public ResponseEntity<AGSKTerm> updateTerm(@PathVariable long id, @RequestBody AGSKTerm term) {

        AGSKTerm termUpdated = agskTermService.save(term);

        return new ResponseEntity<AGSKTerm>(termUpdated, HttpStatus.OK);
    }

    @PostMapping("/agsk-terms")
    public ResponseEntity<Void> createTerm(@RequestBody AGSKTerm term) {

        AGSKTerm createdTerm = agskTermService.save(term);

        // Location
        // Get current resource url
        /// {id}
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTerm.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }    
}
