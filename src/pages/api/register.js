import { MongoClient, ServerApiVersion  } from 'mongodb';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import sha256 from 'crypto-js/sha256'


export default  async  function Register (req,res)  {

    const uri = "mongodb+srv://admin:1234@cluster0.foqjgng.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
    );


    const { 
        email,
        first_name,
        password,
        repeat_password,
        phone_no,
        last_name,
        } = req.body;


    // check method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }
 

    try{
       
        await client.connect();
        const person  = client.db('test').collection('person');
     
        const checkAccount  = await person.findOne({email:email},{})

        if(checkAccount){
            return ( res.status(400).json({message: 'This email can not to use', success: false}))
        }

        if(password !== repeat_password ){
          return res.status(405).json({ message: 'Comfirm password is invalid', success: false });
        }
      

        const account_id = uuidv4();

        const hashedPassword = sha256(password + account_id).toString();

        const result = await person.insertOne({

            account_id: account_id,
            email : email,
            first_name:first_name,
            last_name: last_name,
            password: hashedPassword,
            phone_no: phone_no,
           
      
      
          });


        return( res.status(200).json({ message: 'Register  success', success: true}))


    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, success: false });
      } finally {
        await client.close();
      }
}