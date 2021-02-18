package kz.kazniisa.sms.logic.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Table(name="agsk_document_class") //Справочник классов документов
public class AGSKDocumentClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(name="name", nullable = false, unique = true)
    @NotNull
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AGSKDocumentClass() {
    }

    public AGSKDocumentClass(@NotNull String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AGSKDocumentClass)) return false;

        AGSKDocumentClass that = (AGSKDocumentClass) o;

        if (!id.equals(that.id)) return false;
        return name.equals(that.name);
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + name.hashCode();
        return result;
    }

    @JsonIgnore
    @ManyToMany(/*cascade = {CascadeType.PERSIST, CascadeType.MERGE},*//* fetch=FetchType.LAZY,*/ mappedBy = "documentClasses")
    private Set<AGSKDocument> documents;

    public Set<AGSKDocument> getDocuments() { return documents; }

    public void setDocuments(Set<AGSKDocument> documents) { this.documents = documents; }

}
