import { MongoClient, ServerApiVersion  } from 'mongodb';
import jwt from 'jsonwebtoken';


export default  async  function gettransactions (req,res)  {


    const uri = "mongodb+srv://admin:1234@cluster0.foqjgng.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
    );


    const token = req.headers["auth-token"];
    const decoded =   jwt.decode(token)
    const { account_id } = decoded || {};
    

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed', success: false });
      }


    try{
       
        await client.connect();
        let tran  = client.db('test').collection('transactions');
     
       const getTran = await tran.find({"account_id": account_id},{projection:{"_id":0}}).toArray()


         console.log(decoded)


        return( res.status(200).json({getTran: getTran, message: 'Transactions  success', success: true}))


    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, success: false });
      } finally {
        await client.close();
      }



}