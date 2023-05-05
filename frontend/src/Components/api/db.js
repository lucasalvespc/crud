async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:Cavalo100perna@localhost:3306/biometest");
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}
async function selectCustomers(table) {
    const conn = await connect();
    return await conn.query('SELECT * FROM'+ table +';');
    

}

async function insertCustomer(table, customer) {
    const conn = await connect();
    const sql = 'insert into servidores(matricula_S, nome_S, email_S, senha_S) values (?,?,?,?);';
    const values = [table, customer.matricula_S, customer.nome_S, customer.email_S, customer.senha_S ];
    await conn.query(sql, values);
}

async function updateCustomer(id, customer) {
    const conn = await connect();
    const sql = 'update servidores set matricula_S=?, nome_S=?, email_S=?, senha_S=? where id=?';
    const values = [customer.matricula_S, customer.nome_S, customer.email_S, customer.senha_S, id];
    await conn.query(sql, values);
}

async function deleteCustomer(id) {
    const conn = await connect();
    const sql = 'delete from servidores where id=?;';
    await conn.query(sql, id);
}
module.exports = { selectCustomers, insertCustomer, updateCustomer, deleteCustomer }