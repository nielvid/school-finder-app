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
      
    const response = await axios.post('https://staging-api.filmmakersmart.com/utility/get-signed-url', data, {
      headers:{
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyQGZpbG1tYWtlcnNtYXJ0LmNvbSIsInVzZXJJZCI6ImQwMTc3YzUwLTljMmMtNDMzNi04NDQzLWY5OWYyMDcwMGZkOCIsInJvbGUiOiJzdXBlciBhZG1pbiIsImZpcnN0TmFtZSI6IlN1cGVyIiwibGFzdE5hbWUiOiJTdXBlciIsImlhdCI6MTY0Nzg3NDY1NywiZXhwIjoxNjUzMDU4NjU3LCJhdWQiOlsiYWxsIl0sImlzcyI6ImZpbG1tYWtlcnNtYXJ0Iiwic3ViIjoiYXV0aCJ9.qLWV4La6rfat67RoOM3IDbq14B8y-CD5z35b1XLRgGw`
      }
    })
    if (response) setStatus(response.statusText)
  
       console.log(response, "from server")
       console.log(response.data.data.data.signedRequest, 'url to upload to  aws s3')
       const toS3 = await axios.put(`${response.data.data.data.signedRequest}`, image.data)
    console.log(toS3, 'response from aws s3')
       
        
       
      
 setTimeout(()=>{
    setUrl(response.data.data.data.url)
}, 3000);

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
        <input type='file' name='file' onChange={handleFileChange} ></input>
        <button type='submit'>Submit</button>
      </form>
      {status && <h4>{status}</h4>}
    </div>
    <div>
      {url ? <img src={url} alt="image from aws"  width={50} height={50}/> : <p>loading...</p>}
    </div>
      </main>

     
    </div>
  )
}

export default Home
