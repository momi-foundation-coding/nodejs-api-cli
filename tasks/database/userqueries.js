const userQueries = `
export default (req, res) => {
    const deleteUserQuery = \`DELETE FROM users WHERE id=\${req.params.id\}\`;
    const updateUserQuery = \`UPDATE users SET' \${key\}=\${req.body[key]\} where id = '\${req.params.id\}'\`;
    const createUserQuery = \`INSERT INTO  users(
        firstname, lastname,username, email, phonenumber, address, isadmin, password) 
        VALUES(
            '\${req.body.firstname\}', 
            '\${req.body.lastname\}', 
            '\${req.body.username\}',
            '\${req.body.email}',
            '\${req.body.password\}')\`;
    const singleUserQuery = \`SELECT * from users where id='\${req.params.id\}'\`
    const allUsersQuery = 'SELECT * from users'
    return {
        allUsersQuery,
        singleUserQuery,
        createUserQuery,
        updateUserQuery,
        deleteUserQuery
    }
}
`

exports = module.exports = userQueries;
