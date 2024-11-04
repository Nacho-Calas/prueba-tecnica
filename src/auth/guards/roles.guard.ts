import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from 'src/database/enums/role.enum';
import { ROLES_KEY } from "../decorators/roles.decorators";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user.toObject();

        return matchRoles(requiredRoles, user.role);
    }
}

function matchRoles(requiredRoles: string[], userRoles: string): boolean {
    return requiredRoles.some((role: string) => userRoles?.includes(role));
}