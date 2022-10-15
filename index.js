const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express()
const port = process.env.PORT || 5000

dotenv.config()

app.use(cors())
app.use(express.json())


//


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.hsyax1x.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
     await client.connect
     const ProductCollection = client.db('eCommerce').collection('products')

     // find all product 

     app.get('/api/products', async(req, res) => {
      const query = {};
      const result = await ProductCollection.find(query).toArray() 
      res.send(result)
     });


     // find specific product by id
     app.get('/api/products/:id', async(req, res) => {
     const id = req.params;
      const query = ({_id:ObjectId(id)})
      const result = await ProductCollection.findOne(query)
      res.send(result)
     });

     app.get('/api/products/:id', (req, res) => {
      const product = data.products.find((x) => x._id === req.params.id);
      if (product) {
        res.send(product);
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    });
    
  }
  finally{

  }
}
run().catch(console.dir())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})