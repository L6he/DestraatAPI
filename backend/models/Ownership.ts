import { Sequelize, DataTypes } from 'sequelize';

export default function OwnershipModel(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const Ownership = sequelize.define(
        "Ownership", {
            id: { 
                type: dataTypes.UUIDV4,
                primaryKey: true
            },
            OwnershipName: {
                type: dataTypes.STRING,
                allowNull: false
            },
            OwnershipDescription: {
                type: dataTypes.STRING,
                allowNull: true
            },
            //foreign keys, not yet implemented
            Wads: {
                type: dataTypes.ARRAY(dataTypes.STRING)
            },
            WadID: { //not yet in the erd, TODO: either remove this or update the erd to include it
                type: dataTypes.ARRAY(dataTypes.UUID),
                allowNull: false
            },
            UserID: {
                type: dataTypes.UUID,
                allowNull: false
            },
        }
    )
    console.log(Ownership === sequelize.models.Ownership);
    return Ownership;
}