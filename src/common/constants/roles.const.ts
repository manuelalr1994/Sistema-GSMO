export type Role = {
    id: number;
    name: string;
}

export enum ROLES {
    ADMIN = 'ADMINISTRADOR',
    SUPER_USER = 'SUPER_USUARIO',
    PACKAGING = 'EMPAQUE',
    OFFICE = 'OFICINA',
    USER = 'USUARIO',
};

export const ROLES_BY_ID = {
    1: ROLES.ADMIN,
    2: ROLES.SUPER_USER,
    3: ROLES.PACKAGING,
    4: ROLES.OFFICE,
    5: ROLES.USER,
}
