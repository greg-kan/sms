package kz.kazniisa.sms.logic.service;

import kz.kazniisa.sms.logic.dao.AGSKDocumentRepository;
import kz.kazniisa.sms.logic.dao.AGSKDocumentTypeRepository;
import kz.kazniisa.sms.logic.model.AGSKDocument;
import kz.kazniisa.sms.logic.model.AGSKDocumentType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AGSKDocumentService {

    private static Logger logger = LoggerFactory.getLogger(AGSKDocumentService.class);

    @Autowired
    private AGSKDocumentRepository repository;

    @Autowired
    private AGSKDocumentTypeRepository typeRepository;

    public AGSKDocument save(AGSKDocument document) {
        repository.save(document);
        return document;
    }

    public void saveAll(List<AGSKDocument> documents) {
        repository.saveAll(documents);
    }

    public List<AGSKDocument> getAll() {
        List<AGSKDocument> result = new ArrayList<>();
        repository.findAll().forEach(result::add);
        return result;
    }

//    public List<AGSKDocument> getFiltered(long documentTypeId) {
//        List<AGSKDocument> result = new ArrayList<>();
//        AGSKDocumentType agskDocumentType = typeRepository.findById(documentTypeId).orElse(null);
//        result.addAll(repository.findByDocumentType(agskDocumentType));
//        return result;
//    }

    public List<AGSKDocument> getMultiFiltered(AGSKDocument documentAttributes) {
        List<AGSKDocument> result = new ArrayList<>();

        if (documentAttributes == null) {
            repository.findAll().forEach(result::add);
        } else {
            Long typeId = documentAttributes.getId();//actually, type.id in this, not an document.id (from frontend)

            if (typeId == -1) {
                repository.findAll().forEach(result::add);
            } else {
                AGSKDocumentType agskDocumentType = typeRepository.findById(typeId).orElse(null);
                result.addAll(repository.findByDocumentType(agskDocumentType));
            }

//          String code = documentAttributes.getCode().toLowerCase();
//          if (!code.equals("")) {
//              result = result.stream().filter(p -> p.getCode().toLowerCase().contains(code)).collect(Collectors.toList());
//          }

//          String nameRus = documentAttributes.getNameRus().toLowerCase();
//          if (!nameRus.equals("")) {
//              result = result.stream().filter(p -> p.getNameRus().toLowerCase().contains(nameRus)).collect(Collectors.toList());
//          }

            String nameKaz = documentAttributes.getNameKaz().toLowerCase();
            //logger.debug(nameKaz);
            if (!nameKaz.equals("")) {
                result = result.stream().filter(p -> p.getNameKazNotNull().toLowerCase().contains(nameKaz)).collect(Collectors.toList());
            }

//          String docCode = documentAttributes.getDocCode().toLowerCase();
//          if (!docCode.equals("")) {
//              result = result.stream().filter(p -> p.getDocCode().toLowerCase().contains(docCode)).collect(Collectors.toList());
//          }

            Boolean cancelled = documentAttributes.getCancelled();
            if (cancelled)
                result = result.stream().filter(p -> p.getCancelled().equals(cancelled)).collect(Collectors.toList());

        }
        return result;
    }

    public AGSKDocument findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public AGSKDocument findByCode(String code) {
        return repository.findByCode(code);
    }

    public AGSKDocument delete(Long id) {
        AGSKDocument document = repository.findById(id).orElse(null);

        if (document == null)
            return null;

        repository.deleteById(id);

        return document;
    }

    public AGSKDocument delete(AGSKDocument document) {
        repository.delete(document);
        return document;
    }

}

