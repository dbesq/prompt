// USED IN PROFILE.JSX

import { connectToDb } from "@utils/database"

import Prompt from "@models/prompt"

//  'Params' since dynamic arguments passed
export const GET = async (req, { params }) => {

    try {
        await connectToDb()

        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator')

        return new Response(JSON.stringify(prompts, { status: 200 }))
    } catch (error) {
        console.log(`prompt/route.js error: ${error}`)
        return new Response('Failed to fetch all prompts', { status: 500 })
    }
}

