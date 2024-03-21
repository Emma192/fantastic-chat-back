import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants/jwt.constant';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
    ) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
       // El objeto context proporciona información
    // sobre la solicitud entrante y el entorno de ejecución.
    const request = context.switchToHttp().getRequest();
    console.log(request.headers.authorization);

    // Aquí puedes implementar tu lógica de autenticación o autorización.
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    // Por ejemplo, verificar si el usuario está autenticado, si tiene los roles adecuados, etc.
   try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request.user = payload;
      //validamos para asegurar que el email sea del usuario
      const user = this.userService.findOneByEmail(payload.email)
      if(user!){
        throw new UnauthorizedException();
      }
    } catch {
      throw new UnauthorizedException();
    }
    // Si la validación es exitosa, devuelve true, permitiendo el acceso.
    // Si la validación falla, devuelve false, denegando el acceso.

    return true; // o false, dependiendo de la lógica de tu guard.
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
