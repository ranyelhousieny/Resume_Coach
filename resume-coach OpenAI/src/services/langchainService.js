import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

// Helper function to estimate token count (rough estimate)
const estimateTokenCount = (text) => {
  // GPT typically uses ~4 characters per token
  return Math.ceil(text.length / 4);
};

// Helper function to truncate text to fit within token limit
const truncateText = (text, maxTokens) => {
  const currentTokens = estimateTokenCount(text);
  if (currentTokens <= maxTokens) return text;

  // If we need to truncate, do it by characters
  const maxChars = maxTokens * 4;
  return text.slice(0, maxChars) + "\n...(truncated for length)";
};

export const analyzeResume = async (resumeText, jobDescription, apiKey) => {
  // Reserve tokens for the system prompt and response

  const SYSTEM_PROMPT_TOKENS = 150;
  const RESPONSE_TOKENS = 500;
  const MAX_TOTAL_TOKENS = 2000; // Lower limit for mini model

  // Calculate available tokens for resume and job description
  const availableTokens = MAX_TOTAL_TOKENS - SYSTEM_PROMPT_TOKENS - RESPONSE_TOKENS;
  const tokensPerInput = Math.floor(availableTokens / 2);

  // Truncate inputs if necessary
  const truncatedResume = truncateText(resumeText, tokensPerInput);
  const truncatedJobDescription = truncateText(jobDescription, tokensPerInput);

  // Initialize the LLM with temperature and max tokens
  const model = new ChatOpenAI({

    modelName: "gpt-4o-mini",
    temperature: 0.5, // Lower temperature for more focused responses
    openAIApiKey: apiKey,
    maxTokens: RESPONSE_TOKENS,
  });


  // Create the prompt template with concise instructions
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", `As a resume coach, analyze the resume and job description. Focus on:
1. Skills match and gaps
2. Experience relevance
3. Key achievements
4. Format improvements

Be concise and specific.`],
    ["user", "Resume:\n{resume_text}\n\nJob Description:\n{job_description}"]
  ]);

  // Create and execute the chain
  const chain = prompt.pipe(model).pipe(new StringOutputParser());
  
  try {
    const response = await chain.invoke({
      resume_text: truncatedResume,
      job_description: truncatedJobDescription
    });

    // If texts were truncated, add a note to the response
    const wasTruncated = truncatedResume !== resumeText || truncatedJobDescription !== jobDescription;
    if (wasTruncated) {

      return response + "\n\nNote: Some content was truncated. Focus on key skills and requirements.";
    }

    return response;
  } catch (error) {
    if (error.message.includes("rate_limit_exceeded")) {

      return "Error: Rate limit exceeded. Please try again with shorter content or wait a moment.";
    }
    if (error.message.includes("model_not_found")) {
      // Fallback to GPT-3.5-turbo if gpt-4o-mini is not available
      const fallbackModel = new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
        temperature: 0.5,
        openAIApiKey: apiKey,
        maxTokens: RESPONSE_TOKENS,
      });
      const fallbackChain = prompt.pipe(fallbackModel).pipe(new StringOutputParser());
      const fallbackResponse = await fallbackChain.invoke({
        resume_text: truncatedResume,
        job_description: truncatedJobDescription
      });
      return fallbackResponse + "\n\nNote: Using fallback model due to availability.";
    }
    throw error;
  }
};
