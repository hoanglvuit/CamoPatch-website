from fastapi import APIRouter, UploadFile, File, Form

from PIL import Image
from io import BytesIO
import torch
import io
from PIL import Image
from src.utils import *
from src.model import SignNN 
from src.loss_function import UnTargeted_idealW, UnTargeted_realW
from src.attack import Attack_idealW, Attack_realW
import base64



router = APIRouter()

device = 'cuda' if torch.cuda.is_available() else 'cpu'
# load model 
model = SignNN()
model.load_state_dict(torch.load('best_f1.pt'))
model.eval() 

async def predict_image(model, img_tensor):
    logits, label = model.predict_maxprob(img_tensor) 
    return label

@router.post("/predict") 
async def predict( file: UploadFile = File(...)): 
    contents = await file.read()
    img_tensor = transform(Image.open(BytesIO(contents))) 
    img_tensor = img_tensor.unsqueeze(0)
    label = await predict_image(model, img_tensor)
    return label

@router.post("/attack")
async def attack(file: UploadFile = File(...),true_label: int = Form(...), n_queries: int=Form(...), mode: str = Form(...)): 
    contents = await file.read()
    image = transform(Image.open(BytesIO(contents)))
    x =  pytorch_switch(image).detach().numpy()
    params = {
        "x": x,
        "s": 20,
        "n_queries": n_queries,
        "save_directory": 'saved_log',
        "c": x.shape[2],
        "h": x.shape[0],
        "w": x.shape[1],
        "N": 100,
        "update_loc_period": 4,
        "mut": 0.3,
        "temp": 300, 
    } 
    if mode == 'ideal': 
        attack = Attack_idealW(params)
        loss = UnTargeted_idealW(model, true_label)
    else: 
        attack = Attack_realW(params)
        loss = UnTargeted_realW(model, true_label)
    x_adv = await attack.optimise(loss)
   
    img_uint8 = (x_adv * 255).astype(np.uint8)

    # Chuyển sang ảnh PIL
    image = Image.fromarray(img_uint8)

    # Ghi vào bộ nhớ
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    buffer.seek(0)

    # Mã hóa base64
    img_base64 = base64.b64encode(buffer.read()).decode('utf-8')

    return f"data:image/png;base64,{img_base64}"
