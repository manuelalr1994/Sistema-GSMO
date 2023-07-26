import { catalogsRoutes } from "./catalogs/catalogs.routes";


export const appsRoutes = [

    { path: 'catalogs', children: catalogsRoutes },
    //{ path: 'process', children: processRoutes },

]