import { Sequelize, DataTypes } from 'sequelize';

export default function CommentModel(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes
) {
    const Comment = sequelize.define(
        "Comment", {
            CommentID: { 
                type: dataTypes.UUID,
                primaryKey: true,
                defaultValue: dataTypes.UUIDV4
            },
            CommentTitle: {
                type: dataTypes.STRING,
                allowNull: false
            },
            CommentContent: {
                type: dataTypes.TEXT,
                allowNull: false
            },
            Author: {
                type: dataTypes.STRING,
                allowNull: false
            },
            CommentDate: {
                type: dataTypes.DATEONLY,
                allowNull: false
            },
            CommentListID: {
                type: dataTypes.STRING
            },
            CommentsID: {
                type: dataTypes.STRING
            },
            CommentLikes: {
                type: dataTypes.INTEGER,
                defaultValue: 0
            },
            CommentStatus: {
                type: dataTypes.STRING,
                defaultValue: "active"
            },
            CommentedWAD: {
                type: dataTypes.STRING
            }
        }
    );
    console.log(Comment === sequelize.models.Comment);
    return Comment;
}