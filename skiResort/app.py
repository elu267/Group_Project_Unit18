# import necessary libraries
import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#################################################
# Database Setup
#################################################
#app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///../Resources/skiResortsNA.sqlite"
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///../Resources/clean_skiResortsNA.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
skiResorts = Base.classes.clean_skiResorts

# create route that renders index.html template
@app.route("/")
def index():
    """Return the homepage."""
    print("reading the index function")
    return render_template("index.html")

@app.route("/api/resorts")
def resorts():
    stmt = db.session.query(skiResorts).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    print('def resorts')
    #return jsonify(clean_skiResorts)
    return jsonify(list(df.columns)[2:])


if __name__ == "__main__":
    app.run()