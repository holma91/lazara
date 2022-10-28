import replicate
from dotenv import load_dotenv
from dalle2 import Dalle2

import os

load_dotenv()
OPENAI_API_TOKEN = os.getenv('OPENAI_API_TOKEN')
dalle_client = Dalle2(OPENAI_API_TOKEN) # your bearer key

model = replicate.models.get("stability-ai/stable-diffusion")
result = model.predict(prompt="a cavapoo walking in sunshine together with a shiba inu", num_outputs=4)
print(result)

# generations = dalle_client.generate("portal to another dimension, digital art")
# for task in generations:
    # print(task['generation']['image_path'] + '\n')