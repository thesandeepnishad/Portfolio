import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import emailjs from '@emailjs/browser'
const ContactForm = () => {
    const initialValues = {
        name: '',
        email: '',
        subject: '',
        message: '',
    }
    const contactFormSchema = Z.object({
        name: Z.string().nonempty('Name is required'),
        email: Z.string().email('Invalid email address').nonempty('Email is required'),
        subject: Z.string().nonempty('Subject is required'),
        message: Z.string().nonempty('Message is required'),
    })
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        defaultValues: initialValues,
        resolver: zodResolver(contactFormSchema),
    })

    const [loading, setLoading] = useState(false);
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const payload = {
                title: data.subject,
                name: data.name,
                email: data.email,
                message: data.message,
                time: new Date().toLocaleString(),

            }
            const serviceId = import.meta.env.VITE_SERVICE_ID;
            const templateId = import.meta.env.VITE_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_PUBLIC_KEY;

            await emailjs.send(serviceId, templateId, payload, {
                publicKey,
            });
            reset(initialValues);
            alert("Message sent successfully");
        } catch (err) {
            console.error(err);
            alert("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        console.log(errors)
    }, [errors])
  return (
    <div className='flex-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-7' style={{ color: 'var(--c-text)' }}>
            <div className="">
                <label className='label' htmlFor="name">Name</label>
                <input {...register('name')} type="text" name="name" id="name" placeholder='Enter your name' className='input'/>
                {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
            </div>
            <div className="">
                <label className='label' htmlFor="name">Email address</label>
                <input {...register('email')} type="email" name="email" id="email" placeholder='Enter your email address' className='input'/>
                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>
            <div className="">
                <label className='label' htmlFor="name">Subject</label>
                <input {...register('subject')} type="text" name="subject" id="subject" placeholder='Enter your subject' className='input'/>
                {errors.subject && <p className='text-red-500'>{errors.subject.message}</p>}
            </div>
            <div className="">
                <label className='label' htmlFor="message">Message</label>
                <textarea {...register('message')} rows={5} name="message" id="message" placeholder='Enter your message' className='input'></textarea>
                {errors.message && <p className='text-red-500'>{errors.message.message}</p>}
            </div>
            <button type='submit' disabled={loading} className={`text-white px-4 py-4 rounded-md transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""}`} style={{ backgroundColor: 'var(--c-accent)' }}>
                {loading ? "Sending..." : "Send Message"}
            </button>
        </form>
    </div>
  )
}

export default ContactForm