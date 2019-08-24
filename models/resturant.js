module.exports = function(sequelize, DataTypes) {
  var Resturant = sequelize.define("Resturant", {
    name: DataTypes.STRING
  });

  Resturant.associate = function(models) {
    Resturant.hasMany(models.Review, {
      onDelete: "cascade"
    });
  };

  return Resturant;
};
