package kz.kazniisa.sms.logic.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="agsk_document")
public class AGSKDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(name="code", columnDefinition = "text", nullable = false, unique = true)
    @NotNull
    private String code;    //код документа вида V15T0003294

    @Column(name="doc_code", columnDefinition = "text")
    private String docCode; //шифр

    @Column(name="year")
    private String year; //Год документа

    @Column(name="page_count")
    private int pageCount; //Количество страниц документа

    @Column(name="complex")
    private float complex; //Комплекс типа 1.03

    @Column(name="name_rus", nullable = false, columnDefinition = "text")
    @NotNull
    private String nameRus;

    @Column(name="name_kaz", columnDefinition = "text")
    private String nameKaz;

    @Column(name="cancelled")
    private Boolean cancelled = false;

    @Column(name="attached_file_name")
    private String attachedFileName;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDocCode() {
        return docCode;
    }

    public void setDocCode(String docCode) {
        this.docCode = docCode;
    }

    public String getYear() { return year; }

    public void setYear(String year) { this.year = year; }

    public int getPageCount() { return pageCount; }

    public void setPageCount(int pageCount) { this.pageCount = pageCount; }

    public float getComplex() { return complex; }

    public void setComplex(float complex) { this.complex = complex; }

    public String getNameRus() {
        return nameRus;
    }

    public void setNameRus(String nameRus) {
        this.nameRus = nameRus;
    }

    public String getNameKaz() {
        return nameKaz;
    }

    public String getNameKazNotNull() {
        return nameKaz == null ? " " : nameKaz;
    }

    public void setNameKaz(String nameKaz) {
        this.nameKaz = nameKaz;
    }

    public Boolean getCancelled() { return cancelled; }

    public void setCancelled(Boolean cancelled) { this.cancelled = cancelled; }

    public String getAttachedFileName() { return attachedFileName; }

    public void setAttachedFileName(String attachedFileName) { this.attachedFileName = attachedFileName; }

    public AGSKDocument() {
    }

    public AGSKDocument(@NotNull String code, @NotNull String nameRus) {
        this.code = code;
        this.nameRus = nameRus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AGSKDocument)) return false;

        AGSKDocument document = (AGSKDocument) o;

        if (!id.equals(document.id)) return false;
        return code.equals(document.code);
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + code.hashCode();
        return result;
    }

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}/*, fetch=FetchType.LAZY*/)
    //@JoinColumn(name="type_id", columnDefinition = "smallint")
    @JoinColumn(name="type_id")
    private AGSKDocumentType documentType; //Тип 0..121 - ссылка на справочник типов AGSKDocumentType

    public AGSKDocumentType getDocumentType() {
        return documentType;
    }

    public void setDocumentType(AGSKDocumentType documentType) {
        this.documentType = documentType;
    }


    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE} /*,fetch=FetchType.LAZY*/)
    @JoinTable(name = "agsk_document_document_class",
               joinColumns = {@JoinColumn(name = "document_id")},
               inverseJoinColumns = @JoinColumn(name = "class_id"))

    private Set<AGSKDocumentClass> documentClasses;

    public Set<AGSKDocumentClass> getDocumentClasses() { return documentClasses; }

    public void setDocumentClasses(Set<AGSKDocumentClass> documentClasses) { this.documentClasses = documentClasses; }

//    public void dismissFile(AGSKDocumentFile file) {
//        this.documentFiles.remove(file);
//    }

//    @PreRemove
//    public void dismissFiles() {
//        this.documentFiles.forEach(file -> file.dismissDocument()); // SYNCHRONIZING THE OTHER SIDE OF RELATIONSHIP
//        this.documentFiles.clear();
//    }


    @OneToMany(cascade = {CascadeType.ALL}/*, fetch=FetchType.LAZY,*/ /*mappedBy="document"*/)
    @JoinColumn(name="document_id", referencedColumnName="id")
//    @OneToMany(cascade = {CascadeType.ALL}, /*fetch=FetchType.LAZY,*/ mappedBy = "document")

    private Set<AGSKDocumentFile> documentFiles = new HashSet<>(0);

    public Set<AGSKDocumentFile> getDocumentFiles() { return documentFiles; }

    public void setDocumentFiles(Set<AGSKDocumentFile> documentFiles) {
        this.documentFiles = documentFiles;
        //this.documentFiles.forEach(file -> file.setDocument(this));
    }

    @Transient
    private List<String> documentFilesList = new ArrayList<>(0);

    public List<String> getDocumentFilesList() {
        return documentFilesList;
    }

    public void setDocumentFilesList(List<String> documentFilesList) {
        this.documentFilesList = documentFilesList;
    }
}
