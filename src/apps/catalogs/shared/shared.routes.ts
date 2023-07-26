import { AgriculturalFieldsModule } from './agricultural-fields/agricultural-fields.module';
import { CompaniesModule } from './companies/companies.module';
import { CrewmenModule } from './crewmen/crewmen.module';
import { CropsModule } from './crops/crops.module';
import { LaborsModule } from './labors/labors.module';
import { LocationsModule } from './locations/locations.module';
import { WeeksModule } from './weeks/weeks.module';

export const sharedRoutes = [

    { path: 'agricultural-fields', module: AgriculturalFieldsModule },
    { path: 'companies', module: CompaniesModule },
    { path: 'crewmen', module: CrewmenModule },
    { path: 'crops', module: CropsModule },
    { path: 'labors', module: LaborsModule },
    { path: 'locations', module: LocationsModule },
    { path: 'weeks', module: WeeksModule },
    
];