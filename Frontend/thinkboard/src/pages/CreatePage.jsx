import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, Navigate, useNavigate } from 'react-router'
import axios from 'axios';
import api from '../lib/axios'

const CreatePage = () => {
    const [title,seTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!title.trim() || !content.trim()){
            toast.error("All fields are required")
            return
        }
        setLoading(true)
        try {
            await api.post('/Notes',{title,content})
            toast.success("Note Created Successfully");
            navigate('/');
        } 
        catch (error) {
            toast.error("Failed to Create Note")
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className='min-h-screen bg-base-200'>
    <div className='container max-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
            <Link to ={'/'} className='btn btn-ghost mb-6'>
                <ArrowLeftIcon className='size-5'/>Back to notes
            </Link>

            <div className='card bg-base-100'>
                <div className='card-body'>
                    <h2 classname='card-title text-2xl mb-4'>Create New Note</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='form-control mb-4'>
                        <label className='label'>
                            <sapn classname='label-text'>Title</sapn>
                        </label>
                        <input type = 'text' placeholder='Note Title' 
                            className='input input-borded'
                            value={title} onChange={(e) => seTitle(e.target.value)} >
                        </input>
                        </div>
                        <div className='form-control mb-4'>
                        <label className='label'>
                            <sapn classname='label-text'>Content</sapn>
                        </label>
                        <textarea placeholder='write your content here' 
                            className='textarea textarea-borded h-32'
                            value={content} onChange={(e) => setContent(e.target.value)} >
                        </textarea>
                        </div>
                        <div className='card-actions justify-end'>
                            <button type='submit' className='btn btn-primary' disabled={loading}>
                                {loading? "Creating....." : "Creat Note"} 
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default CreatePage
