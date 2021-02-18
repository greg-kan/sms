package kz.kazniisa.sms.logic.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="agsk_document_file") //Файл документа на диске

public class AGSKDocumentFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(name="file_path", nullable = false)
    @NotNull
    private String filePath;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getFilePath() { return filePath;  }

    public void setFilePath(String filePath) { this.filePath = filePath; }

    public AGSKDocumentFile() {
    }

    public AGSKDocumentFile(@NotNull String filePath) {
        this.filePath = filePath;
    }

    public AGSKDocumentFile(@NotNull String filePath, Long documentId) {
        this.filePath = filePath;
        this.documentId = documentId;
        //this.document = document;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AGSKDocumentFile)) return false;

        AGSKDocumentFile that = (AGSKDocumentFile) o;

        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        int result = id == null ? 0 : id.hashCode();
        result = 31 * result + filePath.hashCode();
        return result;
    }


//    public void dismissDocument() {
//        this.document.dismissFile(this); //SYNCHRONIZING THE OTHER SIDE OF RELATIONSHIP
//        this.document = null;
//    }
//
//    @JsonIgnore
//    @ManyToOne
//    @JoinColumn(name="document_id"/*, nullable=false*/)
//    //@NotNull
//    private AGSKDocument document;
//
//    public AGSKDocument getDocument() { return document; }
//
//    public void setDocument(AGSKDocument document) { this.document = document; }

    @Column(name = "document_id")
    private Long documentId;

    public Long getDocumentId() {
        return documentId;
    }

    public void setDocumentId(Long documentId) {
        this.documentId = documentId;
    }
//  ToDo we can add file type

}
