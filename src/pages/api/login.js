import { MongoClient, ServerApiVersion  } from 'mongodb';

import { v4 as uuidv4 } from 'uuid';
import sha256 from 'crypto-js/sha256'
import jwt from 'jsonwebtoken';


export default  async  function Login (req,res)  {

    const uri = "mongodb+srv://admin:1234@cluster0.foqjgng.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
    );

    const {  password } = req.body;
    let email = req.body?.email;
   
  const inputmail = email;
  const inppassword = password;


  // check method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }

//   // check every field is filled
  if (!email | !password) {
    return res.status(400).json({ message: 'Please fill all fields', success: false });
  }


  try{
       
    await client.connect();
    const person  = client.db('test').collection('person');
 
    const account  = await person.findOne({email: inputmail},{})

    if(!account){
        return ( res.status(400).json({message: 'Not found this account', success: false}))
    }

   const {account_id, email, password} = account || {} ;

    const cryptinput = sha256(inppassword+account_id).toString();

    // compare password
    const isMatch = cryptinput === password;

    if(isMatch){
        // 1 h age of account
      const token = jwt.sign({ account_id, email }, process.env.JWT_KEY, { expiresIn: '1h' });
      console.log(token)
      return res.status(200).json({ message: 'Login success', success: true, token: token });
    } else {
      return res.status(400).json({ message: 'Password is incorrect', success: false });
    }



}catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  } finally {
    await client.close();
  }


}