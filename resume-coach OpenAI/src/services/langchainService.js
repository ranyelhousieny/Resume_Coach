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
  const SYSTEM_PROMPT_TOKENS = 200;
  const RESPONSE_TOKENS = 800;
  const MAX_TOTAL_TOKENS = 4000; // Using a smaller limit for gpt-3.5-turbo

  // Calculate available tokens for resume and job description
  const availableTokens = MAX_TOTAL_TOKENS - SYSTEM_PROMPT_TOKENS - RESPONSE_TOKENS;
  const tokensPerInput = Math.floor(availableTokens / 2);

  // Truncate inputs if necessary
  const truncatedResume = truncateText(resumeText, tokensPerInput);
  const truncatedJobDescription = truncateText(jobDescription, tokensPerInput);

  // Initialize the LLM with temperature and max tokens
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
    openAIApiKey: apiKey,
    maxTokens: RESPONSE_TOKENS,
  });

  // Create the prompt template with clear instructions
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", `You are a professional resume coach. Analyze the resume and job description provided, focusing on key improvements. 
Be concise and specific in your recommendations. Focus on:
1. Key missing skills and experiences
2. Important keywords from the job description
3. Suggested improvements for impact
4. Format and presentation tips

Keep your response structured and to the point.`],
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
      return response + "\n\nNote: The input texts were truncated to fit within token limits. Consider focusing on the most relevant sections of your resume and the key requirements from the job description.";
    }

    return response;
  } catch (error) {
    if (error.message.includes("rate_limit_exceeded")) {
      return "Error: The request exceeded OpenAI's rate limits. Please try again with a shorter resume and job description, or wait a minute before trying again.";
    }
    throw error;
  }
};