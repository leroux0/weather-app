# backend/utils/email.py
def send_alert(to_email: str, message: str) -> None:
    """Mock email sender—prints to console for dev. Replace with SMTP in prod."""
    print(f"[ALERT] To: {to_email} | Message: {message}")
    # Real: from smtplib import SMTP; etc.