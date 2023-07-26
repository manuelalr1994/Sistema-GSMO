import { EmployeesModule } from './employees/employees.module';
import { StallsModule } from './stalls/stalls.module';

export const payrollRoutes = [

    { path: 'employees', module: EmployeesModule },
    { path: 'stalls', module: StallsModule },

];