package kz.kazniisa.sms.logic.service;

import kz.kazniisa.sms.logic.dao.AGSKDocumentFileRepository;
import kz.kazniisa.sms.logic.model.AGSKDocumentFile;
import kz.kazniisa.sms.system.dao.CommonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AGSKDocumentFileService {

    @Autowired
    private AGSKDocumentFileRepository repository;

//    @Autowired
//    private CommonRepository commonRepository;

    public AGSKDocumentFile save(AGSKDocumentFile documentFile) {
        repository.save(documentFile);
        return documentFile;
    }

//    public void saveAll(Set<AGSKDocumentFile> documentFiles) {
//        repository.saveAll(documentFiles);
//    }

    public AGSKDocumentFile findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public AGSKDocumentFile delete(Long id) {
        AGSKDocumentFile documentFile = repository.findById(id).orElse(null);

        if (documentFile == null)
            return null;

        repository.deleteById(id);

        return documentFile;
    }

    public AGSKDocumentFile delete(AGSKDocumentFile documentFile) {
        repository.delete(documentFile);
        return documentFile;
    }

    public void deleteAll(Set<AGSKDocumentFile> documentFiles) {
        repository.deleteAll(documentFiles);
    }

    public Set<AGSKDocumentFile> selectUnattachedFiles() {
        return repository.selectUnattachedFiles();
    }

    public void deleteUnattachedFiles() {
        repository.deleteUnattachedFiles();
    }
//    public boolean ifExists(Long val) {
//        return commonRepository.valueOfColumnInTableExists("agsk_document_file", "id", val);
//    }
}
