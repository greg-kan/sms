package kz.kazniisa.sms.logic.model;

import javax.persistence.*;

@Entity
@Table(name="agsk_term")
public class AGSKTerm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(name="main")
    private Boolean main = true;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getMain() {
        return main;
    }

    public void setMain(Boolean main) {
        this.main = main;
    }

    public AGSKTerm() {
    }

    public AGSKTerm(Boolean main) {
        this.main = main;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AGSKTerm)) return false;

        AGSKTerm agskTerm = (AGSKTerm) o;

        return id.equals(agskTerm.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}
