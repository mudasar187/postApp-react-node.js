import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="row">
      <div className="col-md-6">
        <Link to="/dashboard" className="btn btn-light mb-3 float-left">
          Back To Dashboard
        </Link>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 className="display-4">Page Not Found</h1>
            <p>Sorry this page not found</p>
          </div>
        </div>
      </div>
    </div>
  );
};
