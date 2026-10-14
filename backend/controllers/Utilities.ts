import { Request } from "express";
import bcrypt from "bcrypt";
//installi bcrypt hiljem, siia tuleb hashing ka

const Utilities = {
    getBaseURL(req: Request): string {
        return `${req.protocol}://${req.get("host")}`;
    },
    async gimmePassword(password: string): Promise<string>  {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    },
    async letMeIn(
        givenPassword: string,
        givenHash: string
    ): Promise<boolean> {
        return await bcrypt.compare(givenPassword, givenHash);
    }
}

export default Utilities;