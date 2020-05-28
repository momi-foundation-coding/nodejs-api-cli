"use strict";const userQueries=`
export default (req, res) => {
    const deleteUserQuery = \`DELETE FROM users WHERE id=\${req.params.id}\`;
    const updateUserQuery = \`UPDATE users SET' \${key}=\${req.body[key]} where id = '\${req.params.id}'\`;
    const createUserQuery = \`INSERT INTO  users(
        firstname, lastname,username, email, phonenumber, address, isadmin, password)
        VALUES(
            '\${req.body.firstname}',
            '\${req.body.lastname}',
            '\${req.body.username}',
            '\${req.body.email}',
            '\${req.body.password}')\`;
    const singleUserQuery = \`SELECT * from users where id='\${req.params.id}'\`
    const allUsersQuery = 'SELECT * from users'
    return {
        allUsersQuery,
        singleUserQuery,
        createUserQuery,
        updateUserQuery,
        deleteUserQuery
    }
}
`;module.exports="\nexport default (req, res) => {\n    const deleteUserQuery = `DELETE FROM users WHERE id=${req.params.id}`;\n    const updateUserQuery = `UPDATE users SET' ${key}=${req.body[key]} where id = '${req.params.id}'`;\n    const createUserQuery = `INSERT INTO  users(\n        firstname, lastname,username, email, phonenumber, address, isadmin, password)\n        VALUES(\n            '${req.body.firstname}',\n            '${req.body.lastname}',\n            '${req.body.username}',\n            '${req.body.email}',\n            '${req.body.password}')`;\n    const singleUserQuery = `SELECT * from users where id='${req.params.id}'`\n    const allUsersQuery = 'SELECT * from users'\n    return {\n        allUsersQuery,\n        singleUserQuery,\n        createUserQuery,\n        updateUserQuery,\n        deleteUserQuery\n    }\n}\n";