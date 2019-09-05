import React, { Component } from "react";
import "./event.css";
import moment from "moment";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { event, length } = this.props;
    return (
      <React.Fragment>
        {event && (
          <div>
            <a href={"about-event/" + event.id}>
              <div className={length === 1 ? "oneEventImg" : "eventImg"}>
                <img
                  className="eventComponent"
                  alt="event"
                  src={event.photo_url}
                />
                <button className={length === 1 ? "oneDate" : "date"}>
                  <div>
                    {moment(event.date)
                      .format("ll")
                      .substring(4, 6)}
                  </div>
                  <span className="monthSpan">
                    {moment(event.date)
                      .format("ll")
                      .split(" ", 1)}{" "}
                  </span>
                </button>
                <h3 className="eventTitle">{event.event_title}</h3>
                <h5 className="eventDate">
                  {moment(event.date)
                    .format("LLL")
                    .split(" ", 2)
                    .join(" ")
                    .substring(
                      0,
                      moment(event.date)
                        .format("LLL")
                        .split(" ", 2)
                        .join(" ").length - 1
                    )}
                  | {event.competitions.length}{" "}
                  {event.competitions.length === 1 ? (
                    <span>Competition</span>
                  ) : (
                    <span>Competitions</span>
                  )}
                </h5>
              </div>
            </a>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Event;
