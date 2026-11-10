import express from "express";
import bcrypt from "bcrypt"; //npm install -D @types/bcrypt    Allikas: https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam
//installi bcrypt hiljem, siia tuleb hashing ka

const Utilities = {
    getBaseURL(req: express.Request): string {
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