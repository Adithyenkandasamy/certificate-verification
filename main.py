from fastapi import FastAPI, HTTPException, BackgroundTasks, Depends
from pydantic import BaseModel, EmailStr
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from jinja2 import Template
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from secret import sender_email, sender_password

# SQLAlchemy setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"  # Replace with your DB URL
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# 
Base = declarative_base()

# Database model for certificates
class Certificate(Base):
    __tablename__ = "certificates"
    id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String, index=True)
    course_name = Column(String)
    completion_date = Column(String)
    email = Column(String)

# Create tables
Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI()

# Dependency for database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Models for API requests
class CertificateData(BaseModel):
    student_name: str
    course_name: str
    completion_date: str
    email: EmailStr

class VerifyCertificateData(BaseModel):
    student_name: str
    course_name: str
    completion_date: str

# Certificate generation HTML template
def generate_certificate_html(student_name, course_name, completion_date):
    template = Template("""
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate of Completion</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f4f4f9;
        }
        .certificate-container {
            border: 5px solid #000;
            padding: 30px;
            width: 700px;
            background-color: #fff;
            text-align: center;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }
        h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        .company-name {
            font-size: 1.2em;
            margin-bottom: 20px;
        }
        p {
            font-size: 1.5em;
            margin: 30px 0;
        }
        .completion-details {
            font-size: 1.1em;
            margin-top: 40px;
        }
    </style>
</head>
<body>
    <div class="certificate-container">
        <h1>Certificate of Completion</h1>
        <div class="company-name">
            Awarded by: <strong>SNS</strong>
        </div>
        <p>This certifies that <strong>{{ student_name }}</strong> has successfully completed the course <strong>{{ course_name }}</strong> on <strong>{{ completion_date }}</strong>.</p>
        <div class="completion-details">
            <p>Congratulations on your achievement!</p>
        </div>
    </div>
</body>
</html>

    """)
    return template.render(student_name=student_name, course_name=course_name, completion_date=completion_date)

# Function to send certificate email
def send_certificate_email(email: str, certificate_html: str):
    receiver_email = email
    sender_email = "adithyen1@gmail.com"
    sender_password = "irvmx zcuj fvgs lpsn"
    
    # Create email
    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Your Course Completion Certificate"
    msg["From"] = sender_email
    msg["To"] = receiver_email

    # Attach certificate HTML to email
    part = MIMEText(certificate_html, "html")
    msg.attach(part)

    # Send email
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, msg.as_string())
    except Exception as e:
        print(f"Failed to send email: {e}")

# Endpoint to generate certificate
@app.post("/generate_certificate")
async def generate_certificate(data: CertificateData, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    # Generate certificate HTML
    certificate_html = generate_certificate_html(data.student_name, data.course_name, data.completion_date)
    
    # Save certificate to the database
    new_certificate = Certificate(
        student_name=data.student_name,
        course_name=data.course_name,
        completion_date=data.completion_date,
        email=data.email
    )
    db.add(new_certificate)
    db.commit()
    db.refresh(new_certificate)

    # Send certificate email in background
    background_tasks.add_task(send_certificate_email, data.email, certificate_html)

    return {"message": "Certificate generated and email sent successfully!"}

# Endpoint to verify certificate
@app.post("/verify_certificate")
async def verify_certificate(data: VerifyCertificateData, db: Session = Depends(get_db)):
    # Query certificate from database
    certificate = db.query(Certificate).filter(
        Certificate.student_name == data.student_name,
        Certificate.course_name == data.course_name,
        Certificate.completion_date == data.completion_date
    ).first()

    if certificate:
        return {"message": "Certificate verified successfully!"}
    else:
        raise HTTPException(status_code=404, detail="Certificate not found.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
