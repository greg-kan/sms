package kz.kazniisa.sms.logic.service;

import kz.kazniisa.sms.logic.dao.AGSKDocumentTypeRepository;
import kz.kazniisa.sms.logic.model.AGSKDocumentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AGSKDocumentTypeService {
    @Autowired
    private AGSKDocumentTypeRepository repository;

    public AGSKDocumentType save(AGSKDocumentType documentType) {
        repository.save(documentType);
        return documentType;
    }

    public void saveAll(List<AGSKDocumentType> documentTypes) {
        repository.saveAll(documentTypes);
    }

    public List<AGSKDocumentType> getAll() {
        List<AGSKDocumentType> result = new ArrayList<>();
        repository.findAll().forEach(result::add);
        return result;
    }

    public AGSKDocumentType findById(Long id) {
        return repository.findById(id).orElse(null);
    }
    public AGSKDocumentType findByCode(Short code) { return repository.findByCode(code); }

    public AGSKDocumentType delete(Long id) {
        AGSKDocumentType documentType = repository.findById(id).orElse(null);

        if (documentType == null)
            return null;

        repository.deleteById(id);

        return documentType;
    }

    public AGSKDocumentType delete(AGSKDocumentType documentType) {
        repository.delete(documentType);
        return documentType;
    }
}
