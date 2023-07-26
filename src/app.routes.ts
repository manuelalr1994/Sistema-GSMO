import { AuthModule } from "./auth/auth.module";
import { appsRoutes } from "./apps/apps.routes";

export const routes = [

  { path: 'auth', module: AuthModule },
  { path: 'apps', children: appsRoutes },

]
