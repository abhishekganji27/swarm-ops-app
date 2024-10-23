from flask import Flask, render_template, jsonify, flash
from flask_cors import CORS
import docker
import docker.errors as de

app = Flask(__name__)
cors = CORS(app, origins='*')

def get_client():
    return docker.from_env()

 
# Home
@app.route('/')
def home():
    client = get_client()
    p = client.ping()
    return jsonify({
        "ping": p, "hello": "world"
    })
 
# Swarm Services - List
@app.route("/services")
def swarm_services_list():
    try:
        client = get_client()
        slist = client.services.list()
        services_data = [service.attrs for service in slist]  # Convert service objects to dictionaries
        return jsonify({"services": services_data})
    except de.APIError as e:
        return jsonify({"error": str(e)}), 500  # Return a 500 error with the message
 
# Swarm Services - Inspect
@app.route("/services/inspect/<id>")
def swarm_service_inspect(id):
    try:
        client = get_client()
        response = client.services.get(id)
        return jsonify({"service": response.attrs})  # Convert the service object to a dictionary
    except de.NotFound as nf:
        return jsonify({"error": str(nf)}), 404  # Return a 404 error
    except de.APIError as ae:
        return jsonify({"error": str(ae)}), 500
    except de.InvalidVersion as iv:
        return jsonify({"error": str(iv)}), 400  # Return a 400 error for invalid version
 
# Swarm Services - Update
@app.route("/services/update/<id>", methods=['POST'])
def swarm_service_update(id):
    # Implementation for updating a service would go here
    pass
 
# Swarm Nodes API
@app.route("/nodes")
def swarm_nodes_list():
    try:
        client = get_client()
        nlist = client.nodes.list()
        nodes_data = [node.attrs for node in nlist]  # Convert node objects to dictionaries
        return jsonify({"nodes": nodes_data})
    except de.APIError as e:
        return jsonify({"error": str(e)}), 500  # Return a 500 error with the message
 
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)