import { MongoClient, ServerApiVersion  } from 'mongodb';
import jwt from 'jsonwebtoken';

export default  async  function calculate (req,res)  {


    const uri =  "mongodb+srv://admin:1234@cluster0.foqjgng.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
    );

    // let  tran_id  = req.body?.tran_id
   



    const token = req.headers["auth-token"];
    const decoded =   jwt.decode(token)
    const { account_id } = decoded || {};

    console.log(account_id)
    


    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed', success: false });
      }

      //set time  right now 

      const tzOffset = 7; // Offset for Indochina Time (GMT+7)
      const dateNow = new Date(Date.now() + tzOffset * 3600000).toISOString().split('T')[0];

      console.log("date = ",dateNow)

      let dayIn 
      let dayOut
      
      const [year, month, day] = dateNow.split("-");


    try{


    
       
        await client.connect();
        let tran  = client.db('test').collection('transactions');

      

      const sumincome = await tran.aggregate( [
        {$match:{
            'account_id': account_id,
            'trans_type': 0

        } }

        ,
        {$match:{
            
            'date': {
                $gte: `${year}-01-01`,
                $lte: `${year}-12-31`
              }

        } }


        , {
            $group: {
              _id: null, 
              total: { $sum: "$balance" } 
            }
          }
     ] ).toArray();


     const sumexpenses = await tran.aggregate( [
        {$match:{
            'account_id': account_id,
            'trans_type': 1

        } }

        ,
        {$match:{
            
            'date': {
                $gte: `${year}-01-01`,
                $lte: `${year}-12-31`
              }

        } }


        , {
            $group: {
              _id: null, 
              total: { $sum: "$balance" } 
            }
          }
     ] ).toArray();

    let sumbalance = {}

    

        // console.log(sumbalance.length)
        if(sumincome.length && sumexpenses.length){
            sumbalance['income'] = sumincome[0].total
            sumbalance['expenses'] = sumexpenses[0].total
            return( res.status(200).json({ sumbalance ,   message: 'calculate success', success: true}))
        }
        else if(sumincome.length === 0 && sumexpenses.length){
            sumbalance['income'] = 0
            sumbalance['expenses'] = sumexpenses[0].total

            return( res.status(200).json({ sumbalance ,   message: 'calculate success', success: true}))
        }
        else if(sumincome.length && sumexpenses.length === 0){
            sumbalance['income'] = sumincome[0].total
            sumbalance['expenses'] = 0

            return( res.status(200).json({ sumbalance ,   message: 'calculate success', success: true}))
        }
        else {
            sumbalance['income'] = 0
            sumbalance['expenses'] = 0

            return( res.status(200).json({ sumbalance ,   message: 'calculate success', success: true}))
        }

    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, success: false });
      } finally {
        await client.close();
      }






}