(async()=>{
    const db = require("./db");
    console.log("Começou!"); 
    console.log('INSERT INTO clientes');
    const result = await db.insertCustomer({matricula_S:2017105210430120, nome_S: "Zé", email_S:"ze@g", senha_S:"lusa"});
    matricula_S, customer.nome_S, customer.email_S, customer.senha_S
    console.log(result); 
    
    console.log('SELECT * FROM clientes');
    const clientes= await db.selectCustomers();
    console.log(clientes);
    /*
    console.log('UPDATE clientes');
    const result2 = await db.updateCustomer(6, {nome: "Zé José", idade:19, uf:"GO"});
    console.log(result2); 
    
    console.log('DELETE FROM clientes');
    const result3= await db.deleteCustomer(7);
    console.log(result3);
    */
    })();