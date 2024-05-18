//Model picture
export default (sequelize, DataTypes) => {
    const pictures = sequelize.define(
        "pictures",
        {
            //1. Unique properties
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            //1.A. Auth values                                                                                     //
            url: { type: DataTypes.STRING, unique: true, required: true },
            is_active: {type: DataTypes.BOOLEAN, required: true},
        },
        {
            tableName: "pictures",
            timestamps: true,
        }
    );
    return pictures;
};