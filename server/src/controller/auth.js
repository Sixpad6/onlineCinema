const { users } = require ("../../models")
const joi = require ("joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async(req, res) => {
    const schema = joi.object({
        email : joi.string().email().required(),
        password : joi.string().min(4).required(),
        fullname : joi.string().min(3).required(),
        status : joi.string().required()
    })

    const { error } = schema.validate(req.body)
    if (error){
        return res.status(400).send({
            error:{
                message: error.details[0].message
            }
        })
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        const newUsers = await users.create({
            email:req.body.email,
            password:hashPassword,
            fullname : req.body.fullname
        })

        const token = jwt.sign({ id:users.id }, process.env.SECRET_KEY) 

        res.status(200).send({
            status:"success",
            data : {
                user:{
                    email : newUsers.email,
                    fullname : newUsers.fullname,
                    token
                }
            }
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            status : "Failed",
            Message : "Server Error"
        })
    }
}

exports.login = async (req, res) =>{
    const schema = joi.object({
        email:joi.string().email().required(),
        password : joi.string().min(4).required()
    })

    const { error } = schema.validate(req.body)

    if(error){
        return res.status(400).send({
            error : {
                message: error.details[0].message
            }
        })
    }

    try {
        const userExist = await users.findOne({
            where :{
                email : req.body.email
            },
            attributes:{
                exclude : ["createdAt","updatedAt"]
            }
        })

        const isValid = await bcrypt.compare(req.body.password, userExist.password)

        if (!isValid) {
            return res.status(400).send({
              status: "failed",
              message: "credential is invalid",
            });
          }

          const dataToken = {
            id:userExist.id,
            email:userExist.email,
            fullname:userExist.fullname,
            status: userExist.status
          }

          const token = jwt.sign(dataToken, process.env.SECRET_KEY)

          res.status(200).send({
            status: "success",
            data: {
                user : {
                    id: userExist.id,
                    fullname : userExist.fullname,
                    email : userExist.email,
                    status : userExist.status,
                    token
                }
            }
          })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
        status: "failed",
        message: "Server Error"
    })       
    }
}

exports.checkAuth = async (req, res) => {
    try {
      const id = req.users.id;
  
      const dataUser = await users.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      });
  
      if (!dataUser) {
        return res.status(404).send({
          status: "failed",
        });
      }
  
      res.send({
        status: "success...",
        data: {
          user: {
            id: dataUser.id,
            fullname: dataUser.fullname,
            email: dataUser.email,
            status: dataUser.status,
            photo : dataUser.photo
          },
        },
      });
    } catch (error) {
      console.log(error);
      res.status({
        status: "failed",
        message: "Server Error",
      });
    }
  };