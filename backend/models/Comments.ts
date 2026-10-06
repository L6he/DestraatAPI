import { Sequelize, DataTypes } from 'sequelize';

export default function WadModel(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const Users = sequelize.define(
        "User", {
            CommentID: { 
                type: dataTypes.UUIDV4 
            },
            CommentContent: {
                type: dataTypes.STRING
            },
            CommentListID: {
                type: dataTypes.STRING
            },
            CommentDate: {
                type: dataTypes.DATEONLY
            },
            CommentRepliesID: {
                type: dataTypes.STRING
            },
            WadID: {
                type: dataTypes.STRING
            },
            UserID: {
                type: dataTypes.STRING
            }
        }
    )
}