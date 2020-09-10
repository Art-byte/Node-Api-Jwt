const {Router} = require('express');
const router = Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const verifyToken = require('./VerifyToken');





//Para registrar un usuario nuevo 
router.post('/signup', async (req, res, next)=> {
    const {user, userName, email, password} = req.body;

    const users = new User({
            user,
            userName,
            email,
            password
    });

    //no debemos usar el metodo directamente del modelo, si no desde su instancia
    users.password = await users.encryptPassword(users.password);
    await users.save();

    //Control sobre el jwt
    const token = jwt.sign({id: users._id}, config.secret, {
        //tiempo de expiracion 
        expiresIn: 60 * 60 * 24
    })

    console.log(users)
    res.json({ auth: true, token});

});





router.post('/signin', async (req, res, next)=> {

    const {email, password} = req.body;
    const usuario = await User.findOne({email:email})

    if(!usuario){
        return res.status(404).send('Email not found')
    }

    const passwordIsValid = await usuario.validatePassword(password)

    //Si el usuario es correcto, le damos su token para que haga peticiones al servidor 
    if(!passwordIsValid){
        return res.status(401).json({auth: false, token: null});
    }else{
        const token = jwt.sign({id: usuario._id}, config.secret,{
            //expiracion
            expiresIn: 60 * 60 * 24
        });

        res.json({auth: true, token})

    }

});






router.get('/profile',verifyToken, async (req, res, next)=> {

       //Agregamos cero para eliminar los datos que no queremos
       const usuario = await User.findById(req.userId, {password: 0});

       if(!usuario){
           return res.status(404).json({message:'Usuario no encontrado'})
       }

       res.json(usuario)
})


module.exports = router;