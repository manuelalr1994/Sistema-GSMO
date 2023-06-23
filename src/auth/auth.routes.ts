import { AuthModule } from './users/auth/auth.module';
import { RolesModule } from './users/roles/roles.module';
import { MailsModule } from './mails/mails.module';

export const authRoutes = [
    { path: 'users', module: AuthModule },
    { path: 'roles', module: RolesModule },
    { path: 'mails', module: MailsModule },
];