package kz.kazniisa.sms.logic.dao;

import kz.kazniisa.sms.logic.model.AGSKDocument;
import kz.kazniisa.sms.logic.model.AGSKDocumentType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AGSKDocumentRepository extends CrudRepository<AGSKDocument, Long> {
    AGSKDocument findByCode(String code);
    List<AGSKDocument> findByDocumentType(AGSKDocumentType agskDocumentType);
}
