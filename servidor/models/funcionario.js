
module.exports=function(sequelize, DataTypes){
    var Funcionario = sequelize.define("Funcionario",{
        idFuncionario:{type:DataTypes.INTEGER, primaryKey:true, identity:true},
        ci: DataTypes.STRING(15),
        nombre: DataTypes.STRING(100),
        apellidoPaterno: DataTypes.STRING(100),
        apellidoMaterno:DataTypes.STRING(100),
        telefono:DataTypes.INTEGER,
        celular:DataTypes.INTEGER,
        fechaNacimiento:DataTypes.DATE,
        lugarNacimiento:DataTypes.STRING(100),
        nacionalidad:DataTypes.STRING(100),
        fechaIngreso:DataTypes.DATE,
        correoElectronico:DataTypes.STRING(50),
        estadoFuncionario: DataTypes.BOOLEAN,
        cargo:DataTypes.STRING(50)
    },{
        tableName: "funcionario",
        timestamps: false,
        associate: function(models){
            Funcionario.hasOne(models.Usuario);
        }
    });
    return Funcionario;
};
