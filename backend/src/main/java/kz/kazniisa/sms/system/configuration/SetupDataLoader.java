package kz.kazniisa.sms.system.configuration;

import kz.kazniisa.sms.logic.dao.AGSKDocumentRepository;
import kz.kazniisa.sms.logic.model.AGSKDocument;
import kz.kazniisa.sms.logic.model.AGSKDocumentClass;
import kz.kazniisa.sms.logic.model.AGSKDocumentType;
import kz.kazniisa.sms.logic.model.AGSKTerm;
import kz.kazniisa.sms.logic.service.AGSKDocumentClassService;
import kz.kazniisa.sms.logic.service.AGSKDocumentService;
import kz.kazniisa.sms.logic.service.AGSKDocumentTypeService;
import kz.kazniisa.sms.logic.service.AGSKTermService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {

    private boolean alreadySetup = false;

    @Autowired
    private AGSKDocumentService agskDocumentService;

    @Autowired
    private AGSKTermService agskTermService;

    @Autowired
    private AGSKDocumentTypeService agskDocumentTypeService;

    @Autowired
    private AGSKDocumentClassService agskDocumentClassService;

    @Override
    @Transactional
    public void onApplicationEvent(final ContextRefreshedEvent event) {
        if (alreadySetup) {
            return;
        }

        // create initial Entities
//        createInitialAGSKDocumentTypes();
//        createInitialAGSKDocumentClasses();
//        createInitialAGSKDocuments();
//        createInitialAGSKTerms();

        alreadySetup = true;
    }

    @Transactional
    private void createInitialAGSKDocumentTypes() {
        List<AGSKDocumentType> documentTypes = agskDocumentTypeService.getAll();
        if (documentTypes.size() == 0) {
            for (short i = 1; i <= 20; i++)
                documentTypes.add(new AGSKDocumentType(i, "Это Тип № " + i + " АГСК документа"));

            agskDocumentTypeService.saveAll(documentTypes);
        }
    }

    @Transactional
    private void createInitialAGSKDocumentClasses() {
        List<AGSKDocumentClass> documentClasses = agskDocumentClassService.getAll();
        if (documentClasses.size() == 0) {
            documentClasses.add(new AGSKDocumentClass("обязательного характера"));
            documentClasses.add(new AGSKDocumentClass("добровольного применения"));
            documentClasses.add(new AGSKDocumentClass("действующая нормативная база"));
            documentClasses.add(new AGSKDocumentClass("новая нормативная база"));
            documentClasses.add(new AGSKDocumentClass("национальный документ"));
            documentClasses.add(new AGSKDocumentClass("межгосударственный документ"));

            documentClasses.add(new AGSKDocumentClass("стандарт"));
            documentClasses.add(new AGSKDocumentClass("иной документ"));
            documentClasses.add(new AGSKDocumentClass("отраслевой документ"));
            documentClasses.add(new AGSKDocumentClass("документ уполномоченного органа в области архитектуры, градостроительтсва и строительства"));
            documentClasses.add(new AGSKDocumentClass("предпроектная подготовка строительства"));
            documentClasses.add(new AGSKDocumentClass("строительство"));
            documentClasses.add(new AGSKDocumentClass("производство+испытание изделий"));

            documentClasses.add(new AGSKDocumentClass("эксплуатация"));
            documentClasses.add(new AGSKDocumentClass("ликвидация"));
            documentClasses.add(new AGSKDocumentClass("объекты производственного назначения (в том числе объекты гражданской обороны)"));
            documentClasses.add(new AGSKDocumentClass("гидротехнические объекты"));
        }

        agskDocumentClassService.saveAll(documentClasses);
    }

    @Transactional
    private void createInitialAGSKDocuments() {
        List<AGSKDocument> documents = agskDocumentService.getAll();
        if (documents.size() == 0) {

/*            for (long i = 1; i <= 20; i++) {
                AGSKDocument document = new AGSKDocument("V000000000" + i, "Это АГСК документ № " + i);
                document.setDocumentType(agskDocumentTypeService.findById(i));
                documentClassesSet.add(agskDocumentClassService.findById(i));
                document.setDocumentClasses(documentClassesSet);
                agskDocumentService.save(document);
            }
*/
            for (long i = 1; i <= 20; i++) {
                AGSKDocument document = new AGSKDocument("V000000000" + i, "Это АГСК документ № " + i);
                document.setNameKaz("Это\nдлинное наименование\nна казахском\nязыке");
                document.setDocumentType(agskDocumentTypeService.findById(i));
                Set<AGSKDocumentClass> documentClassesSet = new HashSet<>();
                for (long j = 1; j <= i; j++)
                    if (i != 1)
                        documentClassesSet.add(agskDocumentClassService.findById(j));
                document.setDocumentClasses(documentClassesSet);
                document.setDocCode("МСТ\n" +
                        " ГОСТ 21.113-88\n" +
                        " (изд. 2003) - " + i);
                if (i % 5 == 0)
                    document.setCancelled(true);
                documents.add(document);
            }

            agskDocumentService.saveAll(documents);
        }
    }

    @Transactional
    private void createInitialAGSKTerms() {
        List<AGSKTerm> terms = agskTermService.getAll();

        if (terms.size() == 0) {
            terms.add(new AGSKTerm(true));
            terms.add(new AGSKTerm(true));
            terms.add(new AGSKTerm(true));
            terms.add(new AGSKTerm(true));
            terms.add(new AGSKTerm(true));
            terms.add(new AGSKTerm(true));
        }

        agskTermService.saveAll(terms);
    }
}