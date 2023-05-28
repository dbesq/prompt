import mongoose, { Schema, model, models } from 'mongoose'

const PromptSchema = new Schema ({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference.  1-to-Many relationship.  1 User can make lots of prompts
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required.']
    },
    tag: {
        type: String,
        required: [true, 'Tag is required']
    }
})

// Check models array and see if 'Prompt' is there (b/c not always on and dont want to re-create the model)
const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt
