import { freightRoutes } from "./apps/freight/freight.routes";
import { payrollRoutes } from "./apps/payroll/payroll.routes";
import { AuthModule } from "./auth/auth.module";

export const routes = [

  {
    path: 'auth',
    module: AuthModule
  },
  {
    path: 'freight',
    children: freightRoutes
  },
  {
    path: 'payroll',
    children: payrollRoutes
  },

]
