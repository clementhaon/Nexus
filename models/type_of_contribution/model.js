//Model type of contribution
export default (sequelize, DataTypes) => {
    const type_of_contribution = sequelize.define(
        "type_of_contribution",
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            type: { type: DataTypes.ENUM("skills", "financial", "network", "other"), unique: true, required: true },
            is_active: {type: DataTypes.BOOLEAN, required: true},
        },
        {
            tableName: "type_of_contribution",
            timestamps: true,
        }
    );
    return type_of_contribution;
};