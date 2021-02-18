package kz.kazniisa.sms.logic.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name="agsk_document_type") //Справочник типов документов
public class AGSKDocumentType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "code", nullable = false, unique = true)
    @NotNull
    private Short code; //код типа 0..121

    @Column(name="name")
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getCode() {
        return code;
    }

    public void setCode(Short code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AGSKDocumentType() {
    }

    public AGSKDocumentType(@NotNull Short code, String name) {
        this.code = code;
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AGSKDocumentType)) return false;

        AGSKDocumentType that = (AGSKDocumentType) o;

        if (!id.equals(that.id)) return false;
        return code.equals(that.code);
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + code.hashCode();
        return result;
    }

    @JsonIgnore
    @OneToMany(/*cascade = {CascadeType.PERSIST, CascadeType.MERGE},*/
               /*fetch=FetchType.LAZY,*/ mappedBy="documentType")
    private Set<AGSKDocument> documents;

    public Set<AGSKDocument> getDocuments() { return documents; }

    public void setDocuments(Set<AGSKDocument> documents) { this.documents = documents; }
}
