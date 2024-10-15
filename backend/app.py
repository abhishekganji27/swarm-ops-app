from flask import Flask, render_template, jsonify, flash
import docker
import docker.errors as de
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_client():
    return docker.from_env()

# Home
@app.route('/')
def home():
    client = get_client()
    p = client.ping()
    return jsonify( {"ping": p} )
    # return render_template('index.html', ping = p)

# Swarm Services - List
@app.route("/services")
def swarm_services_list():
    try:
        client = get_client()
        slist = client.services.list()
        return jsonify( { "services list" : slist } )
        # return render_template("services/list.html", res_list = slist)
    except de.APIError as e:
        flash("Error!")
        return jsonify( { "error" : e } )
        # return render_template("404.html", error=e)


# Swarm Services - Inspect
@app.route("/services/inspect/<id>")
def swarm_service_inspect(id):
    try:
        client = get_client()
        response = client.services.get(id)
        service = { response }
        return jsonify( { "service" : service } )
        # return render_template("services/inspect.html", service=service)
    
    except de.NotFound as nf:
        return jsonify( { "error" : nf } )
        # return render_template("404.html", error = nf)
    except de.APIError as ae:
        return jsonify( { "error" :  ae } )
        # return render_template("404.html", error = ae)
    except de.InvalidVersion as iv:
        return jsonify( { "error" :  iv } )
        # return render_template("404.html", error = iv)

# Swarm Services - Update
@app.route("/services/update/<id>")
def swarm_service_update():
    pass

# Swarm Nodes API
@app.route("/nodes")
def swarm_nodes_list():
    try:
        client = get_client()
        nlist = client.nodes.list()
        return jsonify( { "nodes list" : nlist } )
        # return render_template("nodes/list.html", res_list = nlist)

    except de.APIError as e:
        flash("Error!")
        return jsonify( { "error" : e } )
        # return render_template("404.html", error=e)