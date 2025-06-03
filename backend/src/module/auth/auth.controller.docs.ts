import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';

export function AuthRegisterDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Registrar un usuario adoptante',
      description: 'Permite registrar a un usuario con el rol de Adoptante',
    }),
    ApiCreatedResponse({
      description: 'El usuario se registra exitosamente',
      example: {
        message: 'Usuario registrado exitosamente',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU2ZjIxZDY3LTZkNzMtNGM2YabcdefghiYyMjQ2OWMyNzQzNSIsImVtYWlsIjoianVhbkBleGFtcGxlLmNvbSIsInMyHeartiJhZG9wdGFudGUiLCJpYXQiOjE3NDYxMDc0NTEsImVaguasMTc0NjExNDY1MX0.RxSnt2VA-HK7zjSinJJtCa3jpbLeeJvN_cv6LH6qW00',
        user: {
          id: '562f7a0c-abcd-1234-bffb-78385972avds',
          fullname: 'John Doe',
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'El usuario ingresa un dato con un formato inválido',
      example: {
        message: [
          'La respuesta a ¿Que harás si la mascota destruye algo? es requerida',
          'La respuesta a ¿Que harás si la mascota destruye algo? debe ser una cadena de caracteres',
          'La respuesta a ¿Te comprometes a llevar a la mascota al veterinario? es requerida',
          'La respuesta a ¿Te comprometes a llevar a la mascota al veterinario? debe ser verdadero o falso',
          'La respuesta a ¿Permitirías recibir visitas de la fundación? es requerida',
          'La respuesta a ¿Permitirías recibir visitas de la fundación? debe ser verdadero o falso',
          'La respuesta a ¿Te comprometes a una adopción responsable? es requerida',
          'La respuesta a ¿Te comprometes a una adopción responsable? debe ser verdadero o falso',
        ],
        error: 'Bad Request',
        statusCode: 400,
      },
    }),
    ApiConflictResponse({
      description:
        'El correo electrónico o el documento de identidad ingresados por el usuario ya se encuentran registrados',
      example: {
        message: 'El correo electrónico ya se encuentra registrado',
        error: 'Conflict',
        statusCode: 409,
      },
    }),
  );
}

export function AuthLoginDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Inicio de sesión de usuarios',
      description:
        'Permite a todos los usuarios registrados iniciar sesión en la plataforma',
    }),
    ApiOkResponse({
      description: 'El usuario inicia sesión exitosamente',
      example: {
        message: 'Se ha iniciado sesión exitosamente',
        token:
          'eyJpZCI6ImEwNTIxYZE0LTk0OTItNDZkMy04MWVkLWJiYThjkhNiIsImVtYWlfghfghIjoiam9obkBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG9wdGFudGUiLCJpYXQiOjE3NDYwMzk5OTgsImV4cCI6MTc0NjA0NzE5OH0.7N7YNqVzblQ4kK5yy-5MdRiO_zhtur0oou1ar22_CfQ',
        user: {
          id: '562f7a0c-abcd-1234-bffb-78385972avds',
          fullname: 'John Doe',
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'El usuario ingresa un dato en un formato inválido',
      example: {
        message: 'Ingrese un correo electrónico válido',
        error: 'Bad Request',
        statusCode: 400,
      },
    }),
    ApiUnauthorizedResponse({
      description: 'El usuario ingresa credenciales inválidas',
      example: {
        message: 'Credenciales inválidas',
        error: 'Unauthorized',
        statusCode: 401,
      },
    }),
    ApiNotFoundResponse({
      description: 'El usuario ingresa un correo no registrado',
      example: {
        message: 'Usuario no encontrado',
        error: 'Not Found',
        statusCode: 404,
      },
    }),
  );
}

export function AuthRecoverPasswordDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Recuperar contraseña',
      description:
        'Permite que los usuarios que olvidaron su contraseña puedan recibir un enlace en su correo electrónico para crear una nueva contraseña',
    }),
    ApiOkResponse({
      description:
        'Se envía exitosamente a la bandeja de entrada del usuario el código y enlace para recuperar su contraseña',
      example: {
        message:
          'Te hemos enviado un correo con un enlace y un código para recuperar tu contraseña',
      },
    }),
    ApiNotFoundResponse({
      description: 'No se encuentra un usuario con el correo ingresado',
      example: {
        message: 'Usuario no encontrado',
        error: 'Not Found',
        statusCode: 404,
      },
    }),
    ApiTooManyRequestsResponse({
      description: 'El usuario hace muchas peticiones al endpoint',
      example: {
        statusCode: 429,
        message: 'ThrottlerException: Too Many Requests',
      },
    }),
  );
}

export function AuthResetPasswordDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear nueva contraseña',
      description:
        'Permite que los usuarios que olvidaron su contraseña puedan crear una nueva contraseña con el token de validación que reciben en el correo',
    }),
    ApiOkResponse({
      description: 'La contraseña del usuario es actualizada exitosamente',
      example: {
        message: 'Contraseña actualizada exitosamente',
      },
    }),
    ApiUnauthorizedResponse({
      description: 'El token del usuario es inválido o ha expirado',
      example: {
        message: 'Token inválido o expirado',
        error: 'Unauthorized',
        statusCode: 401,
      },
    }),
    ApiConflictResponse({
      description:
        'El usuario intenta actualizar su contraseña con la misma contraseña',
      example: {
        message: 'Su nueva contraseña debe ser distinta a la actual',
        error: 'Conflict',
        statusCode: 409,
      },
    }),
  );
}
