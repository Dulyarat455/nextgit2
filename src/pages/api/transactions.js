import { MongoClient, ServerApiVersion  } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';


export default  async  function Transactions (req,res)  {


    const uri = "mongodb+srv://admin:1234@cluster0.foqjgng.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
    );



    let  topic_name = req.body?.topic_name
    let  balance = req.body?.balance
    let date = req.body?.date
    let  description = req.body?.description
    let trans_type = req.body?.trans_type

    const token = req.headers["auth-token"];
    const decoded =   jwt.decode(token)
    const { account_id } = decoded || {};

    // check method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }


    try{
       
        await client.connect();
        const tran  = client.db('test').collection('transactions');
     

        

        const tran_id = uuidv4();

        const result = await tran.insertOne({

            account_id: account_id,
            topic_name : topic_name,
            balance : balance,
            date: date,
            description: description,
            trans_type: trans_type,
            tran_id: tran_id
           
      
      
          });


         


        return( res.status(200).json({ message: 'Transactions  success', success: true}))


    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, success: false });
      } finally {
        await client.close();
      }
}
