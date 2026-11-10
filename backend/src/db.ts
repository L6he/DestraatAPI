import { Sequelize } from '@sequelize/core';
import { MariaDbDialect } from '@sequelize/mariadb';

//modelite pathid
import WadModel from "#/models/Wad.js";
import UserModel from "#/models/User.js";
import CredentialModel from "#/models/Credential.js";
import OwnershipModel from "#/models/Ownership.js";
import CommentModel from "#/models/Comment.js";
import WadCommentsModel from "#/models/WadComments.js";
import CategoryModel from "#/models/Category.js";

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