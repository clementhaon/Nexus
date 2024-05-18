//Model soft skills
export default (sequelize, DataTypes) => {
    const soft_skills = sequelize.define(
        "soft_skills",
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },                                                                                   //
            name: { type: DataTypes.STRING, unique: true, required: true },
            is_active: {type: DataTypes.BOOLEAN, required: true, defaultValue: true},
            order: {type: DataTypes.INTEGER},
        },
        {
            tableName: "soft_skills",
            timestamps: true,
        }
    );
    return soft_skills;
};