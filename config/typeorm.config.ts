import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = (): TypeOrmModuleOptions => {
    return {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,      
        autoLoadEntities: true,
        synchronize: true,
    };
};

export default getTypeOrmConfig;