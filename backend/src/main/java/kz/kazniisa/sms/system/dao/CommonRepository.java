package kz.kazniisa.sms.system.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;

@Repository
public class CommonRepository {
    @Autowired
    private EntityManagerFactory entityManagerFactory;

    public boolean valueOfColumnInTableExists(String table, String column, Long value) {

        final StringBuilder builder = new StringBuilder();
        builder.append("select 1 from ").append(table).append(" where ").append(column).append(" = :value");
        String sql = builder.toString();

        EntityManager session = entityManagerFactory.createEntityManager();

        try {
            session.createNativeQuery(sql).setParameter("value", value).getSingleResult();
            return true;
        } catch (NoResultException e) {
            return false;
        } finally {
            if (session.isOpen()) session.close();
        }
    }
}