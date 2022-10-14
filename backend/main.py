from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import replicate

import os

class Request(BaseModel):
    model: str
    prompt: str
    
class Response(BaseModel):
    image: str
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
API_TOKEN = os.getenv('REPLICATE_API_TOKEN')
replicate_client = replicate.Client(api_token=API_TOKEN)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/generate", response_model=Response)
async def generate_image(request: Request):
    image, error = "", ""
    if request.model == "stable-diffusion":
        try:
            image = stable_diffusion_generator(request.prompt)
        except Exception as e:
            print(e)
            image = ""
            error = "Couldn't generate image"
    elif request.model == 'dall-e-2':
        try:
            image = dalle2_generator(request.prompt)
        except Exception as e:
            print(e)
            image = ""
            error = "Couldn't generate image"
    else:
        error = "Only support DALL-E 2 and Stable Diffusion"

    return Response(image=image, error=error)


def stable_diffusion_generator(prompt: str):
    model = replicate_client.models.get("stability-ai/stable-diffusion")
    result = model.predict(prompt=prompt)
    return result[0]
    
def dalle2_generator(prompt: str):
    return ""