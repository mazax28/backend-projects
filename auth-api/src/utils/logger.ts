import pino from 'pino';

export const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty', // Hace que los logs sean más legibles en consola
    options: {
      colorize: true, // Agrega colores a los logs
    },
  },
  base :{
    pid: false,
},
});
