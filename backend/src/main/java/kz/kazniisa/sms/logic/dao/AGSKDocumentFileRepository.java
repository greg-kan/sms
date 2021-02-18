package kz.kazniisa.sms.logic.dao;


import kz.kazniisa.sms.logic.model.AGSKDocumentFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface AGSKDocumentFileRepository extends JpaRepository<AGSKDocumentFile, Long> {

    @Query(value = "select * from agsk_document_file f where f.document_id is null", nativeQuery = true)
    Set<AGSKDocumentFile> selectUnattachedFiles();

    @Modifying
    @Query(value = "delete from agsk_document_file f where f.document_id is null", nativeQuery = true)
    void deleteUnattachedFiles();

//    @Query(value = "delete from agsk_document_file f where f.id = ?1", nativeQuery = true)


//    @Query(value = "SELECT u FROM User u WHERE u.name IN :names")
//    List<User> findUserByNameList(@Param("names") Collection<String> names);
}

