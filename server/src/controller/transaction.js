const { film, category, transaction,users } = require('../../models')

exports.addTransaction = async (req,res) =>{
    try {
        const { id } = req.users
        const data = req.body
        let newTransaction = await transaction.create({
            ...data,
            idUser : id,
            transferProof: req.file.filename
        }, {
            attributes:{
                exclude : ["createdAt", "updatedAt"]
            },
            include :{
                model : users,
                as : 'userTransaction',
                attributes :{
                    exclude :["createdAt", "updatedAt"]
                }
            },
            include:{
                model: film,
                as : 'filmTransaction',
                attributes :{
                    exclude :["createdAt", "updatedAt"]
                },
                include:{
                    model : category,
                    as : 'category',
                    attributes :{
                        exclude :["createdAt", "updatedAt"]
                    }
                }
            }
        })


        res.send({
            status: "succes",
            newTransaction
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getTransactionbyId = async (req,res)=>{
    try {
        const { id } = req.params
        let getTransaction = await transaction.findAll({
            where:{
                idUser: id
            },
            include:{
                model : film,
                as : 'filmTransaction'
            }
        })
         res.send({
            status: 'success',
            getTransaction
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getTransaction = async (req,res) =>{
    try {
        const transactions = await transaction.findAll({
            attributes:{
                exclude : ["createdAt", "updatedAt"]
            },
            include : [
            {
                model : users,
                as : 'userTransaction',
                attributes :{
                    exclude : ["createdAt", "updatedAt", "password"]
                }
            },
            {
                model : film,
                as : 'filmTransaction',
                attributes :{
                    exclude : ["createdAt", "updatedAt"]
                }
            }],
            order: [["createdAt", "DESC"]]
        })
        res.send({
            status: 'success',
            transactions
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })    
    }
}

exports.updateTransaction = async (req,res) =>{
    try {
        const data = req.body
        const { id } = req.params

        const transactions = await transaction.update({
            ...data
        },
        {
            where :{
                id
            }
        }
        ) 

        res.send({
            status:"success",
            transactions
        })
        
    } catch (error) {
        console.log(error);
        res.send({
        status: 'failed',
        message: 'Server Error',
    });
    }
}

exports.getTransactionbyIdFilm = async (req,res) =>{
    try {
        const { id } = req.params
        const  idUser  = req.users.id

        let transactionId = await transaction.findOne({
            where :{
                idFilm :id,
                idUser : idUser
            },
            attributes:{
                exclude:["createdAt", "updatedAt"]
            }
        })

        res.send({
            status:"Succes",
            transactionId
        })
        
    } catch (error) {
        console.log(error);
        res.send({
        status: 'failed',
        message: 'Server Error',
    })
    }
}