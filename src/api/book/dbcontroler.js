import { MongoClient, ObjectID } from 'mongodb'

const url = 'mongodb://localhost:27017'; // адреса сервера 
const dbName = 'bookDB'; // назва Бази даних
const collectiionName = "books"; //назва коллекції 

const bookControler = { 
     get: async (req, res) => { //асинхронна функція
        try{
            const client = new MongoClient(url, { useUnifiedTopology: true });   // створюємо нового клієнта для підключення 
            const connection = await client.connect();    // підключаємось
            const books = connection.db(dbName).collection(collectiionName); // вибираємо коллекцію
            const result = await books.find().toArray(); // дія (повернути всі записи колекції)
            res.send (result); // надіслати результат
            client.close(); //закрити підключення
        } catch (error) { // якщо сталася помилка
            console.log(error);
            res.status(500).send (error);
        }
    },
    getById:  async (req, res) => {
        try{
            const client = new MongoClient(url, { useUnifiedTopology: true });        
            const connection = await client.connect();
            const books = connection.db(dbName).collection(collectiionName);
            const result = await books.findOne({ _id: ObjectID(req.params.id) }); // знайти 
            if (result) //якщо знайшло
                res.send (result);
            else
                res.status(404).send("Not Found");
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send (error);
        }
    },
    post:   async (req, res) => {
        try{
            const client = new MongoClient(url, { useUnifiedTopology: true });        
            const connection = await client.connect();
            const books = connection.db(dbName).collection(collectiionName);
            const result = await books.insertOne(req.body); 
            res.send (result.ops);
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send (error);
        }
    },
    delete: async (req, res) => {
        try{
            const client = new MongoClient(url, { useUnifiedTopology: true });        
            const connection = await client.connect();
            const books = connection.db(dbName).collection(collectiionName);
            const result = await books.findOneAndDelete({ _id: ObjectID(req.params.id) }, req.body);
            if (result)
                res.send (result);
            else
                res.status(404).send("Not Found");
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send (error);
        }
    },
    patch: async (req, res) => {
        try{
            const client = new MongoClient(url, { useUnifiedTopology: true });        
            const connection = await client.connect();
            const books = connection.db(dbName).collection(collectiionName);            
            const result= await books.findOneAndUpdate({ _id: ObjectID(req.params.id) }, { $set: req.body}, { returnOriginal: false });             
            if (result.value)
                res.send (result.value);
            else
                res.status(404).send("Not Found");
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send (error);
        }
    },
};

export default bookControler;