package kz.kazniisa.sms.logic.dao;

import kz.kazniisa.sms.logic.model.AGSKDocumentClass;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AGSKDocumentClassRepository extends CrudRepository<AGSKDocumentClass, Long> {
}
