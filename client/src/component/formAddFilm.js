import clip from '../icons/Clip.png'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '../config/api'
import {Alert} from 'react-bootstrap'


export default function FormAdd(){
    const [preview, setPreview] = useState(null)
    const [category, setCategory] = useState([])
    const[message, setMessage] = useState(null)
    const Navigate = useNavigate()


    const getCategory = async (e) =>{
        try {
            const response = await API.get("category")
            console.log(response)
            setCategory(response.data.categories)
            
        } catch (error) {
            console.log(error)
        }
    }
    const [form, setForm] = useState({
        title:"",
        idCategory:"",
        price : "",
        filmUrl: "",
        description : "",
        thumbnail : ""
    })

    const handleChange= (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.type ? e.target.files : e.target.value
        })

        if(e.target.type === 'file'){
            let url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }

    const handleSubmit = async (e) =>{
        try {
            e.preventDefault();

            const config = {
                headers: {
                  'Content-type': 'multipart/form-data',
                },
              };

              const formData = new FormData()
              console.log(formData)

              formData.set('thumbnail', form.thumbnail[0], form.thumbnail[0].name)
              formData.set('title', form.title)
              formData.set('idCategory', parseInt(form.idCategory))
              formData.set('price', form.price)
              formData.set('filmUrl', form.filmUrl)
              formData.set('description', form.description)
            
              const response = await API.post('/film', formData, config)
              
              console.log(response)
              console.log(formData)

            // Navigate('/admin')

              const alert = (
                <Alert variant="success" className="py-1">
                  Add Film success
                </Alert>
              );
              setMessage(alert);

        } catch (error) {
            console.log(error)
            const alert = (
                <Alert variant="danger" className="py-1">
                  Add Film failed
                </Alert>
              );
              setMessage(alert);
              setForm({
                title:"",
                price : "",
                filmUrl: "",
                description : "",
                thumbnail : ""
              })
            
        }
    }

    useEffect(()=>{
        getCategory()
    },[])

    return (
        <div className="d-flex form-add">
        <form onSubmit={handleSubmit}>
            <h2 style={{color:"white"}}>Add Film</h2>
            {message && message}
            {preview === null ? (<></>) : (
                <div>
                  <img
                    src={preview}
                    style={{
                      width: '150px',
                      maxHeight: '150px',
                      objectFit: 'cover',
                    }}
                    alt="preview"
                  />
                </div>
              )}
            <div>
                <input type="text" name='title' placeholder="Title" className="form-title" onChange={handleChange}/>
                <label htmlFor="file"> Attach Thumbnail <img src={clip} alt="clipboard"/> </label>
                <input type="file" id="file" name='thumbnail' hidden onChange={handleChange}/>
            </div> 
            <div>
                    <select id='select' as="select" name="idCategory" onChange={handleChange} className="formInput">
                        {category?.map((item) =>(
                            <option value={item.id} key={item.id}>{item.name} </option>
                        ))}
                    </select>
            </div>
            <div>
                <input type="text" placeholder="Price" name='price' className="formInput" onChange={handleChange}/>
            </div>
            <div>
                <input type="text" name='filmUrl' placeholder="Link Film" className="formInput" onChange={handleChange}/>
            </div>
            <div>
                <textarea type="text" name='description' placeholder="Description" onChange={handleChange}>

                </textarea>
            </div>
            <div className='mt-3' style={{textAlign:"right"}}>
                <button className='btn-add'>Add Film</button>
                
            </div>
        </form>
        </div>
    )
}