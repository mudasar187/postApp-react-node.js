import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="row">
      <div className="col-md-6">
        <Link to="/profiles" className="btn btn-light mb-3 float-left">
          Back To Profiles
        </Link>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 className="display-4">Profile not found</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
