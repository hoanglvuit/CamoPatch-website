from fastapi import FastAPI
import api
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Inference API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Cổng Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(api.router, prefix="", tags=["AI"])