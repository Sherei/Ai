import React, { useEffect, useState } from 'react'
import {BsFillBrightnessHighFill} from 'react-icons/bs'
import "./navbar.css"
const Navbar = () => {

    let [theme, setTheme]= useState('light')

    let SetTheme=()=>{
        if(theme==="dark"){
            setTheme("light")
        }else{
            setTheme('dark')
        }   
    }
    useEffect(()=>{
        document.body.className=theme;
    })
    
    return <>

        <div className='container-fluid'>
            <div className='row '>
                <div className='col-lg-12 col-sm-12' >
                    <div className='d-flex justify-content-center gap-5 py-3 navbar' >
                        <div className='menu'>Home</div>
                        <div className='menu'>About</div>
                        <div className='menu'>Services</div>
                        <div className='menu'>Login</div>
                        <div className='menu' onClick={()=>SetTheme()}><BsFillBrightnessHighFill/></div>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default Navbar