package kz.kazniisa.sms.logic.service;

import kz.kazniisa.sms.logic.dao.AGSKDocumentClassRepository;
import kz.kazniisa.sms.logic.model.AGSKDocumentClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AGSKDocumentClassService {
    @Autowired
    private AGSKDocumentClassRepository repository;

    public AGSKDocumentClass save(AGSKDocumentClass documentClass) {
        repository.save(documentClass);
        return documentClass;
    }

    public void saveAll(List<AGSKDocumentClass> documentClasses) {
        repository.saveAll(documentClasses);
    }

    public List<AGSKDocumentClass> getAll() {
        List<AGSKDocumentClass> result = new ArrayList<>();
        repository.findAll().forEach(result::add);
        return result;
    }

    public AGSKDocumentClass findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public AGSKDocumentClass delete(Long id) {
        AGSKDocumentClass documentClass = repository.findById(id).orElse(null);

        if (documentClass == null)
            return null;

        repository.deleteById(id);

        return documentClass;
    }

    public AGSKDocumentClass delete(AGSKDocumentClass documentClass) {
        repository.delete(documentClass);
        return documentClass;
    }
}
