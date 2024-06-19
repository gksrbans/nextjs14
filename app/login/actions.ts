"use server";

import { redirect } from "next/navigation";
import {
    PASSWORD_MIN_LENGTH,
    PASSWORD_REGEX,
    PASSWORD_REGEX_ERROR,
  } from "../lib/constants";
  import { z } from "zod";

const formSchema = z.object({
    email:z.string().email().toLowerCase(),
    password: z.string({
        required_error: "password is required"
    }).min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX)
})

export async function logIn(prevState: any, formData: FormData) {
    console.log(prevState, 'this')
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
        
    };
    const result = formSchema.safeParse(data);

    if(!result.success) {
        console.log(result.error.flatten())
        return result.error.flatten();
    } else {
        console.log(result.data)
    }
    
}