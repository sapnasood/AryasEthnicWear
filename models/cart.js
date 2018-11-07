module.exports = function(sequelize, DataTypes){
    const Cart_data = sequelize.define('Cart_data', {
        product_quant: {
            type: DataTypes.INTEGER
          },
          product_size:{
           type: DataTypes.STRING
          }

        } 
     )

     Cart_data.associate = function(models){
       Cart_data.belongsTo(models.Products, {
        foreignKey: {
          allowNull: false
        }

       });

     }
     return Cart_data;
    };