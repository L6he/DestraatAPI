import { Sequelize, DataTypes } from 'sequelize';

export default function OwnershipModel(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const Ownership = sequelize.define(
        "Ownership", {
            OwnershipID: { 
                type: dataTypes.UUIDV4 
            },
            WadID: {
                type: dataTypes.UUIDV4
            },
            UserID: {
                type: dataTypes.UUIDV4
            }
        }
    )
}