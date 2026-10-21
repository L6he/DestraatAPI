import { Sequelize, DataTypes, UUIDV4 } from "sequelize";

export default function WadCommentsModel(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const WadComments = sequelize.define(
        "WadComments", {
            id: {
                type: dataTypes.UUIDV4
            },
            WadID: {
                type: dataTypes.UUIDV4
            },
            UserID: {
                type: dataTypes.STRING,
                allowNull: false
            },
            Comment: {
                type: dataTypes.ARRAY(dataTypes.STRING)
            },
            WadCommentsName: {
                type: dataTypes.STRING
            },
            WadCommentsDescription: {
                type: dataTypes.STRING
            }
        }
    )
    console.log(WadComments === sequelize.models.WadComments);
    return WadComments
}