const mysql = require('mysql')

const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME,
});

const getUsers = (req,res)=>{

    
    console.log(req.session.user,"reached here")
    try {
        db.query('SELECT * FROM users',(error, result)=>{
            if(error){
                return res.status(500).json({"message":"internal server error"});
            }

            const users = result;

            return res.status(200).json({"users":users});
        })
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getUsers}