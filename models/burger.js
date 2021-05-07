module.exports = function(sequelize, DataTypes) {
	var burger = sequelize.define("burger", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 30]
			}
		},
		owner: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 30]
			}
		},
		dob: DataTypes.STRING,
		dod: DataTypes.STRING,
		devoured: {
			type:DataTypes.BOOLEAN,
			defaultValue: 0
		}
	},{
		timestamps: false
	});
	return burger;
}