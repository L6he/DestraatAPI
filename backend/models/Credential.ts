import { Sequelize, DataTypes, UUIDV4 } from "sequelize";

export default function CredentialModel(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const Credential = sequelize.define(
        "Credential", {
            id: {
                type: dataTypes.UUIDV4
            },
            UserID: {
                type: dataTypes.STRING,
                allowNull: false
            },
            Credentials: {
                type: dataTypes.ARRAY(dataTypes.STRING)
            },
            UserType: {
                type: dataTypes.STRING
            }
        }
    )
    console.log(Credential === sequelize.models.Credential);
    return Credential;
}