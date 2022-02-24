const { category } = require ('../../models')

exports.getCategory = async (req, res) =>{
    try {

        const categories = await category.findAll()

        res.send({
            status: 'success',
            categories
        })
        
        
    } catch (error) {
        console.log(error)
        res.send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}