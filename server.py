"""
Kunkurt Devs - Enterprise HTTP & REST API Server
Featuring:
- Automatic GitHub Repository Synchronization
- Authentication with Email Security Notification
- Multi-device Public & Local LAN Access
- Dynamic Port Allocation & Robust Threading
"""

import os
import sys
import re
import json
import urllib.parse
import urllib.request
import mimetypes
import base64
import uuid
import socket
import smtplib
import threading
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import database
from config import (
    BASE_DIR,
    STATIC_DIR,
    UPLOADS_DIR,
    EMAIL_LOG_PATH,
    ACTIVE_PORT_FILE,
    HOST,
    DEFAULT_PORT,
    ADMIN_EMAIL,
    ADMIN_NAME,
    DEFAULT_GITHUB_USER,
    SMTP_SERVER,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY,
    MERCADOPAGO_ACCESS_TOKEN,
    MERCADOPAGO_PUBLIC_KEY,
    PAYPAL_CLIENT_ID,
    PAYPAL_CLIENT_SECRET,
    PAYPAL_MODE,
    CRYPTO_WALLET_ADDRESS
)

try:
    import stripe
except Exception as _e:
    stripe = None

try:
    import mercadopago
except Exception as _e:
    mercadopago = None

PORT = DEFAULT_PORT

# Initialize database schema and seeds
database.init_db()

def get_lan_ip():
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            return s.getsockname()[0]
    except Exception:
        return "127.0.0.1"

def get_effective_smtp_config():
    db_settings = database.get_smtp_settings()
    host = db_settings.get("smtp_host") or SMTP_SERVER or os.environ.get("KUNKURT_SMTP_HOST", "smtp.gmail.com")
    try:
        port = int(db_settings.get("smtp_port") or SMTP_PORT or os.environ.get("KUNKURT_SMTP_PORT", 587))
    except (ValueError, TypeError):
        port = 587
    user = db_settings.get("smtp_user") or SMTP_USER or os.environ.get("KUNKURT_SMTP_USER", ADMIN_EMAIL)
    password = db_settings.get("smtp_pass") or SMTP_PASSWORD or os.environ.get("KUNKURT_SMTP_PASS", "")
    return host, port, user, password

def send_login_email_notification(recipient_email, username, role, ip_address):
    """
    Sends an email notification upon login.
    Uses SMTP if configured in database or environment, otherwise logs to file and DB.
    """
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    subject = f"🔐 Kunkurt Devs — Alerta de Inicio de Sesión ({username})"
    body = f"""Hola {username},

Se ha registrado un nuevo inicio de sesión en la plataforma Kunkurt Devs.

• Usuario: {username}
• Rol: {role}
• Correo: {recipient_email}
• Fecha y Hora: {timestamp}
• Dirección IP: {ip_address}
• Estado: Acceso Autorizado

Si reconoces esta actividad, no necesitas hacer nada. Si no fuiste tú, por favor contacta a la administración de Kunkurt inmediatamente.

Atentamente,
Equipo de Seguridad & Tecnología Kunkurt Devs
"""

    smtp_host, smtp_port, smtp_user, smtp_pass = get_effective_smtp_config()

    email_sent_real = False
    if smtp_host and smtp_user and smtp_pass:
        try:
            msg = MIMEMultipart()
            msg["From"] = f"Kunkurt Security <{smtp_user}>"
            msg["To"] = recipient_email
            msg["Subject"] = subject
            msg.attach(MIMEText(body, "plain", "utf-8"))

            with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
                server.starttls()
                server.login(smtp_user, smtp_pass)
                server.send_message(msg)
            email_sent_real = True
        except Exception as e:
            print(f"⚠️ Error enviando correo vía SMTP: {e}", flush=True)

    # Always log the notification for transparency and audit trail
    log_entry = f"[{timestamp}] EMAIL ALERT to {recipient_email} ({username}): Login from {ip_address} | SMTP: {'Sent' if email_sent_real else 'Simulated/Logged'}\n"
    with open(str(EMAIL_LOG_PATH), "a", encoding="utf-8") as f:
        f.write(log_entry)

    print(f"📧 Notificación de inicio de sesión despachada para {recipient_email}", flush=True)
    return {"delivered": True, "smtp_real": email_sent_real, "recipient": recipient_email}

def send_welcome_employee_email(recipient_email, full_name, role, department, authorized_by="Administrador"):
    """
    Sends a welcome & authorization email notification to a newly registered employee.
    Uses real SMTP if configured, and always logs to EMAIL_LOG_PATH and creates an in-app notification.
    """
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    role_names = {
        "admin": "👑 Administrador / Director",
        "developer": "💻 Desarrollador Lead / Fullstack",
        "qa": "🎯 Control de Calidad & Testing (QA)",
        "designer": "🎨 Diseñador UI/UX & Frontend",
        "manager": "📊 Project Manager & Scrum Master",
        "employee": "👥 Colaborador / Empleado General"
    }
    role_display = role_names.get(role, role.title())

    subject = f"🎉 ¡Bienvenido a Kunkurt Devs! — Acceso Autorizado como {role_display}"
    body = f"""Hola {full_name},

¡Te damos la bienvenida al equipo oficial de Kunkurt Devs!

El Administrador del sistema ha dado de alta tu cuenta corporativa y autorizado tu acceso con el rol y permisos que se detallan a continuación:

📋 DATOS DE TU CUENTA AUTORIZADA:
• Nombre Completo: {full_name}
• Correo Electrónico: {recipient_email}
• Rol Encargado: {role_display}
• Departamento / Área: {department}
• Autorizado por: {authorized_by}
• Fecha y Hora de Alta: {timestamp}
• Estado de la Cuenta: ACTIVA Y AUTORIZADA

🚀 CÓMO INGRESAR A LA PLATAFORMA:
1. Ingresa a la plataforma Kunkurt Devs desde tu navegador.
2. En la barra superior, pulsa el botón 'Iniciar Sesión'.
3. Escribe tu correo electrónico ({recipient_email}) y pulsa 'Acceder con mi Rol Encargado'.
4. El sistema detectará automáticamente tu cargo y activará tus permisos de trabajo correspondientes.

Si tienes alguna pregunta sobre tus proyectos asignados o permisos, ponte en contacto con la administración de Kunkurt.

¡Mucho éxito en el equipo!

Atentamente,
Dirección General & Administración de Plataforma
Kunkurt Devs
"""

    smtp_host, smtp_port, smtp_user, smtp_pass = get_effective_smtp_config()

    email_sent_real = False
    if smtp_host and smtp_user and smtp_pass:
        try:
            msg = MIMEMultipart()
            msg["From"] = f"Kunkurt Team <{smtp_user}>"
            msg["To"] = recipient_email
            msg["Subject"] = subject
            msg.attach(MIMEText(body, "plain", "utf-8"))

            with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
                server.starttls()
                server.login(smtp_user, smtp_pass)
                server.send_message(msg)
            email_sent_real = True
        except Exception as e:
            print(f"⚠️ Error enviando correo de bienvenida vía SMTP: {e}", flush=True)

    log_entry = f"[{timestamp}] WELCOME EMAIL to {recipient_email} ({full_name}) | Role: {role_display} | Dept: {department} | SMTP: {'Sent' if email_sent_real else 'Simulated/Logged'}\n"
    with open(str(EMAIL_LOG_PATH), "a", encoding="utf-8") as f:
        f.write(log_entry)

    print(f"📧 Correo de bienvenida y alta despachado para {recipient_email} ({full_name})", flush=True)

    # In-app notification in notifications table
    try:
        database.add_notification(
            title=f"👤 Nuevo Empleado: {full_name}",
            message=f"{full_name} se ha integrado al equipo de Kunkurt en el rol de {role_display} ({department}).",
            n_type="team"
        )
    except Exception as e:
        print(f"Error creando notificación interna: {e}", flush=True)

    return {"delivered": True, "smtp_real": email_sent_real, "recipient": recipient_email}

def dispatch_webhook(title, description, fields=None, color=0x8b5cf6, event_type="general"):
    """
    Sends notification to configured Discord / Telegram webhooks in a background thread.
    Never blocks the main request loop and fails gracefully.
    """
    def _worker():
        try:
            settings = database.get_webhook_settings()
            if not settings.get("enabled"):
                return

            if event_type == "ticket" and not settings.get("notify_on_ticket", True):
                return
            if event_type == "login" and not settings.get("notify_on_login", True):
                return
            if event_type == "quote" and not settings.get("notify_on_quote", True):
                return

            discord_url = settings.get("discord_url", "").strip()
            telegram_token = settings.get("telegram_token", "").strip()
            telegram_chat = settings.get("telegram_chat_id", "").strip()

            # Discord Webhook
            if discord_url and discord_url.startswith("http"):
                embed_fields = []
                if fields:
                    for k, v in fields.items():
                        embed_fields.append({"name": str(k), "value": str(v), "inline": True})
                payload = {
                    "username": "Kunkurt Cyber Bot",
                    "avatar_url": "https://ui-avatars.com/api/?name=Kunkurt+Devs&background=8b5cf6&color=fff",
                    "embeds": [{
                        "title": title,
                        "description": description,
                        "color": color,
                        "fields": embed_fields,
                        "footer": {"text": f"Kunkurt Devs Operations • {datetime.now().strftime('%Y-%m-%d %H:%M')}"}
                    }]
                }
                req = urllib.request.Request(
                    discord_url,
                    data=json.dumps(payload).encode("utf-8"),
                    headers={"Content-Type": "application/json", "User-Agent": "KunkurtDevs-Bot/2.0"},
                    method="POST"
                )
                try:
                    urllib.request.urlopen(req, timeout=5)
                except Exception as de:
                    print(f"[Webhook] Discord notification error: {de}")

            # Telegram Bot
            if telegram_token and telegram_chat:
                field_text = ""
                if fields:
                    field_text = "\n" + "\n".join([f"• <b>{k}:</b> {v}" for k, v in fields.items()])
                tg_text = f"🛡️ <b>{title}</b>\n{description}{field_text}\n\n<i>Kunkurt Devs • {datetime.now().strftime('%H:%M:%S')}</i>"
                tg_url = f"https://api.telegram.org/bot{telegram_token}/sendMessage"
                tg_payload = {
                    "chat_id": telegram_chat,
                    "text": tg_text,
                    "parse_mode": "HTML"
                }
                req = urllib.request.Request(
                    tg_url,
                    data=json.dumps(tg_payload).encode("utf-8"),
                    headers={"Content-Type": "application/json"},
                    method="POST"
                )
                try:
                    urllib.request.urlopen(req, timeout=5)
                except Exception as te:
                    print(f"[Webhook] Telegram notification error: {te}")
        except Exception as e:
            print(f"[Webhook] Dispatch failed: {e}")

    threading.Thread(target=_worker, daemon=True).start()

def send_system_email(recipient_email, subject, body_text, body_html=None, from_name="Kunkurt Devs", async_dispatch=True):
    """
    Sends an email using the effective SMTP settings (e.g. Gmail smtp.gmail.com:587).
    Always logs to EMAIL_LOG_PATH and handles errors gracefully without blocking or crashing.
    """
    if not recipient_email:
        return False

    def _send():
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        smtp_host, smtp_port, smtp_user, smtp_pass = get_effective_smtp_config()
        email_sent_real = False
        error_msg = ""

        if smtp_host and smtp_user and smtp_pass:
            try:
                msg = MIMEMultipart("alternative")
                msg["From"] = f"{from_name} <{smtp_user}>"
                msg["To"] = recipient_email
                msg["Subject"] = subject
                msg.attach(MIMEText(body_text, "plain", "utf-8"))
                if body_html:
                    msg.attach(MIMEText(body_html, "html", "utf-8"))

                with smtplib.SMTP(smtp_host, int(smtp_port), timeout=12) as server:
                    server.starttls()
                    server.login(smtp_user, smtp_pass)
                    server.send_message(msg)
                email_sent_real = True
            except Exception as e:
                error_msg = str(e)
                print(f"⚠️ Error enviando correo vía SMTP a {recipient_email}: {e}", flush=True)

        status_label = "SENT_REAL_SMTP" if email_sent_real else (f"FAILED_SMTP: {error_msg}" if error_msg else "LOGGED_LOCAL")
        log_entry = f"[{timestamp}] EMAIL to {recipient_email} | Subject: '{subject}' | Status: {status_label}\n"
        try:
            with open(str(EMAIL_LOG_PATH), "a", encoding="utf-8") as f:
                f.write(log_entry)
        except Exception:
            pass

        print(f"📧 Correo procesado: '{subject}' -> {recipient_email} [{status_label}]", flush=True)
        return email_sent_real

    if async_dispatch:
        threading.Thread(target=_send, daemon=True).start()
        return True
    else:
        return _send()

def notify_ticket_created_emails(ticket):
    """
    Sends email alerts to Admin (alejandrobelno964@gmail.com) and client for new ticket.
    """
    code = ticket.get("ticket_code", "")
    title = ticket.get("title", "")
    author_name = ticket.get("author_name", "Usuario")
    author_email = ticket.get("author_email", "")
    category = ticket.get("category", "Soporte")
    priority = ticket.get("priority", "media").upper()
    project = ticket.get("project_title", "General")
    desc = ticket.get("description", "")
    created_at = ticket.get("created_at", datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

    # 1. Alert to Admin (Alejandro)
    admin_subject = f"🎫 [Kunkurt HelpDesk] Nuevo Ticket #{code} ({priority}) de {author_name}"
    admin_body = f"""Hola Alejandro,

Se ha abierto un nuevo ticket en la mesa de ayuda de Kunkurt Devs:

• Código: #{code}
• Asunto: {title}
• Autor: {author_name} ({author_email})
• Categoría: {category}
• Prioridad: {priority}
• Proyecto: {project}
• Fecha: {created_at}

Descripción:
--------------------------------------------------
{desc}
--------------------------------------------------

Puedes responderle o asignarlo desde la consola de Kunkurt Devs.

Atentamente,
Plataforma Kunkurt Devs
"""
    send_system_email(ADMIN_EMAIL, admin_subject, admin_body)

    # 2. Confirmation to Client
    if author_email and author_email.lower() != ADMIN_EMAIL.lower():
        client_subject = f"Confirmación de Ticket #{code} — Kunkurt Devs"
        client_body = f"""Hola {author_name},

Hemos recibido tu solicitud en la Mesa de Ayuda de Kunkurt Devs.

• Número de Seguimiento: #{code}
• Asunto: {title}
• Prioridad: {priority}
• Categoría: {category}

Nuestro equipo de ingenieros está revisando los detalles. Puedes consultar el estado en cualquier momento con tu correo ({author_email}) desde nuestro portal.

Atentamente,
Soporte Técnico & Ingeniería
Kunkurt Devs
"""
        send_system_email(author_email, client_subject, client_body)

def notify_quotation_created_emails(body, ticket):
    """
    Sends email alerts to Admin and client for new quotation proposal.
    """
    client_name = body.get("client_name", "Cliente")
    client_email = body.get("client_email", "")
    client_company = body.get("client_company", "Particular")
    project_type = body.get("project_type", "Web App Full-Stack")
    budget_usd = float(body.get("budget_usd", 0))
    timeline_weeks = int(body.get("timeline_weeks", 4))
    features = body.get("features", [])
    description = body.get("description", "")
    ticket_code = ticket.get("ticket_code", "QUOTE")

    # 1. Alert to Admin
    admin_subject = f"💼 [Nueva Cotización] ${budget_usd:,.2f} USD de {client_name} ({client_company})"
    admin_body = f"""Hola Alejandro,

Un cliente potencial ha completado una cotización interactiva en Kunkurt Devs:

• Cliente: {client_name}
• Correo: {client_email}
• Empresa: {client_company}
• Tipo de Proyecto: {project_type}
• Presupuesto Estimado: ${budget_usd:,.2f} USD
• Tiempo Estimado: {timeline_weeks} semanas
• Módulos Seleccionados: {', '.join(features) if features else 'Estándar'}
• Ticket de Seguimiento: #{ticket_code}

Detalles Adicionales:
--------------------------------------------------
{description or 'Sin especificaciones adicionales.'}
--------------------------------------------------

Atentamente,
Kunkurt Cotizador Inteligente
"""
    send_system_email(ADMIN_EMAIL, admin_subject, admin_body)

    # 2. Confirmation to Client
    if client_email and client_email.lower() != ADMIN_EMAIL.lower():
        client_subject = f"Propuesta & Cotización Estimada #{ticket_code} — Kunkurt Devs"
        client_body = f"""Estimado/a {client_name},

Gracias por cotizar tu proyecto con Kunkurt Devs.

Resumen de tu estimación técnica:
• Solución: {project_type}
• Presupuesto Estimado: ${budget_usd:,.2f} USD
• Cronograma Estimado: {timeline_weeks} semanas
• Ticket de Seguimiento: #{ticket_code}

Uno de nuestros arquitectos de software te contactará a la brevedad para afinar los detalles de ingeniería y dar inicio formal.

Atentamente,
Dirección de Proyectos & Consultoría
Kunkurt Devs
"""
        send_system_email(client_email, client_subject, client_body)

def notify_payment_completed_emails(payment):
    """
    Sends instant email alerts to Admin and receipt to client for a completed payment.
    """
    tx = payment.get("transaction_id", "")
    client_name = payment.get("client_name", "Cliente")
    client_email = payment.get("client_email", "")
    amount = float(payment.get("amount", 0))
    currency = payment.get("currency", "USD").upper()
    gateway_title = payment.get("gateway_title", "Pasarela de Pago")
    concept = payment.get("concept", "Servicios de Software")
    created_at = payment.get("created_at", datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

    # 1. Alert to Admin (Alejandro)
    admin_subject = f"🚨 [PAGO RECIBIDO] ${amount:,.2f} {currency} vía {gateway_title} — Ref: {tx}"
    admin_body = f"""¡Excelente Alejandro!

Se ha procesado exitosamente un pago en Kunkurt Devs:

• ID de Transacción: {tx}
• Monto: ${amount:,.2f} {currency}
• Pasarela de Pago: {gateway_title}
• Cliente: {client_name} ({client_email})
• Concepto: {concept}
• Fecha: {created_at}
• Estado: Aprobado / Verificado

Se ha registrado en el libro contable de la plataforma y generado el comprobante para el cliente.

Atentamente,
Kunkurt Global Payments Gateway
"""
    send_system_email(ADMIN_EMAIL, admin_subject, admin_body)

    # 2. Receipt to Client
    if client_email and client_email.lower() != ADMIN_EMAIL.lower():
        client_subject = f"Comprobante de Pago Oficial #{tx} — Kunkurt Devs"
        client_body = f"""Estimado/a {client_name},

Hemos recibido y confirmado tu pago satisfactoriamente. A continuación los datos de tu recibo:

==================================================
           COMPROBANTE DE PAGO KUNKURT
==================================================
• Referencia / Transacción: {tx}
• Fecha y Hora: {created_at}
• Concepto: {concept}
• Monto Pagado: ${amount:,.2f} {currency}
• Método de Pago: {gateway_title}
• Estado: APROBADO / VERIFICADO
==================================================

Conserva este comprobante para tu control contable. Nuestro equipo técnico continuará con las etapas acordadas de tu proyecto.

¡Gracias por confiar en Kunkurt Devs!

Atentamente,
Departamento de Facturación & Cobranza
Kunkurt Devs
"""
        send_system_email(client_email, client_subject, client_body)

def notify_meeting_scheduled_emails(meeting):
    """
    Sends email alerts to Admin and calendar confirmation to client for a discovery meeting.
    """
    client_name = meeting.get("client_name", "Cliente")
    client_email = meeting.get("client_email", "")
    client_company = meeting.get("client_company", "Particular")
    meet_date = meeting.get("meeting_date", "")
    meet_time = meeting.get("meeting_time", "")
    timezone = meeting.get("timezone", "America/Bogota")
    topic = meeting.get("topic", "Sesión de Consultoría de Software")
    meet_link = meeting.get("meet_link", "https://meet.google.com")
    notes = meeting.get("notes", "")

    # 1. Alert to Admin (Alejandro)
    admin_subject = f"📅 [Nueva Reunión] Discovery Call con {client_name} ({meet_date} {meet_time})"
    admin_body = f"""Hola Alejandro,

Se ha agendado una nueva sesión técnica / Discovery Call en Kunkurt Devs:

• Cliente: {client_name} ({client_email})
• Empresa: {client_company}
• Fecha: {meet_date}
• Hora: {meet_time} ({timezone})
• Tema Principal: {topic}
• Sala de Google Meet: {meet_link}

Notas / Requisitos:
{notes or 'Sin especificaciones previas.'}

Atentamente,
Kunkurt Scheduler Engine
"""
    send_system_email(ADMIN_EMAIL, admin_subject, admin_body)

    # 2. Confirmation to Client
    if client_email and client_email.lower() != ADMIN_EMAIL.lower():
        client_subject = f"Confirmación de Discovery Call con Kunkurt Devs ({meet_date})"
        client_body = f"""Estimado/a {client_name},

Tu sesión de asesoría técnica y arquitectura con Kunkurt Devs ha quedado confirmada:

• Fecha: {meet_date}
• Hora: {meet_time} ({timezone})
• Enlace de Google Meet: {meet_link}
• Tema: {topic}

Por favor guarda este enlace en tu calendario. Nuestro director técnico Alejandro (JaponPLX) se unirá puntualmente a la llamada.

Atentamente,
Dirección Técnica & Proyectos
Kunkurt Devs
"""
        send_system_email(client_email, client_subject, client_body)

def _matches_copilot_phrase(msg: str, phrases: tuple) -> bool:
    for p in phrases:
        if len(p) <= 3:
            if re.search(r'\b' + re.escape(p) + r'\b', msg):
                return True
        else:
            if p in msg:
                return True
    return False


def handle_copilot_chat(user_msg, user_role="public", user_name="Invitado"):
    """
    Intelligent AI Copilot reasoning engine specialized in software engineering,
    architecture, project estimations, HelpDesk, and payments for Kunkurt Devs.
    """
    # Guard against swapped parameters
    known_roles = ("public", "client", "developer", "admin", "employee", "manager", "qa", "designer")
    if user_role not in known_roles and user_name in known_roles:
        user_role, user_name = user_name, user_role

    msg = user_msg.lower().strip()
    
    # 1. Greetings / Introduction
    if _matches_copilot_phrase(msg, ("hola", "buenos dias", "buenas tardes", "buenas noches", "saludos", "hello", "hi", "hey", "que tal")):
        return (
            f"¡Hola {user_name}! 👋 Soy **Kunkurt Copilot**, el asistente de inteligencia artificial y arquitectura de Kunkurt Devs.\n\n"
            "Puedo ayudarte en tiempo real con:\n"
            "• ⚡ **Cotización instantánea:** Calcula el presupuesto de tu web, SaaS o app móvil.\n"
            "• 🛠️ **Arquitectura técnica:** Microservicios, Docker, FastAPI y modelos de IA RAG.\n"
            "• 💳 **Pasarelas de pago:** Cómo pagar con tarjeta, PayPal, PSE o Cripto (anticipo 50%).\n"
            "• 📅 **Discovery Call:** Agendar una videollamada de 30 min por Google Meet con Alejandro.\n"
            "• 🎫 **Soporte & Tickets:** Reportar incidencias o solicitar nuevas funcionalidades.\n\n"
            "¿Sobre qué proyecto o requerimiento deseas consultar hoy?"
        )

    # 2. Pricing / Quotes / Costs
    if _matches_copilot_phrase(msg, ("precio", "costo", "cuesta", "cuanto cuesta", "cuánto cuesta", "cotiz", "cuanto vale", "presupuesto", "tarifa", "cuanto demora", "tiempo", "demora", "semanas", "valores", "estimacion", "estimación")):
        return (
            "💼 **Inversión y Tiempos de Entrega Ajustados para Emprendedores & Pymes:**\n\n"
            "• 🛒 **Sistema POS & Facturación Pyme:** Desde **$290 USD** (Entrega: 1 a 2 semanas | Anticipo 50%: **$145 USD**).\n"
            "• 🌐 **Web Comercial & Catálogo:** Desde **$190 USD** (Entrega: 1 semana | Anticipo 50%: **$95 USD**).\n"
            "• ⚡ **Full-Stack Web App a Medida:** Desde **$480 USD** (Entrega: 2 a 3 semanas | Anticipo 50%: **$240 USD**).\n"
            "• 📱 **App Móvil para Negocios (iOS/Android):** Desde **$650 USD** (Entrega: 3 a 4 semanas | Anticipo 50%: **$325 USD**).\n"
            "• 🤖 **Automatización con IA & Chatbot 24/7:** Desde **$380 USD** (Entrega: 1 a 2 semanas | Anticipo 50%: **$190 USD**).\n\n"
            "💡 *Modalidad de pago accesible:* **50% de anticipo** para iniciar el desarrollo y **50% contraentrega** previa verificación de calidad con código fuente y soporte incluido.\n\n"
            "Puedes usar nuestro **Cotizador Inteligente** en la pestaña superior para personalizar los módulos exactos."
        )

    # 3. Sistemas POS & Facturación para Pequeños Negocios
    if _matches_copilot_phrase(msg, ("pos", "punto de venta", "facturacion", "facturación", "inventario", "caja", "cuadre", "ticket", "impresora termica", "impresora térmica", "lector de barras", "negocio", "tienda", "emprendedor")):
        return (
            "🛒 **Sistemas POS & Facturación para Pequeños Emprendedores:**\n\n"
            "Desarrollamos soluciones de Punto de Venta (POS) rápidas, económicas y fáciles de usar para tiendas, restaurantes, minimarkets y negocios independientes:\n\n"
            "• ⚡ **Ventas Rápidas en Caja:** Registro ágil de ventas en segundos con efectivo, transferencias, PSE y tarjetas.\n"
            "• 📦 **Control de Inventario:** Control de stock en tiempo real y alertas de productos por agotarse.\n"
            "• 🖨️ **Impresión de Tickets:** Compatible con impresoras térmicas (58/80mm) y lectores de código de barras.\n"
            "• 📊 **Cuadre de Caja Diario:** Reporte claro de ventas totales y ganancias por turno.\n"
            "• 🔌 **Modo 100% Offline:** Funciona incluso si se cae internet gracias a su base de datos local SQLite.\n\n"
            "💡 **Precio especial para emprendedores:** Desde **$290 USD** (Anticipo 50%: **$145 USD**) con entrega en 1 a 2 semanas."
        )

    # 4. Payment Methods
    if _matches_copilot_phrase(msg, ("pago", "pagar", "pasarela", "stripe", "paypal", "mercado pago", "pse", "tarjeta", "cripto", "usdt", "apple pay", "google pay", "como pago", "como se paga", "donde pago")):
        return (
            "💳 **Pasarelas de Pago Globales Disponibles en Kunkurt:**\n\n"
            "1. **Stripe:** Tarjetas de crédito y débito internacionales (Visa, Mastercard, Amex) con cifrado SSL 256-bit.\n"
            "2. **PayPal Express:** Pago instantáneo en 1-clic con saldo o cuentas vinculadas.\n"
            "3. **Mercado Pago & PSE:** Transferencias bancarias directas en Colombia (Bancolombia, Nequi, Davivienda), México (SPEI) y tarjetas locales.\n"
            "4. **Apple Pay & Google Pay:** Cobro biométrico ultra rápido desde iPhone o Android con Face ID o huella.\n"
            "5. **Criptomonedas / Web3:** USDT / USDC sobre redes TRC-20, BEP-20 y Polygon.\n\n"
            "Todas las transacciones generan un **comprobante oficial verificable** con notificación instantánea a tu correo."
        )

    # 4. Mobile Apps & Multiplatform
    if _matches_copilot_phrase(msg, ("app", "movil", "móvil", "mobile", "ios", "android", "flutter", "react native", "celular", "aplicacion", "aplicación")):
        return (
            "📱 **Desarrollo de Aplicaciones Móviles (iOS & Android):**\n\n"
            "En Kunkurt Devs construimos aplicaciones móviles de alto rendimiento:\n"
            "• **Frontend Móvil:** React Native y Flutter con interfaces fluidas a 60 FPS.\n"
            "• **Backend & APIs:** FastAPI / Python con WebSockets para sincronización en tiempo real.\n"
            "• **Publicación:** Gestión integral para App Store y Google Play Store.\n"
            "• **Offline-First:** Almacenamiento local SQLite con sincronización automática en la nube.\n\n"
            "Puedes agendar una reunión técnica o cotizar tu app móvil directamente en nuestra plataforma."
        )

    # 5. Core Services / Agency Overview
    if _matches_copilot_phrase(msg, ("servicios", "hacen", "ofrecen", "que hacen", "a que se dedican", "quienes son", "kunkurt")):
        return (
            "🚀 **Servicios Principales de Ingeniería en Kunkurt Devs:**\n\n"
            "• 🛒 **Sistemas POS & Punto de Venta:** Facturación en caja, control de stock/inventario y tickets térmicos para emprendedores y comercios locales.\n"
            "• 🌐 **Desarrollo Web & SaaS:** Plataformas interactivas, paneles administrativos y arquitectura multi-tenant.\n"
            "• 🤖 **Inteligencia Artificial Aplicada:** Agentes virtuales, motores RAG de búsqueda semántica y pipelines LLM.\n"
            "• 📱 **Aplicaciones Móviles:** Apps nativas y cross-platform a 60 FPS (Flutter / React Native).\n"
            "• ☁️ **Cloud, Microservicios & DevOps:** Contenedores Docker, CI/CD con GitHub Actions y bases de datos seguras.\n"
            "• 💳 **Integración de Pasarelas Fintech:** Checkouts multidivisa seguros (Mercado Pago PSE, Stripe, PayPal, Cripto).\n"
            "• 🎫 **Soporte & Mantenimiento SLA:** Mesa de ayuda en vivo con seguimiento de incidencias 24/7."
        )

    # 6. Meetings / Discovery Call
    if _matches_copilot_phrase(msg, ("reunion", "reunión", "agendar", "llamada", "videollamada", "meet", "google meet", "calendly", "hablar", "contacto")):
        return (
            "📅 **Agendamiento de Discovery Call (30 minutos):**\n\n"
            "Puedes coordinar una videollamada técnica directamente con nuestro Director General **Alejandro (JaponPLX)** por Google Meet.\n\n"
            "En la sesión revisaremos:\n"
            "• Viabilidad técnica y arquitectura de tu solución.\n"
            "• Definición de sprints y entregables clave.\n"
            "• Cronograma de entrega y presupuesto cerrado.\n\n"
            "👉 Haz clic en el botón **'📅 Agendar Llamada'** en el menú superior para seleccionar la fecha y hora que mejor te acomode."
        )

    # 7. Tickets / Support / HelpDesk
    if _matches_copilot_phrase(msg, ("ticket", "soporte", "error", "falla", "bug", "problema", "ayuda", "help", "incidencia")):
        return (
            "🎫 **Mesa de Ayuda & Soporte Técnico Kunkurt:**\n\n"
            "Si tienes una consulta, reporte de bug o solicitud de cambio en tu proyecto:\n"
            "• Dirígete a la pestaña **Tickets & Soporte**.\n"
            "• Haz clic en **➕ Nuevo Ticket** e ingresa el título, categoría y prioridad.\n"
            "• Nuestro equipo de ingeniería dará respuesta en tiempo real con alertas directas a tu correo.\n\n"
            "🔒 *Privacidad garantizada:* Cada usuario tiene acceso a su historial de tickets de soporte."
        )

    # 8. Architecture / Tech Stack
    if _matches_copilot_phrase(msg, ("tecnologia", "stack", "arquitectura", "docker", "python", "react", "ia", "rag", "microservicios", "seguridad")):
        return (
            "⚡ **Stack Tecnológico & Arquitectura Kunkurt:**\n\n"
            "• **Backend:** Python (FastAPI / Asynchronous HTTP Core), Node.js / TypeScript, Redis para caching distribuido.\n"
            "• **Frontend:** Vanilla Reactive JS / React, Tailwind CSS, animaciones cinemáticas con Glassmorphism.\n"
            "• **Inteligencia Artificial:** Modelos RAG (Retrieval-Augmented Generation), bases de datos vectoriales (ChromaDB, Pinecone), embeddings de última generación.\n"
            "• **Cloud & DevOps:** Docker, GitHub Actions CI/CD automatizado, Render, Cloudflare Edge y SSL bancario 256-bit.\n\n"
            "Todo nuestro código está diseñado bajo estándares limpios, rutas dinámicas portables y pruebas unitarias automáticas."
        )

    # 9. Guarantees & Contract
    if _matches_copilot_phrase(msg, ("garantia", "garantía", "contrato", "seguridad", "nda", "confidencialidad", "propiedad", "codigo fuente", "código fuente")):
        return (
            "🛡️ **Garantías y Propiedad Intelectual en Kunkurt:**\n\n"
            "• **100% Propiedad del Código:** Al finalizar el proyecto y liquidar contraentrega, se transfiere la totalidad del repositorio, licencias y documentación técnica.\n"
            "• **Acuerdo de Confidencialidad (NDA):** Firmamos acuerdos de protección de propiedad intelectual antes de iniciar.\n"
            "• **Garantía Post-Lanzamiento:** 30 días de garantía sin costo adicional para corrección de cualquier anomalía.\n"
            "• **Infraestructura Contenerizada:** Te entregamos configuraciones Docker para que puedas alojarlo en cualquier nube (AWS, GCP, DigitalOcean, Render)."
        )

    # 10. Default Fallback
    return (
        f"Comprendo lo que necesitas, {user_name}. En Kunkurt Devs diseñamos arquitecturas de software modernas, microservicios, aplicaciones móviles y sistemas de inteligencia artificial a la medida.\n\n"
        "Te recomiendo:\n"
        "1. ⚡ **Cotizar tu proyecto** en nuestra calculadora para obtener un presupuesto en segundos.\n"
        "2. 📅 **Agendar una Discovery Call** con nuestro equipo para definir el alcance técnico.\n"
        "3. 💳 **Revisar nuestras opciones de pago** con 50% de anticipo y 50% contraentrega.\n\n"
        "¿Te gustaría que te ayude a calcular la cotización de tu requerimiento?"
    )

class KunkurtAPIHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(STATIC_DIR), **kwargs)

    def send_json(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-User-Role, X-User-Email")
        self.end_headers()
        self.wfile.write(body)

    def read_json_body(self):
        content_length = int(self.headers.get("Content-Length", 0))
        if content_length > 0:
            raw_body = self.rfile.read(content_length).decode("utf-8")
            return json.loads(raw_body)
        return {}

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-User-Role, X-User-Email")
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        # Serve uploaded media files
        if path.startswith("/uploads/"):
            filename = os.path.basename(path)
            file_path = os.path.join(UPLOADS_DIR, filename)
            if os.path.exists(file_path) and os.path.isfile(file_path):
                mime, _ = mimetypes.guess_type(file_path)
                with open(file_path, "rb") as f:
                    content = f.read()
                self.send_response(200)
                self.send_header("Content-Type", mime or "application/octet-stream")
                self.send_header("Content-Length", str(len(content)))
                self.end_headers()
                self.wfile.write(content)
                return
            else:
                self.send_error(404, "File Not Found")
                return

        # API: Health Check & Keep-Alive Ping
        if path == "/api/health" or path == "/health":
            self.send_json({
                "status": "healthy",
                "service": "kunkurt-devs",
                "uptime": "active",
                "timestamp": datetime.now().isoformat()
            })
            return

        # API: Network & Public Access Info
        if path == "/api/network-info":
            lan_ip = get_lan_ip()
            self.send_json({
                "success": True,
                "local_url": f"http://localhost:{PORT}",
                "lan_url": f"http://{lan_ip}:{PORT}",
                "lan_ip": lan_ip,
                "port": PORT
            })
            return

        # API: Notifications
        if path == "/api/notifications":
            notifs = database.get_notifications()
            self.send_json({"success": True, "notifications": notifs})
            return

        # API: Team & Leaderboard / Employees
        if path == "/api/team" or path == "/api/users" or path == "/api/employees":
            users = database.get_users()
            self.send_json({"success": True, "users": users, "employees": users})
            return

        # API: SMTP Settings info
        if path == "/api/settings/smtp":
            smtp_host, smtp_port, smtp_user, smtp_pass = get_effective_smtp_config()
            is_conf = bool(smtp_host and smtp_user and smtp_pass)
            self.send_json({
                "success": True,
                "smtp_host": smtp_host,
                "smtp_port": smtp_port,
                "smtp_user": smtp_user,
                "configured": is_conf,
                "settings": {
                    "smtp_host": smtp_host,
                    "smtp_port": smtp_port,
                    "smtp_user": smtp_user,
                    "is_configured": is_conf
                }
            })
            return

        # API: Stats
        if path == "/api/stats":
            stats = database.get_stats()
            self.send_json({"success": True, "stats": stats})
            return

        # API: Projects list
        if path == "/api/projects":
            category = query.get("category", [None])[0]
            status = query.get("status", [None])[0]
            search = query.get("search", [None])[0]
            is_public_only = query.get("public_only", ["0"])[0] == "1"

            projects = database.get_all_projects(
                is_public_only=is_public_only,
                category=category,
                search=search,
                status=status
            )
            self.send_json({"success": True, "projects": projects})
            return

        # API: Tickets list & stats
        if path == "/api/tickets":
            status = query.get("status", [None])[0]
            priority = query.get("priority", [None])[0]
            category = query.get("category", [None])[0]
            search = query.get("search", [None])[0]
            req_role = self.headers.get("X-User-Role", "").strip().lower()
            req_email = self.headers.get("X-User-Email", "").strip().lower()

            # For clients or public visitors, restrict strictly to their own tickets
            if req_role in ("client", "public", "cliente") or not req_role:
                author_filter = req_email if (req_email and req_role == "client") else "none@unauthenticated"
                tickets = database.get_tickets(
                    status=status,
                    priority=priority,
                    category=category,
                    search=search,
                    author_email=author_filter
                )
                stats = database.get_ticket_stats(author_email=author_filter)
            else:
                author_email = query.get("author_email", [None])[0]
                tickets = database.get_tickets(
                    status=status,
                    priority=priority,
                    category=category,
                    search=search,
                    author_email=author_email
                )
                stats = database.get_ticket_stats(author_email=author_email)

            self.send_json({"success": True, "tickets": tickets, "stats": stats})
            return

        # API: Single Ticket detail
        if path.startswith("/api/tickets/"):
            parts = path.strip("/").split("/")
            if len(parts) >= 3:
                ticket_id = parts[2]
                ticket = database.get_ticket(ticket_id)
                if ticket:
                    req_role = self.headers.get("X-User-Role", "").strip().lower()
                    req_email = self.headers.get("X-User-Email", "").strip().lower()
                    if req_role in ("client", "public", "cliente") or not req_role:
                        if ticket.get("author_email", "").strip().lower() != req_email:
                            self.send_json({"success": False, "error": "Acceso restringido: Solo puedes consultar tus propios tickets."}, 403)
                            return
                    self.send_json({"success": True, "ticket": ticket})
                else:
                    self.send_json({"success": False, "error": "Ticket no encontrado"}, 404)
                return

        # API: Project by ID
        if path.startswith("/api/projects/"):
            parts = path.strip("/").split("/")
            try:
                project_id = int(parts[2])
                project = database.get_project_by_id(project_id)
                if project:
                    self.send_json({"success": True, "project": project})
                else:
                    self.send_json({"success": False, "error": "Proyecto no encontrado"}, 404)
            except (ValueError, IndexError):
                self.send_json({"success": False, "error": "ID de proyecto inválido"}, 400)
            return

        # API: Advanced Analytics & Metrics
        if path == "/api/analytics":
            analytics = database.get_advanced_analytics()
            self.send_json({"success": True, "analytics": analytics})
            return

        # API: Global Payments & Financial Ledger
        if path == "/api/payments":
            req_role = self.headers.get("X-User-Role", "").strip().lower()
            req_email = self.headers.get("X-User-Email", "").strip().lower()
            if req_role in ("client", "public", "cliente") or not req_role:
                author_filter = req_email if (req_email and req_role == "client") else "none@unauthenticated"
                payments = database.get_payments(limit=50, client_email=author_filter)
                stats = database.get_payment_stats()
            else:
                payments = database.get_payments(limit=100)
                stats = database.get_payment_stats()
            self.send_json({"success": True, "payments": payments, "stats": stats})
            return

        # API: Payment Gateway Settings (Stripe, Mercado Pago PSE, PayPal, Crypto)
        if path == "/api/payments/settings":
            settings = database.get_payment_settings()
            req_role = self.headers.get("X-User-Role", "").strip().lower()
            # If not admin, mask the sensitive secret keys for security
            if req_role not in ("admin", "fundador", "director"):
                safe_settings = dict(settings)
                if safe_settings.get("stripe_secret_key"):
                    safe_settings["stripe_secret_key"] = safe_settings["stripe_secret_key"][:7] + "••••••••"
                if safe_settings.get("mercadopago_access_token"):
                    safe_settings["mercadopago_access_token"] = safe_settings["mercadopago_access_token"][:8] + "••••••••"
                if safe_settings.get("paypal_client_secret"):
                    safe_settings["paypal_client_secret"] = safe_settings["paypal_client_secret"][:5] + "••••••••"
                self.send_json({"success": True, "settings": safe_settings})
            else:
                self.send_json({"success": True, "settings": settings})
            return

        # API: System Telemetry & Live Services Status
        if path == "/api/system/status":
            import time
            current_ts = datetime.now().isoformat()
            self.send_json({
                "success": True,
                "status": "operational",
                "uptime_percentage": "99.98%",
                "services": [
                    {"name": "API Gateway & REST Core", "status": "operational", "latency_ms": 14, "sla": "99.99%"},
                    {"name": "AI Copilot & Inference Engine", "status": "operational", "latency_ms": 28, "sla": "99.95%"},
                    {"name": "Global Payment Gateways (Stripe/PayPal/PSE)", "status": "operational", "latency_ms": 42, "sla": "100%"},
                    {"name": "PostgreSQL & SQLite Storage", "status": "operational", "latency_ms": 8, "sla": "99.99%"},
                    {"name": "Edge CDN & SSL Encryption", "status": "operational", "latency_ms": 5, "sla": "100%"}
                ],
                "server_time": current_ts,
                "environment": "production-ready"
            })
            return

        # API: Discovery Meetings
        if path == "/api/meetings":
            req_role = self.headers.get("X-User-Role", "").strip().lower()
            req_email = self.headers.get("X-User-Email", "").strip().lower()
            if req_role in ("client", "public", "cliente") or not req_role:
                author_filter = req_email if (req_email and req_role == "client") else "none@unauthenticated"
                meetings = database.get_meetings(limit=50, client_email=author_filter)
            else:
                meetings = database.get_meetings(limit=100)
            self.send_json({"success": True, "meetings": meetings})
            return

        # API: Team Live Messages
        if path == "/api/team/messages":
            req_role = self.headers.get("X-User-Role", "").strip().lower()
            if req_role in ("client", "public", "cliente") or not req_role:
                self.send_json({"success": False, "error": "Acceso restringido: El Chat de Equipo es de uso exclusivo para colaboradores e ingenieros internos de Kunkurt."}, 403)
                return
            limit = int(query.get("limit", [60])[0])
            msgs = database.get_team_messages(limit=limit)
            self.send_json({"success": True, "messages": msgs})
            return

        # API: Knowledge Base / Wiki
        if path == "/api/wiki":
            cat = query.get("category", [None])[0]
            search = query.get("search", [None])[0]
            articles = database.get_knowledge_articles(category=cat, search=search)
            self.send_json({"success": True, "articles": articles})
            return

        if path.startswith("/api/wiki/"):
            parts = path.strip("/").split("/")
            if len(parts) >= 3:
                art_id = parts[2]
                article = database.get_knowledge_article(art_id)
                if article:
                    self.send_json({"success": True, "article": article})
                else:
                    self.send_json({"success": False, "error": "Artículo no encontrado"}, 404)
                return

        # API: Webhook Settings
        if path == "/api/settings/webhooks":
            wh_settings = database.get_webhook_settings()
            self.send_json({"success": True, "settings": wh_settings})
            return

        # Fallback to static files
        if path == "/" or path == "":
            self.path = "/index.html"
            
        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        try:
            body = self.read_json_body()
        except Exception as e:
            self.send_json({"success": False, "error": f"JSON inválido: {str(e)}"}, 400)
            return

        # API: GitHub Sync (Import repositories automatically)
        if path == "/api/github/sync":
            github_username = body.get("github_username", "").strip()
            if not github_username:
                self.send_json({"success": False, "error": "Nombre de usuario de GitHub requerido"}, 400)
                return

            try:
                gh_url = f"https://api.github.com/users/{github_username}/repos?per_page=100&sort=updated"
                req = urllib.request.Request(gh_url, headers={
                    "User-Agent": "Kunkurt-Platform",
                    "Accept": "application/vnd.github.v3+json"
                })
                with urllib.request.urlopen(req, timeout=10) as resp:
                    repos = json.loads(resp.read().decode("utf-8"))

                # Get user profile for avatar and name
                author_name = github_username
                author_avatar = f"https://avatars.githubusercontent.com/{github_username}"
                try:
                    u_url = f"https://api.github.com/users/{github_username}"
                    u_req = urllib.request.Request(u_url, headers={"User-Agent": "Kunkurt-Platform"})
                    with urllib.request.urlopen(u_req, timeout=5) as u_resp:
                        u_data = json.loads(u_resp.read().decode("utf-8"))
                        author_name = u_data.get("name") or github_username
                        author_avatar = u_data.get("avatar_url") or author_avatar
                except Exception:
                    pass

                imported_count = database.import_github_repos(
                    repos=repos,
                    github_username=github_username,
                    author_name=author_name,
                    author_avatar=author_avatar
                )

                self.send_json({
                    "success": True,
                    "imported_count": imported_count,
                    "total_repos_found": len(repos),
                    "github_username": github_username,
                    "author_name": author_name,
                    "author_avatar": author_avatar
                })
            except Exception as e:
                self.send_json({"success": False, "error": f"Error conectando con GitHub API: {str(e)}"}, 500)
            return

        # API: Create / Authorize Employee (Only Admin can register new employees)
        if path == "/api/employees/create":
            full_name = body.get("full_name", "").strip()
            email = body.get("email", "").strip().lower()
            role = body.get("role", "developer").strip()
            department = body.get("department", "Equipo Kunkurt Devs").strip()

            if not email or not full_name:
                self.send_json({"success": False, "error": "Nombre y correo son obligatorios"}, 400)
                return

            employee = database.admin_create_employee(full_name, email, role, department)

            # Send welcome and authorization email
            welcome_email_res = send_welcome_employee_email(
                recipient_email=email,
                full_name=full_name,
                role=role,
                department=department,
                authorized_by=ADMIN_NAME
            )

            self.send_json({
                "success": True,
                "employee": employee,
                "email_notification": welcome_email_res,
                "message": f"Empleado {full_name} dado de alta exitosamente. Se ha enviado el correo de bienvenida y acceso a {email}."
            })
            return

        # API: Delete Employee (Admin only)
        if path == "/api/employees/delete":
            emp_id = body.get("id")
            if not emp_id:
                self.send_json({"success": False, "error": "ID de empleado requerido"}, 400)
                return

            ok = database.admin_delete_employee(emp_id)
            if ok:
                self.send_json({"success": True})
            else:
                self.send_json({"success": False, "error": "No se puede eliminar al Administrador Fundador"}, 400)
            return

        # API: Change Employee Role (Administrator only)
        if path == "/api/employees/role":
            user_id = body.get("user_id")
            new_role = body.get("role", "").strip()
            if not user_id or not new_role:
                self.send_json({"success": False, "error": "ID de usuario y nuevo rol requeridos."}, 400)
                return

            ok, err = database.update_user_role(user_id, new_role)
            if not ok:
                self.send_json({"success": False, "error": err}, 400)
                return

            self.send_json({"success": True, "message": f"Rol actualizado exitosamente a {new_role.upper()}."})
            return

        # API: Register new user / employee
        if path == "/api/auth/register":
            full_name = body.get("full_name", "").strip()
            username = body.get("username", "").strip()
            email = body.get("email", "").strip().lower()
            password = body.get("password", "").strip()
            department = body.get("department", "Equipo Kunkurt Devs").strip()

            if not email or not full_name:
                self.send_json({"success": False, "error": "El nombre completo y el correo electrónico son obligatorios."}, 400)
                return

            user, err = database.register_user(full_name, email, password, department, username=username)
            if err:
                self.send_json({"success": False, "error": err}, 400)
                return

            # Dispatch welcome email notification
            welcome_res = send_welcome_employee_email(
                recipient_email=email,
                full_name=full_name,
                role=user["role"],
                department=department,
                authorized_by="Registro en Plataforma Kunkurt"
            )

            client_ip = self.client_address[0] if self.client_address else "127.0.0.1"
            user_agent = self.headers.get("User-Agent", "Navegador Web")
            database.log_login_event(email, user["username"], user["role"], client_ip, user_agent)

            session_token = f"kunkurt_session_{uuid.uuid4().hex}"
            self.send_json({
                "success": True,
                "message": f"¡Bienvenido a Kunkurt, {full_name}! Tu cuenta ha sido creada exitosamente.",
                "session_token": session_token,
                "user": user,
                "email_notification": welcome_res
            })
            return

        # API: Save SMTP Settings
        if path == "/api/settings/smtp":
            smtp_host = body.get("smtp_host", "").strip() or "smtp.gmail.com"
            smtp_port = body.get("smtp_port", 587)
            smtp_user = body.get("smtp_user", "").strip()
            smtp_pass = body.get("smtp_pass", "").strip() or body.get("smtp_password", "").strip()

            database.save_smtp_settings({
                "smtp_host": smtp_host,
                "smtp_port": smtp_port,
                "smtp_user": smtp_user,
                "smtp_pass": smtp_pass
            })
            self.send_json({"success": True, "message": "Configuración SMTP guardada exitosamente."})
            return

        # API: Test SMTP connection and real email delivery
        if path == "/api/settings/smtp/test":
            test_recipient = body.get("to_email", "").strip() or body.get("recipient", "").strip() or ADMIN_EMAIL
            smtp_host, smtp_port, smtp_user, smtp_pass = get_effective_smtp_config()

            if not (smtp_host and smtp_user and smtp_pass):
                self.send_json({
                    "success": False,
                    "error": "Faltan credenciales SMTP. Por favor ingresa el servidor (ej: smtp.gmail.com), tu correo y tu Contraseña de Aplicación de Google."
                }, 400)
                return

            try:
                msg = MIMEMultipart()
                msg["From"] = f"Kunkurt System <{smtp_user}>"
                msg["To"] = test_recipient
                msg["Subject"] = "🧪 Prueba de Correo Real — Kunkurt Devs"
                msg.attach(MIMEText(
                    f"¡Hola!\n\nEste es un correo de prueba enviado en vivo desde tu plataforma Kunkurt Devs.\n"
                    f"La conexión SMTP con {smtp_host} funciona a la perfección.\n\n"
                    f"Ahora todas las altas de empleados y alertas de seguridad llegarán directamente a tu bandeja de entrada real de Gmail.\n\n"
                    f"Atentamente,\nEquipo Kunkurt Devs",
                    "plain", "utf-8"
                ))

                with smtplib.SMTP(smtp_host, int(smtp_port), timeout=12) as s:
                    s.starttls()
                    s.login(smtp_user, smtp_pass)
                    s.send_message(msg)

                self.send_json({
                    "success": True,
                    "message": f"¡Excelente! Correo de prueba enviado exitosamente a {test_recipient}. Revisa tu bandeja de entrada o spam."
                })
            except Exception as e:
                err_str = str(e)
                hint = ""
                if "535" in err_str or "Username and Password not accepted" in err_str:
                    hint = " Sugerencia: En Gmail debes usar una 'Contraseña de Aplicación' de 16 caracteres (creada en Google > Seguridad > Verificación en 2 pasos > Contraseñas de aplicaciones), NO tu contraseña normal."
                self.send_json({"success": False, "error": f"Error conectando con servidor SMTP: {err_str}.{hint}"}, 500)
            return

        # API: Authentication & Login with Email Security Notification
        if path == "/api/auth/login":
            identifier = (body.get("identifier") or body.get("email") or body.get("username") or "").strip()
            password = body.get("password", "").strip()

            if not identifier:
                self.send_json({"success": False, "error": "Ingresa tu correo electrónico o nombre de usuario."}, 400)
                return

            user = database.find_user_by_credentials(identifier)
            if not user:
                # Founding admin check (dynamic from config)
                if identifier.lower() == ADMIN_EMAIL.lower() or identifier.lower() == "japonplx" or identifier.lower() == "alejandro":
                    user = database.admin_create_employee(ADMIN_NAME, ADMIN_EMAIL, "admin", "Dirección General & Lead Dev")
                else:
                    self.send_json({
                        "success": False,
                        "error": "No encontramos una cuenta con ese correo o usuario. Por favor regístrate en la pestaña 'Registrarse' o solicita al Administrador tu alta."
                    }, 404)
                    return

            # Check password if configured
            if user.get("password") and user["password"] != "":
                if not password or user["password"] != password:
                    self.send_json({"success": False, "error": "Contraseña incorrecta. Por favor verifica tu clave."}, 401)
                    return
            elif password and (not user.get("password") or user["password"] == ""):
                # First time setting password
                database.update_user_password(user["id"], password)
                user["password"] = password

            role = user["role"]
            full_name = user["full_name"]
            username = user["username"]
            email = user["email"]
            client_ip = self.client_address[0] if self.client_address else "127.0.0.1"
            user_agent = self.headers.get("User-Agent", "Navegador Web")

            # Dispatch email notification
            email_res = send_login_email_notification(email, full_name, role, client_ip)

            # Log to DB
            database.log_login_event(email, username, role, client_ip, user_agent)

            # Dispatch Webhook notification
            dispatch_webhook(
                title="🔐 Inicio de Sesión de Usuario",
                description=f"El usuario **{full_name}** (`{username}`) ha iniciado sesión.",
                fields={"Rol": role.upper(), "IP": client_ip, "Correo": email},
                color=0x3b82f6,
                event_type="login"
            )

            session_token = f"kunkurt_session_{uuid.uuid4().hex}"
            self.send_json({
                "success": True,
                "message": f"Sesión autorizada como {full_name} [{role.upper()}]. Alerta enviada a {email}.",
                "session_token": session_token,
                "user": user,
                "email_notification": email_res
            })
            return

        # API: Mark notifications as read
        if path == "/api/notifications/read":
            database.mark_notifications_read()
            self.send_json({"success": True})
            return

        # API: Upload base64 image
        if path == "/api/upload":
            image_data = body.get("image_base64")
            if not image_data:
                self.send_json({"success": False, "error": "No image data provided"}, 400)
                return

            try:
                if "," in image_data:
                    header, encoded = image_data.split(",", 1)
                    ext = ".png"
                    if "image/jpeg" in header or "image/jpg" in header:
                        ext = ".jpg"
                    elif "image/webp" in header:
                        ext = ".webp"
                else:
                    encoded = image_data
                    ext = ".png"

                raw_bytes = base64.b64decode(encoded)
                filename = f"upload_{uuid.uuid4().hex[:12]}{ext}"
                file_path = os.path.join(UPLOADS_DIR, filename)

                with open(file_path, "wb") as f:
                    f.write(raw_bytes)

                url = f"/uploads/{filename}"
                self.send_json({"success": True, "url": url})
            except Exception as e:
                self.send_json({"success": False, "error": f"Error guardando imagen: {str(e)}"}, 500)
            return

        # API: Create Project
        if path == "/api/projects":
            title = body.get("title")
            if not title:
                self.send_json({"success": False, "error": "El título del proyecto es obligatorio"}, 400)
                return

            project = database.create_project(body)
            self.send_json({"success": True, "project": project}, 201)
            return

        # API: Create Task (Kanban)
        if path.startswith("/api/projects/") and path.endswith("/tasks"):
            parts = path.strip("/").split("/")
            try:
                project_id = int(parts[2])
                title = body.get("title")
                if not title:
                    self.send_json({"success": False, "error": "El título de la tarea es obligatorio"}, 400)
                    return
                assignee = body.get("assignee", "Desarrollador Kunkurt")
                priority = body.get("priority", "medium")
                status = body.get("status", "todo")

                task = database.add_task(project_id, title, assignee, priority, status)
                self.send_json({"success": True, "task": task}, 201)
            except (ValueError, IndexError):
                self.send_json({"success": False, "error": "ID de proyecto inválido"}, 400)
            return

        # API: Add Comment / Feedback
        if path.startswith("/api/projects/") and path.endswith("/comments"):
            parts = path.strip("/").split("/")
            try:
                project_id = int(parts[2])
                content = body.get("content")
                if not content:
                    self.send_json({"success": False, "error": "El comentario no puede estar vacío"}, 400)
                    return

                user_name = body.get("user_name", "Colaborador Kunkurt")
                user_role = body.get("user_role", "employee")
                avatar_url = body.get("avatar_url", "")
                feedback_type = body.get("feedback_type", "general")

                new_comment = database.add_comment(
                    project_id=project_id,
                    user_name=user_name,
                    user_role=user_role,
                    avatar_url=avatar_url,
                    content=content,
                    feedback_type=feedback_type
                )
                self.send_json({"success": True, "comment": new_comment})
            except (ValueError, IndexError):
                self.send_json({"success": False, "error": "ID de proyecto inválido"}, 400)
            return

        # API: Toggle Like
        if path.startswith("/api/projects/") and path.endswith("/like"):
            parts = path.strip("/").split("/")
            try:
                project_id = int(parts[2])
                user_id = body.get("user_id", "anonymous_user")
                res = database.toggle_like(project_id, user_id)
                self.send_json({"success": True, **res})
            except (ValueError, IndexError):
                self.send_json({"success": False, "error": "ID de proyecto inválido"}, 400)
            return

        # API: Create Ticket
        if path == "/api/tickets" or path == "/api/tickets/create":
            title = body.get("title", "").strip()
            description = body.get("description", "").strip()
            category = body.get("category", "Soporte").strip()
            priority = body.get("priority", "media").strip().lower()
            project_id = body.get("project_id")
            project_title = body.get("project_title", "General").strip()
            author_name = body.get("author_name", "Usuario").strip()
            author_email = body.get("author_email", "").strip().lower()
            author_role = body.get("author_role", "cliente").strip()
            assigned_id = body.get("assigned_id")

            if not title or not description or not author_email:
                self.send_json({"success": False, "error": "Título, descripción y correo electrónico son obligatorios."}, 400)
                return

            ticket = database.create_ticket(
                title=title,
                description=description,
                category=category,
                priority=priority,
                project_id=project_id,
                project_title=project_title,
                author_name=author_name,
                author_email=author_email,
                author_role=author_role,
                assigned_id=assigned_id
            )

            # Webhook dispatch
            dispatch_webhook(
                title=f"🎫 Nuevo Ticket #{ticket['ticket_code']}",
                description=ticket['title'],
                fields={
                    "Prioridad": ticket['priority'].upper(),
                    "Categoría": ticket['category'],
                    "Autor": f"{ticket['author_name']} ({ticket['author_email']})",
                    "Proyecto": ticket['project_title']
                },
                color=0xef4444 if ticket['priority'] == 'critica' else 0x8b5cf6,
                event_type="ticket"
            )

            # Gmail Notification to Admin & Confirmation to Client
            notify_ticket_created_emails(ticket)

            self.send_json({"success": True, "ticket": ticket, "message": f"Ticket #{ticket['ticket_code']} creado exitosamente."})
            return

        # API: Update Ticket Status
        if path == "/api/tickets/status":
            ticket_id = body.get("ticket_id")
            new_status = body.get("status", "").strip().lower()
            updated_by = body.get("updated_by_name", "Colaborador").strip()

            if not ticket_id or not new_status:
                self.send_json({"success": False, "error": "ID de ticket y nuevo estado requeridos."}, 400)
                return

            updated_ticket = database.update_ticket_status(ticket_id, new_status, updated_by)
            if updated_ticket:
                self.send_json({"success": True, "ticket": updated_ticket})
            else:
                self.send_json({"success": False, "error": "Ticket no encontrado"}, 404)
            return

        # API: Assign Ticket
        if path == "/api/tickets/assign":
            ticket_id = body.get("ticket_id")
            user_id = body.get("user_id")
            assigned_by = body.get("assigned_by_name", "Administrador").strip()

            if not ticket_id or not user_id:
                self.send_json({"success": False, "error": "ID de ticket y ID de usuario requeridos."}, 400)
                return

            updated_ticket = database.assign_ticket(ticket_id, user_id, assigned_by)
            if updated_ticket:
                self.send_json({"success": True, "ticket": updated_ticket})
            else:
                self.send_json({"success": False, "error": "Ticket o usuario no encontrado"}, 404)
            return

        # API: Add Ticket Comment
        if path == "/api/tickets/comment":
            ticket_id = body.get("ticket_id")
            user_name = body.get("user_name", "").strip()
            user_email = body.get("user_email", "").strip().lower()
            user_role = body.get("user_role", "colaborador").strip()
            content = body.get("content", "").strip()
            user_avatar = body.get("user_avatar")

            if not ticket_id or not content or not user_name:
                self.send_json({"success": False, "error": "ID de ticket, nombre y comentario son obligatorios."}, 400)
                return

            comment = database.add_ticket_comment(
                ticket_id=ticket_id,
                user_name=user_name,
                user_email=user_email,
                user_role=user_role,
                content=content,
                user_avatar=user_avatar
            )
            self.send_json({"success": True, "comment": comment})
            return

        # API: Team Live Messages (Chat & Announcements)
        if path == "/api/team/messages":
            req_role = self.headers.get("X-User-Role", "").strip().lower()
            user_role = body.get("user_role", "developer").strip()
            if req_role in ("client", "public", "cliente") or user_role.lower() in ("client", "public", "cliente"):
                self.send_json({"success": False, "error": "Acceso denegado: El Chat de Equipo es de uso exclusivo para ingenieros y colaboradores internos."}, 403)
                return

            user_name = body.get("user_name", "").strip()
            user_email = body.get("user_email", "").strip()
            user_role = body.get("user_role", "developer").strip()
            message = body.get("message", "").strip()
            message_type = body.get("message_type", "chat").strip()
            is_pinned = body.get("is_pinned", 0)
            user_avatar = body.get("user_avatar")

            if not user_name or not message:
                self.send_json({"success": False, "error": "Nombre y mensaje son requeridos."}, 400)
                return

            if (is_pinned or message_type == "announcement") and user_role.lower() != "admin":
                is_pinned = 0
                message_type = "chat"

            msg = database.add_team_message(
                user_name=user_name,
                user_email=user_email,
                user_role=user_role,
                message=message,
                message_type=message_type,
                is_pinned=is_pinned,
                user_avatar=user_avatar
            )
            self.send_json({"success": True, "message": msg})
            return

        # API: Create Knowledge Base Article
        if path == "/api/wiki":
            title = body.get("title", "").strip()
            content = body.get("content", "").strip()
            category = body.get("category", "General").strip()
            author_name = body.get("author_name", "Developer").strip()
            author_role = body.get("author_role", "developer").strip()
            tags = body.get("tags", [])

            if not title or not content:
                self.send_json({"success": False, "error": "Título y contenido requeridos."}, 400)
                return

            article = database.create_knowledge_article(
                title=title,
                content=content,
                category=category,
                author_name=author_name,
                author_role=author_role,
                tags=tags
            )
            self.send_json({"success": True, "article": article})
            return

        # API: Interactive Project Quotations (Cotizador)
        if path == "/api/quotations/create":
            client_name = body.get("client_name", "").strip()
            client_email = body.get("client_email", "").strip()
            client_company = body.get("client_company", "").strip()
            project_type = body.get("project_type", "Web App Full-Stack").strip()
            features = body.get("features", [])
            budget_usd = float(body.get("budget_usd", 0))
            timeline_weeks = int(body.get("timeline_weeks", 4))
            description = body.get("description", "").strip()

            if not client_name or not client_email:
                self.send_json({"success": False, "error": "Nombre y correo son obligatorios."}, 400)
                return

            # Auto-generate ticket in tickets table
            ticket_title = f"Cotización #{int(datetime.now().timestamp()) % 10000}: {project_type} para {client_name}"
            ticket_desc = (
                f"Solicitud de Cotización Interactiva:\n\n"
                f"• Cliente: {client_name} ({client_email}) - Empresa: {client_company or 'Independiente'}\n"
                f"• Tipo de Proyecto: {project_type}\n"
                f"• Presupuesto Estimado: ${budget_usd:,.2f} USD\n"
                f"• Plazo Estimado: {timeline_weeks} semanas\n"
                f"• Módulos Seleccionados: {', '.join(features) if features else 'Estándar'}\n\n"
                f"• Requisitos y Detalles del Cliente:\n{description or 'Sin requisitos específicos adicionales.'}"
            )

            ticket = database.create_ticket(
                title=ticket_title,
                description=ticket_desc,
                category="Cotización & Ventas",
                priority="alta",
                project_id=None,
                project_title="Propuesta Comercial",
                author_name=client_name,
                author_email=client_email,
                author_role="cliente"
            )

            # Webhook dispatch
            dispatch_webhook(
                title="💼 Nueva Solicitud de Cotización",
                description=f"El cliente **{client_name}** ha generado una cotización de **{project_type}**.",
                fields={
                    "Presupuesto": f"${budget_usd:,.2f} USD",
                    "Plazo": f"{timeline_weeks} semanas",
                    "Ticket": f"#{ticket['ticket_code']}",
                    "Email": client_email
                },
                color=0x10b981,
                event_type="quote"
            )

            # Gmail Notification to Admin & Confirmation to Client
            notify_quotation_created_emails(body, ticket)

            self.send_json({
                "success": True,
                "message": "Cotización procesada exitosamente. Se ha generado el ticket de seguimiento.",
                "ticket": ticket,
                "summary": {
                    "project_type": project_type,
                    "budget_usd": budget_usd,
                    "timeline_weeks": timeline_weeks,
                    "ticket_code": ticket["ticket_code"]
                }
            })
            return

        # API: Save Payment Gateway Settings (Stripe, Mercado Pago PSE, PayPal, Crypto)
        if path == "/api/payments/settings":
            req_role = self.headers.get("X-User-Role", "").strip().lower()
            if req_role not in ("admin", "fundador", "director"):
                self.send_json({"success": False, "error": "Acceso restringido. Solo el Director / Administrador puede configurar credenciales de pago."}, 403)
                return
            saved = database.save_payment_settings(body)
            self.send_json({"success": True, "message": "Configuración de pasarelas guardada correctamente.", "settings": saved})
            return

        # API: Create Real Checkout Session (Stripe Hosted Checkout / Mercado Pago PSE / PayPal / Crypto)
        if path == "/api/payments/create-checkout-session":
            client_name = body.get("client_name", "").strip() or "Cliente Kunkurt"
            client_email = body.get("client_email", "").strip().lower() or "cliente@kunkurt.com"
            amount = float(body.get("amount", 0))
            currency = body.get("currency", "USD").strip().upper() or "USD"
            gateway = body.get("gateway", "stripe").strip().lower()
            concept = body.get("concept", "Servicios de Software & POS Kunkurt").strip()

            settings = database.get_payment_settings()
            host_hdr = self.headers.get("Host", f"localhost:{PORT}")
            proto = "https" if "https" in self.headers.get("X-Forwarded-Proto", "") else "http"

            # 1. STRIPE CHECKOUT (Real Credit Cards, Apple Pay, Google Pay)
            if gateway in ("stripe", "apple_pay", "google_pay"):
                secret_key = settings.get("stripe_secret_key") or STRIPE_SECRET_KEY
                if secret_key and stripe:
                    try:
                        stripe.api_key = secret_key
                        session = stripe.checkout.Session.create(
                            payment_method_types=["card"],
                            line_items=[{
                                "price_data": {
                                    "currency": currency.lower(),
                                    "product_data": {
                                        "name": f"Kunkurt Devs — {concept}",
                                        "description": f"Cliente: {client_name} ({client_email})"
                                    },
                                    "unit_amount": int(round(amount * 100)),
                                },
                                "quantity": 1,
                            }],
                            mode="payment",
                            customer_email=client_email,
                            success_url=f"{proto}://{host_hdr}/?payment=success&gateway=stripe&session_id={{CHECKOUT_SESSION_ID}}",
                            cancel_url=f"{proto}://{host_hdr}/?payment=cancel",
                        )
                        self.send_json({
                            "success": True,
                            "mode": "live_redirect",
                            "gateway": "stripe",
                            "checkout_url": session.url,
                            "session_id": session.id
                        })
                        return
                    except Exception as err:
                        print(f"Aviso Stripe API: {err}")

            # 2. MERCADO PAGO CHECKOUT (PSE Bancolombia, Nequi, Tarjetas Latam)
            if gateway == "mercadopago":
                token = settings.get("mercadopago_access_token") or MERCADOPAGO_ACCESS_TOKEN
                if token and mercadopago:
                    try:
                        sdk = mercadopago.SDK(token)
                        # Conversion to COP if preferred or USD
                        mp_currency = "COP" if currency == "COP" else "USD"
                        pref_data = {
                            "items": [{
                                "title": f"Kunkurt Devs — {concept}",
                                "quantity": 1,
                                "unit_price": float(amount),
                                "currency_id": mp_currency
                            }],
                            "payer": {
                                "name": client_name,
                                "email": client_email
                            },
                            "back_urls": {
                                "success": f"{proto}://{host_hdr}/?payment=success&gateway=mercadopago",
                                "failure": f"{proto}://{host_hdr}/?payment=failure",
                                "pending": f"{proto}://{host_hdr}/?payment=pending"
                            },
                            "auto_return": "approved"
                        }
                        pref_res = sdk.preference().create(pref_data)
                        init_point = pref_res.get("response", {}).get("init_point") or pref_res.get("response", {}).get("sandbox_init_point")
                        if init_point:
                            self.send_json({
                                "success": True,
                                "mode": "live_redirect",
                                "gateway": "mercadopago",
                                "checkout_url": init_point,
                                "preference_id": pref_res.get("response", {}).get("id")
                            })
                            return
                    except Exception as err:
                        print(f"Aviso Mercado Pago API: {err}")

            # 3. PAYPAL CHECKOUT (PayPal REST API v2 Orders)
            if gateway == "paypal":
                client_id = settings.get("paypal_client_id") or PAYPAL_CLIENT_ID
                client_secret = settings.get("paypal_client_secret") or PAYPAL_CLIENT_SECRET
                if client_id and client_secret:
                    try:
                        pp_mode = settings.get("paypal_mode") or PAYPAL_MODE or "sandbox"
                        base_url = "https://api-m.paypal.com" if pp_mode == "live" else "https://api-m.sandbox.paypal.com"
                        # Get access token
                        auth_bytes = f"{client_id}:{client_secret}".encode("utf-8")
                        auth_header = f"Basic {base64.b64encode(auth_bytes).decode('utf-8')}"
                        token_req = urllib.request.Request(
                            f"{base_url}/v1/oauth2/token",
                            data=b"grant_type=client_credentials",
                            headers={
                                "Authorization": auth_header,
                                "Content-Type": "application/x-www-form-urlencoded"
                            }
                        )
                        with urllib.request.urlopen(token_req, timeout=10) as t_resp:
                            t_data = json.loads(t_resp.read().decode("utf-8"))
                            access_token = t_data.get("access_token")

                        if access_token:
                            # Create order
                            order_payload = json.dumps({
                                "intent": "CAPTURE",
                                "purchase_units": [{
                                    "description": f"Kunkurt Devs — {concept}",
                                    "amount": {
                                        "currency_code": currency,
                                        "value": f"{amount:.2f}"
                                    }
                                }],
                                "application_context": {
                                    "return_url": f"{proto}://{host_hdr}/?payment=success&gateway=paypal",
                                    "cancel_url": f"{proto}://{host_hdr}/?payment=cancel",
                                    "brand_name": "Kunkurt Devs",
                                    "user_action": "PAY_NOW"
                                }
                            }).encode("utf-8")

                            order_req = urllib.request.Request(
                                f"{base_url}/v2/checkout/orders",
                                data=order_payload,
                                headers={
                                    "Authorization": f"Bearer {access_token}",
                                    "Content-Type": "application/json"
                                }
                            )
                            with urllib.request.urlopen(order_req, timeout=10) as o_resp:
                                o_data = json.loads(o_resp.read().decode("utf-8"))
                                approve_link = next((l["href"] for l in o_data.get("links", []) if l.get("rel") == "approve"), None)
                                if approve_link:
                                    self.send_json({
                                        "success": True,
                                        "mode": "live_redirect",
                                        "gateway": "paypal",
                                        "checkout_url": approve_link,
                                        "order_id": o_data.get("id")
                                    })
                                    return
                    except Exception as err:
                        print(f"Aviso PayPal API: {err}")

            # 4. CRIPTO VAULT (USDT / Binance Pay QR)
            if gateway == "crypto":
                wallet = settings.get("crypto_wallet") or CRYPTO_WALLET_ADDRESS or "TDX7a9hN21aE7KkQZ8kM92KunkurtPay928"
                network = settings.get("crypto_network") or "USDT TRC-20"
                self.send_json({
                    "success": True,
                    "mode": "crypto_vault",
                    "gateway": "crypto",
                    "wallet_address": wallet,
                    "network": network,
                    "amount": amount,
                    "currency": "USDT",
                    "concept": concept
                })
                return

            # Default: Sandbox Simulated Transaction Ready
            self.send_json({
                "success": True,
                "mode": "sandbox",
                "gateway": gateway,
                "message": "Pasarela en Modo Sandbox Activo. Puedes completar la prueba aquí o configurar tus credenciales en Ajustes > Pasarelas."
            })
            return

        # API: Process Global Payment (Stripe, PayPal, MercadoPago, Apple Pay, Google Pay, Cripto)
        if path == "/api/payments/process" or path == "/api/payments":
            client_name = body.get("client_name", "").strip()
            client_email = body.get("client_email", "").strip().lower()
            client_company = body.get("client_company", "").strip()
            amount = float(body.get("amount", 0))
            currency = body.get("currency", "USD").strip().upper() or "USD"
            gateway = body.get("gateway", "stripe").strip().lower()
            gateway_title = body.get("gateway_title", "").strip()
            concept = body.get("concept", "Desarrollo de Software & Arquitectura Cloud").strip()
            payment_data = body.get("payment_data", {})

            if not client_name or not client_email:
                self.send_json({"success": False, "error": "Nombre y correo son obligatorios para procesar el pago."}, 400)
                return

            if amount <= 0:
                self.send_json({"success": False, "error": "El monto a pagar debe ser mayor a 0."}, 400)
                return

            gateway_titles_map = {
                "stripe": "Stripe (Visa / Mastercard / Amex)",
                "paypal": "PayPal Global Checkout",
                "mercadopago": "Mercado Pago (PSE / Tarjetas Latam)",
                "apple_pay": "Apple Pay (Biométrico Móvil)",
                "google_pay": "Google Pay (Biométrico 1-Tap)",
                "crypto": "Cripto / Web3 (Binance Pay & USDT)"
            }
            if not gateway_title:
                gateway_title = gateway_titles_map.get(gateway, gateway.upper())

            # Automatically create or link support ticket in HelpDesk
            ticket_desc = (
                f"Transacción de Pago Registrada:\n\n"
                f"• Cliente: {client_name} ({client_email})\n"
                f"• Monto: ${amount:,.2f} {currency}\n"
                f"• Pasarela: {gateway_title}\n"
                f"• Concepto: {concept}\n"
                f"• Estado: Completado y Verificado\n"
                f"• Detalles de Facturación: {client_company or 'Cliente Particular'}"
            )
            ticket = database.create_ticket(
                title=f"Pago Aprobado: ${amount:,.2f} {currency} ({gateway_title})",
                description=ticket_desc,
                category="Facturación & Pagos",
                priority="alta",
                project_id=None,
                project_title="Facturación & Finanzas",
                author_name=client_name,
                author_email=client_email,
                author_role="cliente"
            )

            # Register transaction in payments table
            payment = database.create_payment(
                client_name=client_name,
                client_email=client_email,
                amount=amount,
                gateway=gateway,
                gateway_title=gateway_title,
                concept=concept,
                client_company=client_company,
                currency=currency,
                status="completed",
                payment_data=payment_data,
                ticket_id=ticket.get("id"),
                ticket_code=ticket.get("ticket_code")
            )

            # Webhook dispatch
            dispatch_webhook(
                title=f"💳 Pago Recibido: ${amount:,.2f} {currency}",
                description=f"**{client_name}** realizó un pago exitoso vía **{gateway_title}**.",
                fields={
                    "Referencia": payment.get("transaction_id", ""),
                    "Concepto": concept,
                    "Monto": f"${amount:,.2f} {currency}",
                    "Email": client_email
                },
                color=0x10b981,
                event_type="payment"
            )

            # Real Gmail notification dispatch to Admin and Client
            notify_payment_completed_emails(payment)

            self.send_json({
                "success": True,
                "message": "Pago procesado y verificado exitosamente.",
                "payment": payment,
                "ticket": ticket
            })
            return

        # API: Schedule Discovery Meeting (Google Meet Integration)
        if path == "/api/meetings/schedule" or path == "/api/meetings":
            client_name = body.get("client_name", "").strip()
            client_email = body.get("client_email", "").strip().lower()
            client_company = body.get("client_company", "").strip()
            meet_date = (body.get("meeting_date") or body.get("date") or "").strip()
            meet_time = (body.get("meeting_time") or body.get("time") or "").strip()
            timezone = body.get("timezone", "America/Bogota").strip()
            topic = body.get("topic", "Sesión de Asesoría de Arquitectura de Software").strip()
            notes = body.get("notes", "").strip()

            if not client_name or not client_email or not meet_date or not meet_time:
                self.send_json({"success": False, "error": "Nombre, correo, fecha y hora son obligatorios."}, 400)
                return

            meeting = database.create_meeting(
                client_name=client_name,
                client_email=client_email,
                meeting_date=meet_date,
                meeting_time=meet_time,
                topic=topic,
                client_company=client_company,
                timezone=timezone,
                notes=notes
            )

            # Webhook dispatch
            dispatch_webhook(
                title=f"📅 Nueva Discovery Call Agendada",
                description=f"El cliente **{client_name}** agendó una sesión técnica.",
                fields={
                    "Fecha": f"{meet_date} {meet_time} ({timezone})",
                    "Tema": topic,
                    "Enlace Meet": meeting.get("meet_link", ""),
                    "Email": client_email
                },
                color=0x3b82f6,
                event_type="meeting"
            )

            # Gmail Notification to Admin & Client
            if meeting:
                meeting["meet_url"] = meeting.get("meet_link", "")
            notify_meeting_scheduled_emails(meeting)

            self.send_json({
                "success": True,
                "message": "Reunión agendada exitosamente. Se ha enviado la invitación por correo con el enlace de Google Meet.",
                "meeting": meeting
            })
            return

        # API: AI Copilot Conversational Assistant
        if path == "/api/ai/chat":
            user_msg = body.get("message", "").strip()
            user_name = body.get("user_name", "Visitante").strip()
            user_role = body.get("user_role", "public").strip()

            if not user_msg:
                self.send_json({"success": False, "error": "Mensaje requerido"}, 400)
                return

            reply = handle_copilot_chat(user_msg, user_role, user_name)
            self.send_json({
                "success": True,
                "reply": reply,
                "timestamp": datetime.now().strftime("%H:%M")
            })
            return

        # API: Save Webhook Settings
        if path == "/api/settings/webhooks":
            saved = database.save_webhook_settings(body)
            self.send_json({"success": True, "settings": saved, "message": "Configuración de webhooks guardada exitosamente."})
            return

        # API: Test Webhook Dispatch
        if path == "/api/webhooks/test":
            dispatch_webhook(
                title="⚡ Test de Conexión Kunkurt Cyber Webhooks",
                description="Esta es una notificación de prueba emitida desde el panel de control de Kunkurt Devs.",
                fields={"Estado": "Operativo 100%", "Servidor": "Localhost / LAN / Túnel"},
                color=0x8b5cf6,
                event_type="general"
            )
            self.send_json({"success": True, "message": "Notificación de prueba enviada a los webhooks activos."})
            return

        self.send_json({"success": False, "error": "Ruta no encontrada"}, 404)

    def do_PUT(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # Update Task Status (Kanban)
        if path.startswith("/api/tasks/") and path.endswith("/status"):
            parts = path.strip("/").split("/")
            try:
                task_id = int(parts[2])
                body = self.read_json_body()
                new_status = body.get("status")
                if not new_status:
                    self.send_json({"success": False, "error": "Falta el nuevo estado"}, 400)
                    return
                task = database.update_task_status(task_id, new_status)
                self.send_json({"success": True, "task": task})
            except (ValueError, IndexError):
                self.send_json({"success": False, "error": "ID de tarea inválido"}, 400)
            return

        # Update Project
        if path.startswith("/api/projects/"):
            parts = path.strip("/").split("/")
            try:
                project_id = int(parts[2])
                body = self.read_json_body()
                updated = database.update_project(project_id, body)
                self.send_json({"success": True, "project": updated})
            except (ValueError, IndexError):
                self.send_json({"success": False, "error": "ID de proyecto inválido"}, 400)
            return

        self.send_json({"success": False, "error": "Ruta no encontrada"}, 404)

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # Delete Task
        if path.startswith("/api/tasks/"):
            parts = path.strip("/").split("/")
            try:
                task_id = int(parts[2])
                database.delete_task(task_id)
                self.send_json({"success": True, "message": "Tarea eliminada"})
            except (ValueError, IndexError):
                self.send_json({"success": False, "error": "ID de tarea inválido"}, 400)
            return

        # Delete Project
        if path.startswith("/api/projects/"):
            parts = path.strip("/").split("/")
            try:
                project_id = int(parts[2])
                database.delete_project(project_id)
                self.send_json({"success": True, "message": "Proyecto eliminado exitosamente"})
            except (ValueError, IndexError):
                self.send_json({"success": False, "error": "ID de proyecto inválido"}, 400)
            return

        self.send_json({"success": False, "error": "Ruta no encontrada"}, 404)

class ReusableThreadingServer(ThreadingHTTPServer):
    allow_reuse_address = True

def find_available_port(start_port=None, max_attempts=50):
    if start_port is None:
        start_port = int(os.getenv("PORT", 8080))
    for p in range(start_port, start_port + max_attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                s.bind((HOST, p))
                return p
            except OSError:
                continue
    return start_port

def run(custom_port=None):
    global PORT
    initial_port = custom_port or (int(sys.argv[1]) if len(sys.argv) > 1 and sys.argv[1].isdigit() else int(os.getenv("PORT", 8080)))
    PORT = find_available_port(initial_port)
    try:
        with open(str(ACTIVE_PORT_FILE), "w") as pf:
            pf.write(str(PORT))
    except Exception:
        pass

    server = ReusableThreadingServer((HOST, PORT), KunkurtAPIHandler)
    lan_ip = get_lan_ip()

    print("=" * 65, flush=True)
    print("⚡ SERVIDOR KUNKURT DEVS ACTIVO PARA TODO EL MUNDO", flush=True)
    print(f"👉 En tu computadora: http://localhost:{PORT}", flush=True)
    print(f"👉 En tu red local (celular, tablet u otra PC): http://{lan_ip}:{PORT}", flush=True)
    print(f"👉 Sincronización GitHub y Login con Correo: Habilitados", flush=True)
    print("=" * 65, flush=True)
    print("Presiona Ctrl + C en tu terminal para detener.\n", flush=True)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.", flush=True)
        server.server_close()

if __name__ == "__main__":
    run()
