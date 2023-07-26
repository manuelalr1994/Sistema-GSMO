import { Module } from '@nestjs/common';
import { AgriculturalFieldsModule } from './agricultural-fields/agricultural-fields.module';
import { CompaniesModule } from './companies/companies.module';
import { CrewmenModule } from './crewmen/crewmen.module';
import { CropsModule } from './crops/crops.module';
import { LaborsModule } from './labors/labors.module';
import { LocationsModule } from './locations/locations.module';
import { WeeksModule } from './weeks/weeks.module';


@Module({
    imports: [
        AgriculturalFieldsModule,
        CompaniesModule,
        CrewmenModule,
        CropsModule,
        LaborsModule,
        LocationsModule,
        WeeksModule,
    ],
})
export class SharedModule {}