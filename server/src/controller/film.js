const { film, category } = require('../../models')

exports.addFilm = async (req, res) =>{
    try {
        const data = req.body
        let newFilm = await film.create({...data}, {
            attributes:{
                exclude : ["createdAt", "updatedAt"]
            },
            include :{
                model : category,
                as : 'category',
                attributes :{
                    exclude :["createdAt", "updatedAt"]
                }
            }
        })

        res.send({
            status: 'success',
            newFilm
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getFilm = async (req, res) =>{
    try {

        let getfilm = await film.findAll()

        res.send({
            status: 'success...',
            getfilm
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}