import { Sequelize, DataTypes, UUIDV4 } from "sequelize";

export default function WadModel(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const Wad = sequelize.define(
        "Wad", {
            id: {
                type: dataTypes.UUIDV4
            },
            WadName: {
                type: dataTypes.STRING,
                allowNull: false
            },
            WadDescription: {
                type: dataTypes.TEXT,
                allowNull: false
            },
            ReleaseDate: {
                type: dataTypes.DATEONLY,
                allowNull: false
            },
            ImageURL: {
                type: dataTypes.STRING
            },
            Comments: {
                type: dataTypes.ARRAY(dataTypes.STRING)
            },
            CategoryID: {
                type: dataTypes.STRING,
                allowNull: false
            }
        }
    )
    console.log(Wad === sequelize.models.Wad);
}