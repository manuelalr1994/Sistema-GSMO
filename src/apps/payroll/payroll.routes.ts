import { EmployeesModule } from './catalogs/employees/employees.module';
import { AgriculturalFieldsModule } from './catalogs/agricultural-fields/agricultural-fields.module';

export const payrollRoutes = [
    { path: 'employees', module: EmployeesModule },
    { path: 'agricultural-fields', module: AgriculturalFieldsModule },
];