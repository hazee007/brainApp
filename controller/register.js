


const handelRegister = (req, res, bcrypt, db) =>{
    const {email , name, password} = req.body;  
    if(!email || !password || !name){
       return res.status(400).json("incomplete form submission");
    }
    const hash = bcrypt.hashSync(password);
    console.log(hash)
    db.transaction(trx =>{
        trx.insert({
            hash:hash,
            email:email
        })
            .into('login')
            .returning('email')
            .then(loginEmail =>{
            return trx('users')
            .returning('*')
            .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date()
            }).then(user =>{
                res.json(user[0]); 
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err =>res.status(400).json('unable to register'))
}

module.exports ={
    handelRegister :handelRegister
};