# backend/utils/email.py
def send_email(to_email: str, message: str):
    # Mock implementation - print to console (real: use SMTP or email service)
    print(f"Sending email to {to_email}: {message}")