import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log('RolesGuard :>> roles validation');
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as undefined;

    return this.matchRoles(user);
  }

  private matchRoles(roles: any): boolean {
    console.log('roles matched => ', roles);
    return true;
  }
}
