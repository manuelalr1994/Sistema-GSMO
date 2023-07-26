import { TrucksModule } from './trucks/trucks.module';
import { FreightCompanyModule } from './freight-company/freight-company.module';

export const freightRoutes = [

    { path: 'trucks', module: TrucksModule },
    { path: 'freight-company', module: FreightCompanyModule },

];