
const {MongoClient,ObjectId} = require ('mongodb-legacy')

const connectionURL ='mongodb://127.0.0.1:27017'
const databaseName = 'task-manager' 

const id = new ObjectId()
console.log(id.getTimestamp())


MongoClient.connect(connectionURL,{useNewUrlParser : true},(error,client)=>{
    if(error){
        return console.log("Unable to connect to database")
    }

    console.log("Connected successfully")
    const db = client.db(databaseName)

    db.collection('users').deleteMany({
      Age :20
    }).then(result=>console.log(result)).catch(error=>console.log(error))
    
    // db.collection('users').updateOne({
    //   _id :new ObjectId ('65db4693ad1886a21179daa4')
    // },{
    //   $set : {
    //     name : 'JSKDJ'
    //   }
    // }).then((result)=>{
    //   console.log(result)
    // }).catch(error=>console.log(error))
    // db.collection('users').findOne({name: 'Bharathi',Age : 20},(error,user)=>{
    //   if (error){
    //     return console.log("")
    //   }
    //   console.log(user)
    // })
    // db.collection('users').findOne({_id: new ObjectId('65db4693ad1886a21179daa4')},(error,user)=>{
    //   if (error){
    //     return console.log("")
    //   }
    //   console.log(user)
    // })
    // db.collection('users').insertOne({
    //     _id : id,
    //     name : "Bharathi",
    //     Age : 20
    // },(error,result)=>{
    //   if(error){
    //   return console.log("could not able to insert data")
    //   }
    //   console.log(result.insertedId)
    // })
    // db.collection('users').insertMany([{
    //   name : 'jay',
    //   Age : 10
    // },{
    //   name : 'andy',
    //   Age : 20
    // }],(error,result)=>{
    //   if (error){
    //     return console.log(" unable to insert documents")
    //   }
    //   console.log(result.insertedCount)
    // })
})
