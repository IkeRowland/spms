import random
import string
from django.core.mail import send_mail


def generate_random_password(length=8):
    """Generate a random password."""
    characters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(characters) for _ in range(length))


def send_password_email(email, password):
    """Send password to the lecturer's email."""
    subject = 'Initial SPMS Login Credentials'
    message = f"You have been added as a Lecturer in the SPMS Portal. Use the email: {email} and password: {password} as your initial login credential for spms. Please don't forget to change this password."
    from_email = ''
    send_mail(subject, message, from_email, [email])


def send_results_notification(emailList, course_name):
    """Notify students when there are Updates on Results."""
    subject = 'SPMS Results Updates'
    message = f"{course_name} results has been updated. Please check the changes on your student's portal."
    from_email = ''
    send_mail(subject, message, from_email, emailList)
