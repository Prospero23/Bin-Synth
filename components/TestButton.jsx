'use client'

import { toast } from "react-toastify";

export default function TestButton() {
    const onClick = () => toast('Toast is good', { hideProgressBar: true, autoClose: 2000, type: 'success' })
  return(
    <button className="text-center text-2xl" onClick={onClick}>
      SUP
    </button>
  )
  
}
