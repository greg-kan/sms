package kz.kazniisa.sms.logic.dao;

import kz.kazniisa.sms.logic.model.AGSKTerm;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AGSKTermRepository  extends CrudRepository<AGSKTerm, Long> {
}
