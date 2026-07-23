#🤝 AI Powered Personalized Networking Assistant

## Project Overview

AI Powered Personalized Networking Assistant helps users generate intelligent networking conversation starters based on profile details, professional interests, and event descriptions. The backend is powered by FastAPI and Hugging Face models, while the frontend is built in Streamlit. The application also verifies facts using the Wikipedia API and preserves conversation history and feedback in JSON storage.

##🚀  Installation


1. Create a virtual environment:

   ```bash
   python -m venv venv
   ```

2. Activate the environment:

   Windows:
   ```bash
   venv\Scripts\activate
   ```

   Linux / macOS:
   ```bash
   source venv/bin/activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
```

## Run Commands

Start backend:

```bash
uvicorn app.main:app --reload
```

Start frontend:

```bash
streamlit run frontend/streamlit_app.py
```

## Swagger UI

Open: `http://127.0.0.1:8000/docs`

## Streamlit UI

Open: `http://localhost:8501`
###  Clone Repository

```bash
git clone https://github.com/yamu3697-creator/Personalized-Network-Assisstant


## Future Scope

- Replace GPT-2 with a higher-quality text generation model.
- Add database support for production-grade persistence.
- Add authentication and user management.
- Add deployment automation for Azure or AWS.
## 👨‍💻 Author

**MUTHYALA YAMINI**

Email : yamu3697@gmail.com

Roll No. : 23AK1A05O0

B.Tech CSE 

Course : Google Cloud Generative AI

AITS TIRUPATI

GitHub: https://github.com/yamu3697-creator

---

## 📜 License

This project was developed as part of an internship project for educational purposes.