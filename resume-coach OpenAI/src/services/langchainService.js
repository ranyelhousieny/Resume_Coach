import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

export const analyzeResume = async (resumeText, jobDescription, apiKey) => {
  // Initialize the LLM
  const model = new ChatOpenAI({
    modelName: "gpt-4",
    temperature: 0.7,
    openAIApiKey: apiKey,
  });

  // Create the prompt template
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a professional resume coach with expertise in helping people improve their resumes to match job descriptions. Analyze the resume and job description provided, then give detailed, actionable advice for improvement. Focus on:\n1. Key skills alignment\n2. Experience relevance\n3. Missing keywords\n4. Format and presentation\n5. Specific suggestions for improvement"],
    ["user", "Resume:\n{resume_text}\n\nJob Description:\n{job_description}"]
  ]);

  // Create and execute the chain
  const chain = prompt.pipe(model).pipe(new StringOutputParser());
  
  return await chain.invoke({
    resume_text: resumeText,
    job_description: jobDescription
  });
};