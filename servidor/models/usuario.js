module.exports=function(sequelize, DataTypes){
    var Usuario = sequelize.define("Usuario",{
        idUsuario:{type:DataTypes.INTEGER, primaryKey:true, identity:true},
        loginUsuario: DataTypes.STRING(50),
        passwordUsuario: DataTypes.STRING(200),
        estadoUsuario: DataTypes.BOOLEAN
    },{
        tableName: "usuario",
        timestamps: false
    });
    return Usuario;
};
