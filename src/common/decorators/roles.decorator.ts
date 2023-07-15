import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';

export const META_ROLES = 'roles';

export const Roles = (...roles: string[]) => {
    if (!Array.isArray(roles)) roles = [roles];

    roles = [];
    
    // Adjunta los roles dados a la metadata y aplica el guard
    return applyDecorators(
        SetMetadata(META_ROLES, roles),
        UseGuards( JwtGuard )
    )
}
