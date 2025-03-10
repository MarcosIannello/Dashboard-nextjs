/* eslint-disable @typescript-eslint/no-empty-object-type */
// nextauth.d.ts
import { DefaultUser } from "next-auth";


interface IUser extends DefaultUser {
    /**
     * Roles del usuario
     */
    roles?: string[];
    /**
     * Agregar cualquier otro campo que tu manejas
     */
}

declare module "next-auth" {
    interface User extends IUser { }

    interface Session {
        user?: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends IUser { }
}