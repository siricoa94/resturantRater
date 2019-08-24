module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Review.associate = function(models) {
    Review.belongsTo(models.Resturant, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Review;
};
