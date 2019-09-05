import React, { Component } from "react";
import { Polyline } from "react-google-maps";

import "./roadDetails.css";
import Map from "../map";
import ParticipantRanking from "./participant-ranking/participantRanking";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";

const colors = ["red", "blue", "green"];

export default class roadDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roadOpened: true,
      trailsToShow: null,
      gpx: [],
      selectedTrails: {}
    };
  }

  componentDidMount() {
    const competitionId = this.props.match.params.competitionId;
    this.props.requestRank(competitionId);
    this.props.requestTrail(competitionId);
  }

  trailSelected(trail) {
    const { GPX, id } = trail;
    console.log("GPX", GPX);
    const { selectedTrails } = this.state;
    const tempSelectedTrails = { ...selectedTrails };
    if (selectedTrails[id]) {
      const { removeTrailGPXRequest } = this.props;

      delete tempSelectedTrails[id];

      removeTrailGPXRequest(id);
    } else {
      tempSelectedTrails[id] = id;
      const { getTrailGPXRequest } = this.props;
      getTrailGPXRequest({ url: GPX, id });
    }
    this.setState({ selectedTrails: tempSelectedTrails });
    // var checks = document.getElementsByName("trail");
    // const selectedTrail = [];
    // for (var i = 0; i < checks.length; i++) {
    //   if (checks[i].type === "checkbox" && checks[i].checked === true) {
    //     selectedTrail.push(checks[i].value);
    //     this.setState({ gpx });
    //     this.setState({ trailsToShow: selectedTrail });
    //   }
    // }
  }

  rankOpen = () => {
    this.setState({ roadOpened: false });
  };

  roadOpen = () => {
    this.setState({ roadOpened: true });
  };

  render() {
    // if (!this.state.gpx) return null;
    const { gpxData } = this.props;
    const { roadOpened } = this.state;
    let ranking = [];
    let trails = [];

    if (this.props.rank.count > 0) {
      ranking = this.props.rank.results;
    }

    if (this.props.trail.count > 0) {
      trails = this.props.trail.results["0"].trails;
    }

    console.log("gpx", gpxData);
    console.log("kkk", this.state.gpx);
    console.log("trails", this.state.selectedTrails);
    // console.log("aaa", trails);

    return (
      <div>
        <Map
        // id="map"
        // options={{
        //   center: { lat: 47.760419, lng: 26.225507 },
        //   // center: { lat: 26.22678, lng: 47.75705 },
        //   zoom: 12
        // }}
        // onMapLoad={map => {
        //   var longTrail = new window.google.maps.Data();
        //   if (gpx) {
        //     longTrail.loadGeoJson(
        //       "https://cors-anywhere.herokuapp.com/" + gpx
        //     );
        //   }
        //   //  longTrail.loadGeoJson("https://cors-anywhere.herokuapp.com/" + gpx);

        //   longTrail.setStyle(function(feature) {
        //     return {
        //       strokeColor: "rgb(0, 221, 236)",
        //       strokeWeight: 8
        //     };
        //   });

        //   longTrail.setMap(map);

        //   let ws = new WebSocket(
        //     (window.location.protocol === "https:" ? "wss://" : "ws://") +
        //       "mtb.assist.ro/" +
        //       3 +
        //       "/"
        //   );
        //   console.log("test", ws);
        //   ws.onmessage = function(message) {
        //     // var data = JSON.parse(message.data);
        //     console.log("Got message: " + message.data);
        //     console.log(new Date());
        //   };
        // }}
        >
          {Object.keys(gpxData).map((key, index) => (
            <Polyline
              path={[...gpxData[key]]}
              key={key}
              options={{
                strokeColor: colors[index],
                center: { lat: 47.760419, lng: 26.225507 }
              }}
            />
          ))}
        </Map>

        <div className="row">
          <div className="col-md-5">
            <div className="card-body row no-gutters align-items-center">
              <div className="col-auto">
                <button className="btn btn-lg searchButton" type="submit">
                  <FontAwesomeIcon icon={faSearch} color="#ffffff" />
                </button>
              </div>

              <div className="col">
                <input
                  className="form-control form-control-lg form-control-borderless"
                  type="search"
                  placeholder="Search participants"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="tabsRow mb-5">
            <div className="row">
              <div className="col-md-6 switchButton">
                <button
                  onClick={this.roadOpen}
                  type="button"
                  className={
                    "btn btn-link switchLink " +
                    (roadOpened ? "switchActive" : "")
                  }
                >
                  ROADS
                </button>
              </div>
              <div className="col-md-6 switchButton ">
                <button
                  onClick={this.rankOpen}
                  type="button"
                  className={
                    "btn btn-link switchLink " +
                    (!roadOpened ? "switchActive" : "")
                  }
                >
                  RANKING
                </button>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-12 text-center">
                {!roadOpened ? (
                  <div className="row">
                    {ranking.map((rank, index) => {
                      return <ParticipantRanking key={index} rank={rank} />;
                    })}
                  </div>
                ) : (
                  <div>
                    <div className="row mt-4">
                      <div className="col-md-3">
                        <h3 className="selectRoad">Select a road</h3>
                      </div>
                      {(trails || []).map((trail, index) => {
                        return (
                          <div key={index} className="col-md-2">
                            <div className="row trailRow">
                              <h3 className="roadType ">{trail.trail_name}</h3>{" "}
                              <Form.Check
                                className="mb-3 ml-2"
                                aria-label={trail.trail_name}
                                name="trail"
                                value={trail.id}
                                onChange={() => this.trailSelected(trail)}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
