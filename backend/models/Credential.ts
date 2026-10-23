import { DataTypes, Model } from "@sequelize/core";
import type { InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from "@sequelize/core";
import type { Json } from "sequelize/lib/utils";

export class Credential extends Model<InferAttributes<Credential>, InferCreationAttributes<Credential>> {
    //musthave
    declare UserID: string;
    
    //canhave
    declare id: CreationOptional<string>;
    declare Credentials: CreationOptional<Json>; //CreationOptional<string[]>; is also an option?
    declare UserType: CreationOptional<string>;

    //dbhave
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}
export default function initCredentialModel(sequelize: Sequelize) {
    Credential.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            UserID: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Credentials: {
                type: DataTypes.JSON
            },
            UserType: {
                type: DataTypes.STRING
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Credential",
        }
    );
    
    return Credential;
}