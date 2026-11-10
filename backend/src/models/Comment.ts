import { DataTypes, Model } from "@sequelize/core";
import type { InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from "@sequelize/core";

export class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
    // musthave
    declare CommentTitle: string;
    declare CommentContent: string;
    declare Author: string;
    declare CommentDate: Date;

    // canhave
    declare id: CreationOptional<string>;
    declare CommentListID: CreationOptional<string>;
    declare CommentsID: CreationOptional<string>;
    declare CommentLikes: CreationOptional<number>;
    declare CommentStatus: CreationOptional<string>;
    declare CommentedWAD: CreationOptional<string>;

    // dbhave
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}
export default function initCommentModel(sequelize: Sequelize) {
    Comment.init(
        {
            id: { 
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            CommentTitle: {
                type: DataTypes.STRING,
                allowNull: false
            },
            CommentContent: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            Author: {
                type: DataTypes.STRING,
                allowNull: false
            },
            CommentDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            CommentListID: {
                type: DataTypes.STRING
            },
            CommentsID: {
                type: DataTypes.STRING
            },
            CommentLikes: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            CommentStatus: {
                type: DataTypes.STRING,
                defaultValue: "active"
            },
            CommentedWAD: {
                type: DataTypes.STRING
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Comment",
        }
    );
    
    return Comment;
}