const bookControler = {
    data : [
        {
            id:0,
            title:"Web Development with Node and Express",
            authors: ["Ethan Brown"],
            price:50.00 
        },
        {
            id:1,
            title:"Design Patterns",
            authors: ["Erich Gamma", "Richard Helm", "Ralph Johnson", "John Vlissides"],
            price:69.90
        }
    ],
    maxId: data.length, 
    get: (req, res) => {
        let books = data;
        if (req.query.maxprice){
            books = books.filter (book => book.price <= req.query.maxprice);        
        }
        res.send(books);
    },
    getById: (req, res) => {
        let book = data.find ( book => book.id == req.params.id);
        if (book) 
            res.send (book);
        else
            res.status(404).send ("Not Found");        
    },
    delete: (req, res) => {
        let book = data.find ( book => book.id == req.params.id);
        if (book) 
        {
            data.splice (data.indexOf(book) ,1);
            res.send (book);
        }
        else
            res.status(404).send ("Not Found");        
    },
    post: (req, res) => {
        let book = req.body;
        book.id = ++maxId;
        data.push (book);
        res.send (book);
    },
    patch: (req, res) => {
        let book = data.find ( book => book.id == req.params.id);    
        if (book) {
            for (let key in book)
                if (req.body[key])
                    book[key] = req.body[key];
            res.send (book);
        }
        else
            res.status(404).send ("Not Found");        
    }
};

export default bookControler;