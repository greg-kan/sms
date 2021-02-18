package kz.kazniisa.sms.logic.service;

import kz.kazniisa.sms.logic.dao.AGSKTermRepository;
import kz.kazniisa.sms.logic.model.AGSKDocument;
import kz.kazniisa.sms.logic.model.AGSKTerm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AGSKTermService {
    @Autowired
    private AGSKTermRepository repository;

    public AGSKTerm save(AGSKTerm term) {
        repository.save(term);
        return term;
    }

    public void saveAll(List<AGSKTerm> terms) {
        repository.saveAll(terms);
    }

    public List<AGSKTerm> getAll() {
        List<AGSKTerm> result = new ArrayList<>();
        repository.findAll().forEach(result::add);
        return result;
    }

    public AGSKTerm findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public AGSKTerm delete(Long id) {
        AGSKTerm term = repository.findById(id).orElse(null);

        if (term == null)
            return null;

        repository.deleteById(id);

        return term;
    }

    public AGSKTerm delete(AGSKTerm term) {
        repository.delete(term);
        return term;
    }

}
