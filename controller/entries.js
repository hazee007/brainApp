const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: 'b7d48306dc8e4c47b37a00a38463bbf7'
   });


const handelApiCall = (req, res)=>{
    app.models.
       predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
       .then(data => {
           res.json(data)
       })
       .catch(err => res.status(400).json('API error'))
}  


const getEntries = (req, res, db) =>{
    const {id} = req.body;
    db('users').where('id', '=', id )
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports ={
    getEntries,
    handelApiCall,
};