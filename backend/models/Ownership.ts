import { DataTypes, Model } from "@sequelize/core";
import type { InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from "@sequelize/core";
import type { Json } from "sequelize/lib/utils";

export class Ownership extends Model<InferAttributes<Ownership>, InferCreationAttributes<Ownership>> {
    // musthave
    declare OwnershipName: string;
    declare WadIDs: Json;
    declare UserID: string;

    // canhave
    declare id: CreationOptional<string>;
    declare OwnershipDescription: CreationOptional<string | null>;

    // dbhave
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}
export default function initOwnershipModel(sequelize: Sequelize) {
    Ownership.init(
        {
            id: { 
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            OwnershipName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            OwnershipDescription: {
                type: DataTypes.STRING,
                allowNull: true
            },
            WadIDs: {
                type: DataTypes.JSON,
                allowNull: false
            },
            UserID: {
                type: DataTypes.UUID,
                allowNull: false
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Ownership",
        }
    );
    
    return Ownership;
}