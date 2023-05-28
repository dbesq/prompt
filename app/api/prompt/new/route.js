// API TO CREATE NEW PROMPT - USED IN CREATE-PROMPT/PAGE.JSX

import { connectToDb } from "@utils/database"

import Prompt from "@models/prompt"

export const POST = async (req, res) => {
    const { userId, prompt, tag } = await req.json()

    try {
        await connectToDb()
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        console.log(`prompt/new/route.js error: ${error}`)
        return new Response('Failed to create a new prompt', { status: 500 })
    }
}



