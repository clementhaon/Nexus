//Model contribution
export default (sequelize, DataTypes) => {
    const contributions = sequelize.define(
        "contributions",
        {
            //1. Unique properties
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            user_id: { type: DataTypes.INTEGER },
            project_id: { type: DataTypes.INTEGER },
            type_of_contribution_id: { type: DataTypes.INTEGER },
        },
        {
            tableName: "contributions",
            timestamps: true,
        }
    );
    return contributions;
};