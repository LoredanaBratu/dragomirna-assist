import React, { Component } from "react";
import "./dashboard.css";
import Event from "../event/event";
import LoadingBar from "../loading/loading";
import { Redirect } from "react-router-dom";

export default class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchEvent();
  }

  render() {
    const token = localStorage.getItem("token");
    const { loading, error, events } = this.props;

    return (
      <div>
        {token ? (
          <div className="container mb-5">
            <div className="headText text-center">
              <h1 className="headTitle">Evenimente</h1>
              <h6 className="headDescription">
                Descoperă cele mai recente curse de Mountain Bike si Running din
                Suceava.
              </h6>
            </div>
            <div className="col-md-12 events">
              {loading ? (
                <div className="row eventRow">
                  <LoadingBar />
                </div>
              ) : error ? (
                <h1 className="headTitle">Error</h1>
              ) : (
                <div className="row">
                  {events.map((event, index) => (
                    <div
                      key={index}
                      className={
                        events.length === 1
                          ? "col-md-12"
                          : events.length === 2
                          ? "col-md-6"
                          : "col-md-4"
                      }
                    >
                      <Event event={event} length={events.length} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    );
  }
}
