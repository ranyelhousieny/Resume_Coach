from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser

load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResumeRequest(BaseModel):
    resume_text: str
    job_description: str

@app.post("/analyze")
async def analyze_resume(request: ResumeRequest):
    try:
        # Initialize the LLM
        llm = ChatOpenAI(
            model="gpt-4",
            temperature=0.7,
            api_key=os.getenv("OPENAI_API_KEY")
        )

        # Create the prompt template
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a professional resume coach with expertise in helping people improve their resumes to match job descriptions. Analyze the resume and job description provided, then give detailed, actionable advice for improvement. Focus on:
1. Key skills alignment
2. Experience relevance
3. Missing keywords
4. Format and presentation
5. Specific suggestions for improvement"),
            ("user", "Resume:\n{resume_text}\n\nJob Description:\n{job_description}")
        ])

        # Create the chain
        chain = prompt | llm | StrOutputParser()

        # Run the chain
        response = chain.invoke({
            "resume_text": request.resume_text,
            "job_description": request.job_description
        })

        return {"advice": response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}