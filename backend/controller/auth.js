const mysql = require('mysql');
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME,
});


const Register = async(req,res)=>{
   
    try {
 
      const { email, username, password, confirmPass } = req.body;
 
     if(!email || !username || !password || !confirmPass){
         return res.status(400).json({"message":"please fill required fields"});
     }
 
     if(password != confirmPass){
         return res.status(400).json({"message":"Password missmatch"});
     }
 
     db.query('SELECT email FROM users WHERE email = ?',[email],async(error,results)=>{
 
         if(error){
             console.log(error);
             return res.status(500).json({"message":"internal server error"});
         }
         if(results.length > 0){
             return res.status(409).json({"message":"email already used"});
         }
 
         const hashedPass = await bcrypt.hash(password , 12);
 
         db.query('INSERT INTO users SET ?',{name: username , email:email , password:hashedPass},(error , results)=>{
     
             if(error){
                 console.log(error);
                 return res.status(500).json({"message":"internal server error"});
             }
     
             return res.status(200).json({"message":"user created successfully"});
         });
    
     })
    
     
    } catch (error) {
         return res.status(500).json({"message":"internal server error"});
    }
    
 }

const Login = async(req,res)=>{

    try {
        
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({"message":"please add required fields"});
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async(error,results)=>{
            if(error){
                console.log(error);
                return res.status(500).json({"message":"internal server error"});
            }

            if(results.length === 0){
                return res.status(404).json({"message":"email not found"});
            }

            const user = results[0];

            const isMatch =await bcrypt.compare(password,  user.password)

            if(!isMatch){
                return res.status(401).json({"message":"incorrect password"});
            }

            return res.status(201).json({
                "message":"Login successfull",
                "user":{
                    "id":user.id,
                    "email":user.email,
                    "name":user.name
                }
            })

        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({"message":"internal server error"});
    }
}


module.exports = {Register , Login};