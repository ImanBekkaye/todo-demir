const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite:data');

const Users = sequelize.define('user',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,

    },
    username:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Todo = sequelize.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_username: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    task: {
        type: Sequelize.STRING,
        allowNull: false
    },

});
Todo.belongsTo(Users, {
    foreignKey: 'id_username',
    targetKey: 'id'
});
const createTables = function() {
    sequelize.sync({ logging: console.log }).then(fullfil => {
        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    });
};

module.exports = {
    createTables,
    Todo,
    Users,
    Sequelize,
    sequelize
};