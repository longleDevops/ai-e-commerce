"use client"

import {useEffect, useState} from "react";

import {StoreModal} from "@/components/modals/store-modal"

//Avoid the hydration error trick
export const ModalProvider = () => {
  
  const[isMounted, setIsMounted] = useState(false);

  useEffect(()=>{
    setIsMounted(true)
  },[])
  
  if (!isMounted) {
    return null;
  }

  return (
    
    <>
      <StoreModal/>
    </>
  )
}