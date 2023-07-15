import { MongoClient, ServerApiVersion  } from 'mongodb';

export default  async  function connectDB (req,res)  {

    const uri = "mongodb+srv://admin:1234@cluster0.foqjgng.mongodb.net/?retryWrites=true&w=majority"
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
    );
    try{
       
        await client.connect();
        const mark  = client.db('test').collection('test');
     
        const ans  = await mark.find({},{projection:{"_id":0}}).toArray();


        return( res.status(200).json({ans  , message: 'Get bill success', success: true}))


    }


    
    catch(err){
        console.log(err)
    }
}