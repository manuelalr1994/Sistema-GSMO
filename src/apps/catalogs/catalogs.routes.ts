import { freightRoutes } from "./freight/freight.routes";
import { payrollRoutes } from "./payroll/payroll.routes";
import { sharedRoutes } from "./shared/shared.routes";


export const catalogsRoutes = [

    { path: 'freight', children: freightRoutes },
    { path: 'payroll', children: payrollRoutes },
    { path: 'shared', children: sharedRoutes },

]