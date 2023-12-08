from flask import Flask, redirect, url_for, jsonify
from flask import request
from flask import render_template

app = Flask(__name__)

@app.route("/Champions_League", methods=["GET", "POST"])
def index_CL():
    return render_template("accueil.html", title="UEFA Champions League Draw", l_b="UEFA Europa League", r_b="UEFA Europa Conference League", redirect_g="index_EL", redirect_d="index_ECL", bottom="index_test")

@app.route("/Europa_League", methods=["GET", "POST"])
def index_EL():
    return render_template("accueil.html", title="UEFA Europa League Draw", l_b="UEFA Champions League", r_b="UEFA Europa Conference League", redirect_g="index_CL", redirect_d="index_ECL", bottom="index_test")

@app.route("/Europa_Conference_League", methods=["GET", "POST"])
def index_ECL():
    return render_template("accueil.html", title="UEFA Europa Conference League Draw", l_b="UEFA Champions League", r_b="UEFA Europa League", redirect_g="index_CL", redirect_d="index_EL", bottom="index_test")

@app.route("/Test", methods=["GET", "POST"])
def index_test():
    return render_template("page_uefa.html", title="UEFA Champions League Draw")

@app.route('/static/resultat_hoy_complet.json')
def get_resultat():
    try:
        with open('static/PROBA/resultat_hoy_complet.json', 'r') as file:
            data = file.read()
            return jsonify(data)
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404


if __name__ == '__main__':
    app.run(debug=True)