"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1,{
    message:"At least 1 character is required.",
  }),
})

export const StoreModal = () =>{
  const storeModal = useStoreModal();

  const [loading,setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name:"",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //At the beginning, set loading is true to stop form's functionality, then set to true again at the end
    try{
      setLoading(true)
      
      const response = await axios.post('api/stores', values)

      toast.success("Store created.")

      //Instead of using router, since we want to   completely refresh the page while waiting for database loading.
      window.location.assign(`/${response.data.id}`)
      

    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }  

  return (
  <Modal
    title="Create store"
    description="Add a new store to manage products and categories"
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}
  >  
    <div>
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({field})=>(
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                    disabled={loading} placeholder="input" {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex justify-end items-center">
              <Button 
                disabled={loading}
                variant="outline"
                onClick={storeModal.onClose}>
                  Cancel
              </Button>
              <Button 
                disabled={loading}
                type="submit">
                  Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  </Modal>)
}