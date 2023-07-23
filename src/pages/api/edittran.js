import { MongoClient, ServerApiVersion  } from 'mongodb';
import jwt from 'jsonwebtoken';


export default  async  function edittran (req,res)  {


    const uri = "mongodb+srv://admin:1234@cluster0.foqjgng.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
    );

    // let  tran_id  = req.body?.tran_id
    const {
      tran_id,
      topic_name,
      balance,
      date,
      description,
      trans_type,
      } = req.body;



    const token = req.headers["auth-token"];
    const decoded =   jwt.decode(token)
    const { account_id } = decoded || {};

    console.log(account_id)
    console.log(tran_id)


    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed', success: false });
      }


    try{


      const cleanObject = (obj)=>   {
        for (var propName in obj) {
          if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
          }
        }
        return obj
      }
       
        await client.connect();
        let tran  = client.db('test').collection('transactions');

      const allowperson = await tran.findOne({"tran_id" : tran_id , "account_id": account_id},{})

      if(!allowperson){
        return( res.status(400).json({ message: 'Account not allow', success: false}))
      }

     
       const updatetran = await tran.updateOne(  { "tran_id" : tran_id , "account_id": account_id},{ $set: cleanObject ( {  topic_name: topic_name,
        balance: balance,
        date: date,
        description: description,
        trans_type: trans_type,}) });

        
        if(updatetran){
            return( res.status(200).json({ message: 'Edit transaction  success', success: true}))
        }
        else{
          return( res.status(400).json({ message: 'Edit transaction  fail', success: false}))
        }

    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, success: false });
      } finally {
        await client.close();
      }


}