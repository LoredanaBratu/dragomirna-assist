import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import "./aboutEvent.css";
import Map from "../map";
import LoadingBar from "../loading/loading";

export default class aboutEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compSelected: false,
      compId: null
    };
  }

  componentDidMount() {
    this.props.fetchEvent();
  }

  showCompetitions = event => {
    event.stopPropagation();
    this.setState({ showComp: true });
  };

  hideCompetitions = () => {
    this.setState({ showComp: false });
  };

  selectCompetition = competitionId => {
    const currentId = this.props.match.params.id;
    this.props.requestCompetition(currentId, competitionId);
    this.props.requestParticipant(currentId, competitionId);
    this.setState({
      compSelected: true,
      compId: competitionId,
      showParticipant: true
    });
  };

  render() {
    const { events } = this.props;
    const { compSelected, compId } = this.state;
    const currentId = this.props.match.params.id;
    let competition = [];
    let participants = [];

    if (this.props.participant) {
      participants = this.props.participant.results;
    }

    if (this.props.competition.results) {
      competition = this.props.competition.results[0].competition;
    }

    return (
      <div className="about-content">
        {events && competition ? (
          // eslint-disable-next-line array-callback-return
          events.map((event, index) => {
            if (event.id === parseInt(currentId)) {
              return (
                <div key={index}>
                  <div className="aboutEventImg">
                    <img
                      className="eventPicture"
                      alt="moovie"
                      src={
                        compSelected ? competition.photo_url : event.photo_url
                      }
                    />
                    <button className="share">
                      <FontAwesomeIcon icon={faShareAlt} color="#2f1b3c" />
                    </button>
                    <button className="dateEvent">
                      <div>
                        {moment(event.date)
                          .format("ll")
                          .substring(4, 6)}
                      </div>
                      <span className="dateSpanEvent">
                        {moment(event.date)
                          .format("ll")
                          .split(" ", 1)}{" "}
                      </span>
                    </button>
                    <h3 className="viewEventTitle">
                      {compSelected
                        ? competition.competition_name
                        : event.event_title}
                    </h3>
                    <h5 className="viewEventDate">
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
                      |{" "}
                      {compSelected && event.competitions.length ? (
                        competition.type_competition
                      ) : event.competitions.length === 1 ? (
                        <span>{event.competitions.length} Competition</span>
                      ) : (
                        <span>{event.competitions.length} Competitions</span>
                      )}
                    </h5>
                  </div>
                  <div className="container">
                    <div className="row competitionsRow pt-3">
                      <h2
                        className="compTitle my-3"
                        onClick={e => this.showCompetitions(e)}
                      >
                        Select a competition
                      </h2>
                    </div>
                    <div>
                      <div className="row">
                        {event.competitions.map((competition, index) => {
                          return (
                            <div key={index} className="col-md-4 mb-3">
                              <img
                                src={competition.photo_url}
                                alt="competition"
                                className="competitionPhoto"
                                onClick={() =>
                                  this.selectCompetition(competition.id)
                                }
                              />

                              <h5 className="aboutCompetition">
                                {competition.competition_name}
                              </h5>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="tabsRow">
                      <div className="row">
                        <div className="col-md-12 switchButton">
                          <button
                            type="button"
                            className="btn btn-link switchLink switchActive"
                          >
                            DESPRE CURSA
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div>
                        <h3 className="eventDescription">
                          {event.description}
                        </h3>
                      </div>
                    </div>

                    <Link to={"/road-details/" + compId}>
                      <div className="eventRoad py-5">
                        <Map
                          id="myMap"
                          options={{
                            center: {
                              lat: parseFloat(event.lat_position),
                              lng: parseFloat(event.long_position)
                            },
                            zoom: 15
                          }}
                          onMapLoad={map => {
                            new window.google.maps.Marker({
                              position: {
                                lat: parseFloat(event.latitude),
                                lng: parseFloat(event.longitude)
                              },
                              map: map
                            });
                          }}
                        />
                      </div>
                    </Link>

                    <div className="tabsRow">
                      <div className="row">
                        {compSelected && (
                          <div className="col-md-12 switchButton ">
                            <button
                              type="button"
                              className="btn btn-link switchLink switchActive"
                            >
                              PARTICIPANTI
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <div>
                        {compSelected && (
                          <div className="row">
                            {(participants || []).map((participant, index) => {
                              return (
                                <div key={index} className="col-md-2">
                                  <div
                                    className="compPhoto"
                                    data-toggle="tooltip"
                                    data-placement="bottom"
                                    title={participant.email}
                                  >
                                    <img
                                      src={require("../../assets/profile.png")}
                                      alt="participant"
                                      className="participantPhoto"
                                      id="participantPhoto"
                                    />
                                    <h5 className="aboutParticipant">
                                      {participant.first_name}{" "}
                                      {participant.last_name}
                                      <br />
                                    </h5>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div className="row eventRow">
            <LoadingBar />
          </div>
        )}
      </div>
    );
  }
}
