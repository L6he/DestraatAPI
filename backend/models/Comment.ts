import { Sequelize, DataTypes } from 'sequelize';

export default function CommentModel(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const Comments = sequelize.define(
        "Comment", {
            CommentID: { 
                type: dataTypes.UUIDV4 
            },
            CommentContent: {
                type: dataTypes.STRING,
                allowNull: false
            },
            CommentListID: {
                type: dataTypes.UUIDV4
            },
            CommentDate: {
                type: dataTypes.DATEONLY,
                allowNull: false
            },
            CommentRepliesID: {
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