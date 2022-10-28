from fastapi import FastAPI
from typing import List, Union
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import replicate
from dalle2 import Dalle2

import os

class Request(BaseModel):
    model: str
    prompt: str
    outputs: int
    
class Response(BaseModel):
    images: List[str]
    error: str
    

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()
REPLICATE_API_TOKEN = os.getenv('REPLICATE_API_TOKEN')
OPENAI_API_TOKEN = os.getenv('OPENAI_API_TOKEN')
replicate_client = replicate.Client(api_token=REPLICATE_API_TOKEN)
dalle_client = Dalle2(OPENAI_API_TOKEN) 

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/generate", response_model=Response)
async def generate_image(request: Request):
    images, error = [], ""
    if request.model == "stable-diffusion":
        try:
            images = stable_diffusion_generator(request.prompt, request.outputs)
        except Exception as e:
            print(e)
            images = []
            error = "Couldn't generate images"
    else:
        error = "Only support Stable Diffusion at the moment."

    return Response(images=images, error=error)


def stable_diffusion_generator(prompt: str, outputs: int):
    model = replicate_client.models.get("stability-ai/stable-diffusion")
    result = model.predict(prompt=prompt, num_outputs=outputs)
    return result
    
def dalle2_generator(prompt: str):
    tasks = dalle_client.generate(prompt)
    results = []
    for task in tasks:
        results.append(task['generation']['image_path'])
    return results