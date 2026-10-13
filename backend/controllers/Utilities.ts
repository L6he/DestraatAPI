import { Request } from "express";
import bcrypt from "bcrypt";
//installi bcrypt hiljem, siia tuleb hashing ka

const Utilities = {
    getBaseURL(req: Request): string {
        return `${req.protocol}://${req.get("host")}`;
    },
    async gimmePassword(password: string): Promise<string>  {
        return null; //hetkel
    }
}

export default Utilities;