#/usr/bin/env python

import smtplib
from email.mime.text import MIMEText
import settings

# function to call for sending emails from our UNB server acount
def send_email(email_to, subject, body):

    msg = MIMEText(body, 'plain')
    msg['Subject'] = subject
    msg['From'] = settings.UNB_SMTP_USER
    msg['To'] = email_to

    try:
        s = smtplib.SMTP(settings.UNB_SMTP_HOST)
        s.sendmail(settings.UNB_SMTP_USER, email_to, msg.as_string())
        s.quit()
        return True
    except Exception as e:
        print(f"ERROR: Failed to send email: {e}")
        return False



