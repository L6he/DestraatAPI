import { DataTypes, Model } from "sequelize";
//npm install sequelize        //i on shorthand install-iks
import type { InferAttributes, InferCreationAttributes, CreationOptional, Sequelize, IntegerDataType } from "sequelize";

export class Wad extends Model<InferAttributes<Wad>, InferCreationAttributes<Wad>> {
    // Kohustuslikud väljad uue WAD-i loomisel:
    declare WadName: string;
    declare WadDescription: string;
    declare ReleaseDate: Date;
    declare CategoryID: string;

    // Valikulised väljad uue WAD-i loomisel (kuna neil on vaikeväärtus või nad on nullitavad):
    declare id: CreationOptional<string>;
    declare ImageURL: CreationOptional<string>;
    declare Downloads: CreationOptional<number>;
    declare Comments: CreationOptional<string>;
}
export default function initWadModel(sequelize: Sequelize) {
    Wad.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            WadName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            WadDescription: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            ReleaseDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            ImageURL: {
                type: DataTypes.STRING
            },
            Downloads: {
                type: DataTypes.INTEGER
            },
            Comments: {
                type: DataTypes.JSON //list
            },
            CategoryID: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            sequelize,
            modelName: "Wad",
        }
    );
    
    return Wad;
}