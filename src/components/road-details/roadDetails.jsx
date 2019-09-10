import React, { Component } from "react";
import { Polyline, Marker, withGoogleMap, GoogleMap } from "react-google-maps";
import "./roadDetails.css";
import Map from "../map";
import ParticipantRanking from "./participant-ranking/participantRanking";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

// const colors = ["yellow", "blue"];
// const socket = new WebSocket("wss://ws.achex.ca/");

// const socket = new WebSocket(
//   (window.location.protocol === "https:" ? "wss://" : "ws://") +
//     "mtb.assist.ro/" +
//     8 +
//     "/"
// );

export default class roadDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roadOpened: true,
      trailsToShow: null,
      gpx: [],
      selectedTrails: {},
      tempSearch: "",
      searchValue: "",
      filterValue: "",
      // trails: [],
      // markers: [
      //   {
      //     lat: 47.760419,
      //     lng: 26.225507,
      //     id: 1,
      //     type_trail: "lg",
      //     first_name: "Leahu",
      //     last_name: "Ion"
      //   },
      //   {
      //     lat: 47.770419,
      //     lng: 26.225507,
      //     id: 2,
      //     type_trail: "cr",
      //     first_name: "Leahu",
      //     last_name: "Andrei"
      //   },
      //   {
      //     lat: 47.780419,
      //     lng: 26.225507,
      //     id: 3,
      //     type_trail: "mr",
      //     first_name: "Leahu",
      //     last_name: "Alex"
      //   }
      // ],
      markers: {},

      latitude: null,
      longitude: null,
      message: {},
      array: [],
      filtered: {},
      strtColor: "red",
      color: ""
    };
  }

  componentDidMount() {
    const competitionId = this.props.match.params.competitionId;
    this.props.requestRank(competitionId);
    this.props.requestTrail(competitionId);
    const socket = new WebSocket(
      (window.location.protocol === "https:" ? "wss://" : "ws://") +
        "mtb.assist.ro/" +
        competitionId +
        "/"
    );

    socket.onopen = function(e) {
      console.log("Sending to server");
      console.log("[open] Connection established");
      socket.send("Test");
      console.log("Sending to server");
    };
    socket.onmessage = event => {
      // console.log("Message", event);

      const {
        latitude: lat,
        longitude: lng,
        first_name,
        last_name,
        id,
        type_trail
      } = JSON.parse(event.data);
      console.log("Got message: " + event.data);

      const { markers } = this.state;
      const tempObj = { ...markers };
      tempObj[id] = { id, lat, lng, first_name, last_name, type_trail };
      this.setState({ markers: tempObj });

      // const obj = { lat, lng, id, first_name, last_name, type_trail };
      // this.setState(({ markers }) => ({
      //   markers: [...markers, obj]
      // }));
    };

    socket.onclose = function(event) {
      if (event.wasClean) {
        console.log(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        console.log("[close] Connection died");
      }
    };

    socket.onerror = function(error) {
      console.log(`[error] ${error.message}`);
    };
  }

  async componentDidUpdate({ isLoading }) {
    const { isLoading: currIsLoading } = this.props;
    if (isLoading !== currIsLoading && isLoading) {
      const { selectedTrails } = this.state;
      const {
        trail: { results = [] }
      } = this.props;

      const tempSelectedTrails = { ...selectedTrails };

      results.forEach(res => {
        res.trails.forEach(trail => {
          const { GPX, id, type_trail } = trail;
          const { getTrailGPXRequest } = this.props;
          tempSelectedTrails[id] = { id, type_trail };

          getTrailGPXRequest({ url: GPX, id });
        });
      });
      this.setState({ selectedTrails: tempSelectedTrails });
    }
  }

  // componentWillUnmount() {
  //   this.socket.close();
  // }

  trailSelected(trail) {
    const { GPX, id, type_trail } = trail;
    this.setState({ filterValue: type_trail });
    const { selectedTrails } = this.state;
    const tempSelectedTrails = { ...selectedTrails };
    if (selectedTrails[id]) {
      const { removeTrailGPXRequest } = this.props;

      delete tempSelectedTrails[id];

      removeTrailGPXRequest(id);
    } else {
      tempSelectedTrails[id] = { id, type_trail };
      const { getTrailGPXRequest } = this.props;
      getTrailGPXRequest({ url: GPX, id });
    }
    this.setState({ selectedTrails: tempSelectedTrails });

    // if (type_trail === "sh") {
    //   let color = "red";
    //   this.setState({ color: color });
    // } else {
    //   let color = "blue";
    //   this.setState({ color: color });
    // }
  }

  rankOpen = () => {
    this.setState({ roadOpened: false });
  };

  roadOpen = () => {
    this.setState({ roadOpened: true });
  };

  getUserIcon = ({ type_trail, first_name, last_name }) => {
    let color = "00DDEB";

    if (type_trail === "sh") {
      color = "ffea00";
    } else if (type_trail === "mr") {
      color = "b71c1c";
    }
    const baseUrl =
      "http://chart.googleapis.com/chart?chst=d_bubble_text_small&chld=bb|";
    // return `${baseUrl}${first_name} ${last_name}|${color}|000000`;
    return `${baseUrl}${first_name.charAt(0) +
      "."} ${last_name}|${color}|000000`;
  };
  getStrokeColor = ({ type_trail }) => {
    let color = "#00DDEB";

    if (type_trail === "sh") {
      color = "#ffd600";
    } else if (type_trail === "mr") {
      color = "#b71c1c";
    }
    return color;
    // return `${color}`;
  };
  getAnchor = ({ type_trail }) => {
    let anchor = new window.google.maps.Point(0, 40);
    if (type_trail === "sh") {
      anchor = new window.google.maps.Point(0, 42);
    }
    return anchor;
  };

  handleSearch = ({ target: { value } }) => {
    this.setState(
      // { tempSearch: value },
      // value === "" ? this.search : undefined
      { searchValue: value }
    );
  };

  search = () => {
    const { tempSearch = "" } = this.state;
    this.setState({ searchValue: tempSearch });
    // socket.send(JSON.stringify({ search: searchValue }));
  };
  handleKeyDown = e => {
    if (e.key === "Enter") {
      console.log("do validate");
      this.search();
    }
  };

  render() {
    const { gpxData, isLoading } = this.props;
    const {
      roadOpened,
      markers,
      searchValue,
      filterValue,
      selectedTrails
    } = this.state;
    let ranking = [];
    let trails = [];

    if (this.props.rank.count > 0) {
      ranking = this.props.rank.results;
    }

    if (this.props.trail.count > 0) {
      trails = this.props.trail.results["0"].trails;
    }
    console.log(this.state.selectedTrails, "selectedT");
    console.log(Object.keys(this.state.markers), "markers");

    return (
      <div>
        <Map>
          {Object.keys(gpxData).map((key, index) => {
            const trail = trails.find(tr => tr.id === +key) || {};
            // console.log("trails", trails, key);
            // console.log("trail", trail);
            const strokeColor = this.getStrokeColor(trail);
            // const { type_trail } = data;
            return (
              <div key={key}>
                <Polyline
                  path={[...gpxData[key]]}
                  zoom={15}
                  options={{
                    strokeColor: strokeColor,
                    center: { lat: 47.760419, lng: 26.225507 },
                    strokeWeight: 8
                  }}
                />
                {/* {// markers ||
              (
                markers.filter(
                  marker => marker.type_trail.indexOf(filterValue) !== -1
                ) || []
              ).map(el => { */}
                {Object.keys(markers)
                  .reduce((curr, next) => {
                    const { type_trail: type } = markers[next];
                    // const { selectedTrails } = this.state;
                    // if (
                    //   selectedTrails.some(({ type_trail }) => type_trail === type)
                    // ) {
                    //   curr.push(markers[next]);
                    // }
                    // return curr;
                    const containsTrail = Object.keys(selectedTrails).some(
                      key => selectedTrails[key].type_trail === type
                    );
                    if (containsTrail) {
                      curr.push(markers[next]);
                    }
                    return curr;
                  }, [])
                  .map(data => {
                    const icon = this.getUserIcon(data);
                    const anchor = this.getAnchor(data);

                    const {
                      id,
                      lat,
                      lng,
                      type_trail,
                      last_name,
                      first_name
                    } = data;

                    const containsValue =
                      last_name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                      first_name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase());

                    if (containsValue) {
                      return (
                        <Marker
                          key={id}
                          // defaultAnimation={
                          //   this.props.google.maps.Animation.BOUNCE
                          // }
                          options={{
                            icon,
                            // anchor: new window.google.maps.Point(0, 42)
                            anchor
                          }}
                          position={{
                            lat: parseFloat(lat),
                            lng: parseFloat(lng)
                          }}
                          title={last_name + " " + first_name}
                          // style={{
                          //   transform: `translate3D(0,0,0) scale(2, 3)`
                          // }}
                        />
                      );
                    }
                    return null;
                  })}
              </div>
            );
          })}
        </Map>

        <div className="row">
          <div className="col-md-5">
            <div className="card-body row no-gutters align-items-center">
              <div className="col-auto">
                <button
                  className="btn btn-lg searchButton"
                  type="submit"
                  onClick={this.search}
                >
                  <FontAwesomeIcon icon={faSearch} color="#ffffff" />
                </button>
              </div>

              <div className="col">
                <input
                  onChange={this.handleSearch}
                  className="form-control form-control-lg form-control-borderless"
                  type="text"
                  placeholder="Search participants"
                  onKeyDown={this.handleKeyDown}
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
                    {isLoading ? (
                      <div className="d-flex align-items-center justify-content-center">
                        {" "}
                        Loading ....{" "}
                      </div>
                    ) : (
                      <div className="row mt-4">
                        <div className="col-md-3">
                          <h3 className="selectRoad">Select a road</h3>
                        </div>
                        {(trails || []).map((trail, index) => {
                          const strokeColor = this.getStrokeColor(trail);
                          return (
                            <div key={index} className="col-md-2">
                              <div className="row trailRow">
                                <h3
                                  className="roadType "
                                  style={{ color: strokeColor }}
                                >
                                  {trail.trail_name}
                                </h3>{" "}
                                <Form.Check
                                  className="mb-3 ml-2"
                                  aria-label={trail.trail_name}
                                  name="trail"
                                  checked={selectedTrails[trail.id]}
                                  value={trail.id}
                                  onChange={() => this.trailSelected(trail)}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
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
