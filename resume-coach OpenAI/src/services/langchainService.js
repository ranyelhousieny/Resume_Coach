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
  const RESPONSE_TOKENS = 1000;
  const MAX_TOTAL_TOKENS = 4000; // Conservative limit for GPT-4

  // Calculate available tokens for resume and job description
  const availableTokens = MAX_TOTAL_TOKENS - SYSTEM_PROMPT_TOKENS - RESPONSE_TOKENS;
  const tokensPerInput = Math.floor(availableTokens / 2);

  // Truncate inputs if necessary
  const truncatedResume = truncateText(resumeText, tokensPerInput);
  const truncatedJobDescription = truncateText(jobDescription, tokensPerInput);

  // Initialize the LLM with temperature and max tokens
  const model = new ChatOpenAI({
    modelName: "gpt-4-0125-preview",
    temperature: 0.7,
    openAIApiKey: apiKey,
    maxTokens: RESPONSE_TOKENS,
  });

  // Create the prompt template with clear instructions
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", `You are a professional resume coach with deep expertise in talent acquisition and career development. 
Analyze the resume and job description provided, focusing on strategic improvements that will maximize the candidate's chances.

Provide detailed, actionable feedback in these key areas:

1. Skills Alignment
   - Identify missing critical skills
   - Suggest ways to highlight relevant existing skills
   - Recommend skill development priorities

2. Experience Impact
   - Evaluate achievement descriptions
   - Suggest metrics and quantifiable results
   - Recommend stronger action verbs

3. Keywords and ATS Optimization
   - Match resume keywords with job requirements
   - Suggest industry-standard terminology
   - Improve searchability for ATS systems

4. Format and Presentation
   - Assess layout and readability
   - Check professional conventions
   - Suggest structural improvements

Keep your response structured, specific, and actionable. Focus on high-impact changes that will make the candidate more competitive for this specific role.`],
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
