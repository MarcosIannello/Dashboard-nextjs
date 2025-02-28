# Development

pasos para levantar app en desarrollo:

1. levantar base de datos

```
docker compose up -d
```

2. crear nueva copia del .env.template y renombrarla a .env
3. Reemplazar variables de entorno
4. Ejecutar npm i
5. ejecutar npm run dev para levantar el proyecto
6. ejecutar una migracion de prisma (EN PRISMA COMMANDS)
```
npx prisma migrate dev
npx prisma generate 
```
7. Ejecutar seed para crear la bd local 'http://localhost:3000/api/seed'

## Nota: 
Usuario test: testing@gmail.com
password: 123456

# PRISMA COMMANDS

```
npx prisma init
npx prisma migrate dev
npx prisma generate 
```

# Prod

# Stage