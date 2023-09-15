'use client'

import {toast} from "react-toastify"
import { useEffect } from "react";


export default function Toast(error){
    useEffect(() => {
        // Get the value from local storage if it exists
        const result = localStorage.getItem('result')|| "";
        if (result){

        const resultObj = JSON.parse(result)
          toast(resultObj.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          localStorage.removeItem('result')
        }
        if (error.retrieve === true){
          toast('failed to fetch posts', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        
      }, [])
      return(
        <>
        </>
      )
}




//add error vs success