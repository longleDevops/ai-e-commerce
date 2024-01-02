import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
"use client"

import {Modal} from "@/components/ui/modal"

export default function Home() {
  return (
    <div className="p-4">
      <Modal title="Test" description="Test desc" isOpen onClose={()=>{}}>
        Children
      </Modal>
    </div>
  )
}
