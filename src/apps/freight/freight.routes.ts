import { TrucksModule } from './catalogs/trucks/trucks.module';
import { AgriculturalFieldsModule } from './catalogs/agricultural-fields/agricultural-fields.module';

export const freightRoutes = [
    { path: 'trucks', module: TrucksModule },
    { path: 'agricultural-fields', module: AgriculturalFieldsModule },
];