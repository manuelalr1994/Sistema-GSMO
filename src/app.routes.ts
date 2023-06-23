import { freightRoutes } from "./apps/freight/freight.routes";
import { payrollRoutes } from "./apps/payroll/payroll.routes";
import { authRoutes } from "./auth/auth.routes";

export const routes = [
    {
      path: 'freight',
      children: freightRoutes
    },
    {
      path: 'payroll',
      children: payrollRoutes
    },
    {
      path: 'auth',
      children: authRoutes
    },
]
