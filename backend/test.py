import replicate
model = replicate.models.get("stability-ai/stable-diffusion")
result = model.predict(prompt="a cavapoo walking in sunshine together with a shiba inu")
print(result)