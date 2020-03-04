/**
 * 
 * @param {*} database 
 * model structure for user.
 */
const userModelData = (database) => {

    if (database.toLowerCase() === 'sqlite') {
        // Will check difference here
    } else if (database.toLowerCase() === 'postgres') {

    }
    return (
        `import Sequelize, { Model } from 'sequelize';
        import bcrypt from 'bcrypt';
        import sequelize from './setup';
        
        export default class User extends Model { }
        User.init({
            // attributes
            firstName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            lastName: {
                type: Sequelize.STRING
                // allowNull defaults to true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            }
        }, {
            // Can add more validation for these methods
            hooks: {
                beforeCreate: async (user, options) => {
                    const salt = await bcrypt.genSaltSync(8);
                    user.password = await bcrypt.hashSync(user.password, salt);
                },
                beforeUpdate: async (user, options) => {
                    const salt = await bcrypt.genSaltSync(8);
                    user.password = await bcrypt.hashSync(user.password, salt);
                }
            },
            // Don't return password in any query
            defaultScope: {
                attributes: { exclude: ['password'] }
            },
            // Calling instance of sequelize created in file setup.js
            sequelize,
            modelName: 'user'
            });
        `
    )
}

exports = module.exports = userModelData;
