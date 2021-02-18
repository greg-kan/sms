package kz.kazniisa.sms.logic.dao;

import kz.kazniisa.sms.logic.model.AGSKDocumentType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AGSKDocumentTypeRepository extends CrudRepository<AGSKDocumentType, Long> {
    AGSKDocumentType findByCode(Short code);
}
