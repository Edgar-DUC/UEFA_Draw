from flask import Flask, redirect, url_for, jsonify
from flask import request
from flask import render_template

app = Flask(__name__)

@app.route("/Champions_League", methods=["GET", "POST"])
def index_CL():
    return render_template("accueil.html", title="UEFA Champions League Draw", l_b="UEFA Europa League", r_b="UEFA Europa Conference League", redirect_g="index_EL", redirect_d="index_ECL", bottom="https://www.lequipe.fr/tv/", java="test_bis.js")

@app.route("/Europa_League", methods=["GET", "POST"])
def index_EL():
    return render_template("accueil.html", title="UEFA Europa League Draw", l_b="UEFA Champions League", r_b="UEFA Europa Conference League", redirect_g="index_CL", redirect_d="index_ECL", bottom="https://www.lequipe.fr/tv/", java="test_bis_el.js")

@app.route("/Europa_Conference_League", methods=["GET", "POST"])
def index_ECL():
    return render_template("accueil.html", title="UEFA Europa Conference League Draw", l_b="UEFA Champions League", r_b="UEFA Europa League", redirect_g="index_CL", redirect_d="index_EL", bottom="https://www.lequipe.fr/tv/", java="test_bis_ecl.js")


if __name__ == '__main__':
    app.run(debug=True)