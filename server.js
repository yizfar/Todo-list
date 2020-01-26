const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

//const router = require('./router/api');
//change passwarh and username
const MONGODB_URI = 'mongodb+srv://yizzz:Passward@tododb-m3d0q.mongodb.net/test?retryWrites=true&w=majority'


mongoose.connect(MONGODB_URI || 'mongodb://localhost/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
});

app.use(express.json());
app.use(express.urlencoded({extended :false}));
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: String,
      
    data: { 
        type:String,
        default: Date.now()
    }
});
  
//model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

//example
const data = {
    title:'hi whatsapp?',
    body:'this is a body',

};
 
// send 
const newBlogPost = new BlogPost(data);




app.use(morgan('tiny'));
app.get('/api', (req, res) => {
    const data ={
        username: ' moshe',
        age: 22,
    };

    BlogPost.find({})
    .then((data) => {
        console.log('data: ', data);
        res.json(data);
    } )
    .catch(() => {
        console.log('error: ', error);
    });

});

app.post('/api/save', (req, res) => {
    console.log('title: ',req.body);
    const data = req.body;

    const newBlogPost = new BlogPost(data);

    newBlogPost.save((error) => {
        if(error){
            res.status(500).json({msg: 'sorry, there is a server error'})
        } else {
            return res.json ({
                msg: 'your data has been saved!!!!'
            });
        }       
    })

   
   });




app.listen(PORT, console.log('server is starting at ${PORT}'));