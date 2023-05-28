'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'

const EditPrompt = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const promptId = searchParams.get('id')

    const [submitting, setSubmitting] = useState(false) 
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    // Fire if promptId changes
    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()

            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        // Call function only if promptId exists
        if(promptId) getPromptDetails()
    }, [promptId])

    const editPrompt = async (e) => {
        e.preventDefault()

        setSubmitting(true)

        if(!promptId) return alert(`Prompt Id not found.`)

        // Pass data to api endpoint
        // Data from Form.jsx
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if(response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(`Problem creating post in update-prompt/page.jsx: ${error}`)
        } finally {
            setSubmitting(false)
        }
    }

  return (
    <Form
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={editPrompt}
    />
  )
}

export default EditPrompt