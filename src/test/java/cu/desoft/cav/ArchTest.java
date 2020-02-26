package cu.desoft.cav;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("cu.desoft.cav");

        noClasses()
            .that()
                .resideInAnyPackage("cu.desoft.cav.service..")
            .or()
                .resideInAnyPackage("cu.desoft.cav.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..cu.desoft.cav.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
