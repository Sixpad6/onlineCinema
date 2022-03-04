const { users } = require ("../../models")

exports.getUserId = async (req,res) =>{
    try {
        const { id } = req.params
        let user = await users.findOne({
            where :{
                id
            },
            attributes :{
                exclude : ["password", "createdAt", "updatedAt"]
            }
           })
           const PATH = "http://localhost:5000/uploads/"
           user = JSON.parse(JSON.stringify(user))

        res.status(200).send({
            status:"success",
            data : user
        })
        
    } catch (error) {
        console.log(error);
        res.send({
        status: 'failed',
        message: 'Server Error',
    });
        
    }
}