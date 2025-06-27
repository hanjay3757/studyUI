//product 모델 정의
module.exports = (sequelize, DataTypes) => {
  const newProduct = sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      image_url: DataTypes.STRING(255),
      spec: {
        type: DataTypes.ENUM('hit', 'best', 'new', 'normal'),
        defaultValue: 'normal',
      },
      //   created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      //   updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }, 수동
    },
    {
      tableName: 'products',
      timestamps: true, //createdAt,updatedAt 날짜 자동생성
      underscored: true, //created_at,updated_at 으로 생성 snake 표기법
    }
  ); //UNSIGNED (양수만 처리)
  return newProduct;
};
