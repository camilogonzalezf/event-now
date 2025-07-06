import os, json
from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from pydantic import BaseModel, EmailStr, ValidationError
from config import Config

class Reservation(BaseModel):
    eventId: int
    name: str
    email: EmailStr
    date: str
    tickets: int

def create_app():
    app = Flask(__name__, static_folder="static", template_folder="templates")
    app.config.from_object(Config)
    CORS(app, origins=app.config["CORS_ORIGINS"])

    # Carga inicial de eventos
    events_path = os.path.join(app.root_path, app.config["EVENTS_PATH"])
    with open(events_path, "r", encoding="utf-8") as f:
        app.events = json.load(f)

    @app.route("/images/<path:filename>")
    def serve_images(filename):
        return send_from_directory(os.path.join(app.root_path, "static", "images"), filename)

    @app.route("/favicon.ico")
    def serve_favicon():
        return app.send_static_file("favicon.ico")

    @app.route("/api/events", methods=["GET"])
    def get_events():
        text = request.args.get("text", "").strip().lower()
        city = request.args.get("city", "").strip().lower()
        date = request.args.get("date", "").strip()
        filtered = []
        for e in app.events:
            if text and text not in e["name"].lower() and text not in e.get("description","").lower():
                continue
            if city and city != e["city"].lower():
                continue
            if date and not e["date"].startswith(date):
                continue
            filtered.append(e)
        return jsonify(filtered), 200

    @app.route("/api/reservations", methods=["POST"])
    def add_reservation():
        try:
            data = Reservation(**request.get_json()).dict()
        except ValidationError as e:
            return jsonify({"errors": e.errors()}), 400

        path = os.path.join(app.root_path, app.config["JSON_PATH"])
        with open(path, "r+", encoding="utf-8") as f:
            reservations = json.load(f)
            reservations.append(data)
            f.seek(0)
            json.dump(reservations, f, indent=2)
            f.truncate()
        return jsonify({"status": "ok"}), 201

    @app.route("/reservations")
    def show_reservations():
        path = os.path.join(app.root_path, app.config["JSON_PATH"])
        with open(path, "r", encoding="utf-8") as f:
            reservations = json.load(f)
        reservations.sort(key=lambda r: r["date"])
        return render_template("reservations.html", reservations=reservations)

    @app.route("/")
    def index():
        return app.send_static_file("index.html")

    return app

if __name__ == "__main__":
    create_app().run(host="0.0.0.0", port=5000)
