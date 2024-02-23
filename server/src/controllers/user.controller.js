const bcrypt = require('bcrypt');

const User = require('../models/user.schema.js');


class UserController {

    registerUser = async (req, res) => {
        try {
        
            const { name, email, password } = req.body;
        
            if(!name || !email || !password){
                return res.status(422).json({
                    error: "You're missing some fields."
                });
            }
            const userEmailExist = await User.findOne({ email: email });
            if(userEmailExist){
                res.status(409).json({ 
                    error: "Email already Exists, Please use another to register." 
                });
            }
            else{
                const user = new User({ name, email, password });
                await user.save();
                return res.status(200).json({ 
                    message: "User Registered Successfully." 
                });
            }
        }
        catch(error){
            console.log(error);
        }
    };


    loginUser = async (req, res) => {
        try {
            let token;
            const { email, password } = req.body;
        
            if(!email || !password){
                return res.status(422).json({ 
                    error: "You're missing some fields." 
                });
            }
        
            const userLogin = await User.findOne({ email: email });
        
            if(userLogin){
                const matchPassword = await bcrypt.compare(password, userLogin.password);
        
                if(!matchPassword){
                    return res.status(400).json({ 
                        error: "Invalid Credentials." 
                    });
                }
                else{
                    token = await userLogin.generateAuthToken();
                    return res.status(200).json({ 
                        token: token, 
                        message: "User Logged in Successfully." 
                    });

                }
            } 
            else{
                return res.status(400).json({ 
                    error: "Invalid Credentials." 
                });
            }
        } 
        catch(err){
            console.log(err);
        }
    };

    userData = async(req, res) => {
        try {
            res.send(req.userdata);
        } catch (err) {
            console.error(err);
        }
    }

}

module.exports = UserController;