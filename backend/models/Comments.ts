import { Sequelize, DataTypes } from 'sequelize';

export default function WadModel(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const Users = sequelize.define(
        "User", {
            id: dataTypes.UUIDV4
        }
    )
}