import {Sequelize, DataTypes} from 'sequelize';

//modelite pathid
import WadModel from "../backend/models/Wad.ts";
import UserModel from "../backend/models/User.ts";
import CredentialModel from "../backend/models/Credential.ts";
import WadCommentsModel from "../backend/models/WadComments.ts";
import { foreignKey } from 'drizzle-orm/gel-core';
import CommentModel from './models/Comment.ts';


//sequelizei andmebaasi ühendusanddmed
const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USERNAME!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOSTNAME!,
        dialect: "mariadb",
        logging: console.log,
    }
);

//ühendusmeetod
const connect = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("Connection established.");
    }
    catch (error)
    {
        console.error("db connection error", error)
    }
}
const _Wad = WadModel(sequelize, DataTypes)
const _User = UserModel(sequelize, DataTypes)
const _WadComments = WadCommentsModel(sequelize, DataTypes)
const _Comments = CommentModel(sequelize, DataTypes)
const _Credentials = CredentialModel(sequelize, DataTypes)



//andmebaasi instants ja seostused
_User.hasMany(_WadComments, {foreignKey: "WadId" as "WadCommentsId"})
_WadComments.belongsTo(_User ,{foreignKey: "WadId" as "Wad"})

const db = {
    Sequelize, 
    sequelize,
    wads: _Wad,
    users: _User,
    // comments: require("../backend/models/Comment.ts")(sequelize, DataTypes),
    // credentials: require("../backend/models/Credential.ts")(sequelize, DataTypes),
    comments: _Comments,
    credentials: _Credentials, 
    wadComments: _WadComments
};


// db.wadComments = require("../backend/models/WadComments.ts")(sequelize, DataTypes, db.wads, db.comments)
// db.wads.belongsToMany(db.comments,{through: db.wadComments, as: "CommentId"});
// db.users.belongsTo(db.wads, {through: db.wadComments, as: "WadId"});

// db.users.hasMany(db.wadComments, {foreignKey: "WadId" as "WadComments"});
// db.wadComments.BelongsTo(db.users, {foreignKey:"WadId" as "CommentListId"});

//sünkroonmeetod
const sync = async(): Promise<void> => {
    await sequelize.sync({alter:true})
    console.log("DB is synced")
}

//export
export {db, sync, connect}