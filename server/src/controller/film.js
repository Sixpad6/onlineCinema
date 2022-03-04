const { film, category } = require('../../models')

exports.addFilm = async (req, res) =>{
    try {
        const data = req.body
        let newFilm = await film.create({
            ...data,
            thumbnail: req.file.filename
        }, {
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

        let getfilm = await film.findAll({
            attributes :{
                exclude: ["createdAt", "updatedAt"]
            },
            include :{
                model : category,
                as : "category",
                attributes :{
                    exclude : ["createdAt", "updatedAt"]
                }
            },
            order: [["createdAt", "DESC"]]
            })


        const path = "http://localhost:5000/uploads/"
        getfilm = JSON.parse(JSON.stringify(getfilm))

        getfilm = getfilm.map((item)=>{
            return{
                ...item,
                thumbnail : path + item.thumbnail
            }
        })
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

exports.getFilmById = async (req,res) =>{
    try {
        const { id } = req.params
        let filmId = await film.findOne({
            where : {
                id
            },
            attributes:{
                exclude : ["createdAt", "updatedAt"]
            },
            include:{
                model : category,
                as : "category",
                attributes :{
                    exclude : ["createdAt", "updatedAt"]
                }
            }
        })

        filmId = JSON.parse(JSON.stringify(filmId))

        res.send({
            status: 'success...',
            filmId
        })
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}
