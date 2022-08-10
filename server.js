const express = require('express');
const app = express();
const PORT = 8000;
const mongoose = require('mongoose');
require('dotenv').config();
const PackingList = require('./models/packing-list');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => {console.log('Connected to db!')}
)

// GET METHOD
app.get('/', async (req,res) => {
    try{
       PackingList.find({}, (err, items) => {
            res.render('index.ejs', {
                packingItems: items
            })
        })
    } catch(err){
        if (err) return res.status(500).send(err);
    }
})

//POST
app.post('/', async (req,res)=> {
    const packingItem = new PackingList(
        {
            title: req.body.title,
            description: req.body.description
        }
    )
    try{
        await packingItem.save()
        console.log(packingItem)
        res.redirect('/')
    }catch(err){
        if (err) return res.status(500).send(err);
        res.redirect('/')
    }
})

//EDIT (UPDATE)
app
    .route('/edit/:id')
    .get((req,res) => {
        const id = req.params.id
        PackingList.find({}, (err, items) => {
            res.render('edit.ejs', {
                packingList: items, idItem: id })
            })
        })
    .post((req,res) => {
        const id = req.params.id
        PackingList.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                description: req.body.description
            },
            err => {
                if (err) return res.status(500).send(err)
                res.redirect('/')
            }
        )
    })
    

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));