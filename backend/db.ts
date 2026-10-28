import { Sequelize } from '@sequelize/core';
import { MariaDbDialect } from '@sequelize/mariadb';

//modelite pathid
import WadModel from "../backend/models/Wad.ts";
import UserModel from "../backend/models/User.ts";
import CredentialModel from "../backend/models/Credential.ts";
import OwnershipModel from "../backend/models/Ownership.ts";
import CommentModel from "../backend/models/Comment.ts";
import WadCommentsModel from "../backend/models/WadComments.ts";
import CategoryModel from "../backend/models/Category.ts";

//sequelizei andmebaasi ühendusanddmed
const sequelize = new Sequelize({
    dialect: MariaDbDialect,
    database: process.env.DB_NAME!,
    user: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    host: process.env.DB_HOSTNAME!,
    logging: console.log,
});

//ühendusmeetod
const connect = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("Connection established.");
    }
    catch (error)
    {
        console.log("db connection error", error);
        throw error;
    }
}

const _Wad = WadModel(sequelize); // the rename is still valid, because it's the default export, methinks
const _User = UserModel(sequelize);
const _Ownership = OwnershipModel(sequelize);
const _Comment = CommentModel(sequelize);
const _Credential = CredentialModel(sequelize);
const _WadComments = WadCommentsModel(sequelize);
const _Category = CategoryModel(sequelize);

//andmebaasi instants ja seostused
_User.hasMany(_Ownership, {foreignKey: "UserID"});
_Ownership.belongsTo(_User, {foreignKey: "UserID"});
const db = {
    Sequelize, 
    sequelize,
    comments: _Comment,
    credentials: _Credential,
    ownerships: _Ownership,
    users: _User,
    wads: _Wad,
    wadcomments: _WadComments,
    categories: _Category,
}; //compile with npx tsx db.ts

//sünkroonmeetod
const sync = async(): Promise<void> => {
    await sequelize.sync({alter:true})
    console.log("DB is synced")
}

//export
export {db, sync, connect}