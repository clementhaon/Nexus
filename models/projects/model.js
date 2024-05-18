//Model projects
export default (sequelize, DataTypes) => {
    const projects = sequelize.define(
        "projects",
        {
            //1. Unique properties
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            title: { type: DataTypes.STRING, unique: true, required: true },
            description: { type: DataTypes.TEXT, required: true },
            is_active: {type: DataTypes.BOOLEAN, required: true},
            dead_line: {type: DataTypes.DATE, required: true},
            creator_id: {type: DataTypes.INTEGER, required: true},
        },
        {
            tableName: "projects",
            timestamps: true,
        }
    );
    return projects;
};