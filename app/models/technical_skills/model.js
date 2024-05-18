//Model technical skills
export default (sequelize, DataTypes) => {
    const technical_skills = sequelize.define(
        "technical_skills",
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },                                                                                   //
            name: { type: DataTypes.STRING, unique: true, required: true },
            is_active: {type: DataTypes.BOOLEAN, required: true, defaultValue: true},
            order: {type: DataTypes.INTEGER},
        },
        {
            tableName: "technical_skills",
            timestamps: true,
        }
    );
    return technical_skills;
};