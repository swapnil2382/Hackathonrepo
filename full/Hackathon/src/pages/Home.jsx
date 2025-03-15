import React from 'react'
import '../css/Home.css'

const Home = () => {
  return (
    <div  className='home '>
    <h1 style={{fontSize:"60px",color:"white",paddingTop:"200px",paddingLeft:"100px"}}>Transform Your Digital<br></br> Presence</h1>
    <p style={{paddingLeft:"100px",color:"white"}}>We ctreate innovative solutions that helps businesses <br></br>grow,engage customers,and achieve their goals.</p>
    <div style={{paddingLeft:"100px"}} className='flex gap-4'>
    <a href="/investments"><button style={{backgroundColor:"#00bcd4",fontSize:"20px",borderRadius:"20px",fontWeight:"bold"}} className='p-3  '> Investment</button></a>
    <a href="/calculator"><button style={{backgroundColor:"#00bcd4",fontSize:"20px",borderRadius:"20px",fontWeight:"bold"}} className='p-3  '>Calculator</button></a>
    </div>
 <div className='h-screen'>
 </div>

  </div>
  )
}


export default Home
