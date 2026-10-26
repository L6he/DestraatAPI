import { DataTypes, Model } from "@sequelize/core";
import type { InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from "@sequelize/core";
import type { Json } from "sequelize/lib/utils";

export class WadComments extends Model<InferAttributes<WadComments>, InferCreationAttributes<WadComments>> {
    // musthave
    declare WadCommentsTitle: string;
    declare WadID: string;
    declare UserID: string;

    // canhave
    declare id: CreationOptional<string>;
    declare WadCommentsContent: CreationOptional<string | null>;
    declare Wads: CreationOptional<Json | null>;

    // dbhave
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}
export default function initWadCommentsModel(sequelize: Sequelize) {
    WadComments.init(
        {
            id: { 
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            WadCommentsTitle: {
                type: DataTypes.STRING,
                allowNull: false
            },
            WadCommentsContent: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Wads: {
                type: DataTypes.JSON,
            },
            WadID: {
                type: DataTypes.UUID, //maybe these ids should be strings
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
            modelName: "WadComments",
        }
    );
    
    return WadComments;
}

