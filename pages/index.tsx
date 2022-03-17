import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'

const Home: NextPage = () => {

  const [image, setImage] = useState({ preview: '', data: '' })
  const [data, setData] = useState({ name: '', type: '' })
   const [url, setUrl] = useState('')
  const [status, setStatus] = useState('')
  const handleSubmit = async (e:any) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', image.data)
   
    console.log(image.data, "image")
   
      console.log(data, "name and type")
      
    const response = await axios.post('http://localhost:3010/utility/get-signed-url', data, {
      headers:{
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR5ZUBnbWFpbC5jb20iLCJ1c2VySWQiOiIzMjFjYjc1MC1iYTdkLTRlYjgtODZkNS1iYTIyMzBjMWNhNjYiLCJyb2xlIjoiY2xpZW50IiwiZmlyc3ROYW1lIjoiWWVzamoiLCJsYXN0bmFtZSI6Ikdpc3N5aGgiLCJpYXQiOjE2NDU1MzUzMjcsImV4cCI6MTY1MDcxOTMyN30.RHfuJEmd6nlZPq9jvteIt4THYwCJablnSbomYEzR_Ec`
      }
    })
    if (response) setStatus(response.statusText)
  
       console.log(response, "from server")
       console.log(response.data.data, 'url to upload to  aws s3')

      //  setUrl(response.data.data.data.url)
 
const toS3 = await axios.put(`${response.data.data.data}`, image.data)
    console.log(toS3, 'response from aws s3')
  }
  

  const handleFileChange = (e:any) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }

     const data  = {
      name: e.target.files[0].name,
      type: e.target.files[0].type
    }

    setImage(img)
     setData(data)
  }
  
  

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex-auto'>
      Home page
    <div>
      <h1>Upload to server</h1>
      {image.preview && <img src={image.preview} width='100' height='100' />}
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <input type='file' name='file' onChange={handleFileChange}></input>
        <button type='submit'>Submit</button>
      </form>
      {status && <h4>{status}</h4>}
    </div>
    {/* <div>
      <img src={url} alt="image from aws" />
    </div> */}
      </main>

     
    </div>
  )
}

export default Home
