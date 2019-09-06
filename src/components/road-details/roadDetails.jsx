import React, { Component } from "react";
import { Polyline, Marker, withGoogleMap, GoogleMap } from "react-google-maps";
import "./roadDetails.css";
import Map from "../map";
import ParticipantRanking from "./participant-ranking/participantRanking";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";

const colors = ["red", "blue", "green"];
// const socket = new WebSocket("wss://ws.achex.ca/");

const socket = new WebSocket(
  (window.location.protocol === "https:" ? "wss://" : "ws://") +
    "mtb.assist.ro/" +
    6 +
    "/"
);

export default class roadDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roadOpened: true,
      trailsToShow: null,
      gpx: [],
      selectedTrails: {},
      markers: [],
      // markers: {},

      latitude: null,
      longitude: null,
      message: {},
      array: []
    };
  }

  componentDidMount() {
    const competitionId = this.props.match.params.competitionId;
    this.props.requestRank(competitionId);
    this.props.requestTrail(competitionId);

    socket.onopen = function(e) {
      console.log("Sending to server");
      console.log("[open] Connection established");
      socket.send("Test");
      console.log("Sending to server");
    };
    socket.onmessage = event => {
      // console.log("Message", event);
      const data = JSON.parse(event.data);
      console.log("Got message: " + event.data);
      const { markers } = this.state;
      let id = data.id.toString();
      let lat = data.latitude;
      let lng = data.longitude;
      console.log(id, lat, lng, "nouuu");
      // this.setState({ message: data });
      // this.setState({ longitude: data.longitude, latitude: data.latitude });
      // this.setState({ markers: { ...markers, id: { lat, lng } } });
      console.log("markeeer", this.state.markers);

      // const array = [];
      const obj = { lat: data.latitude, lng: data.longitude };

      // array.push(obj);

      this.setState(previousState => ({
        markers: [...previousState.markers, data]
      }));

      // this.setState({ markers: array }, () => {
      //   console.log("markers-push", this.state.markers);
      // });
      // let id = data.id.toString();
      // console.log("id", id);

      // let newArray = this.state.array.push({ obj });
      // this.setState({ markers: newArray });
      // console.log(this.state.markers, "tttt");

      // this.setState({
      //   markers: [...this.state.markers, obj]
      // });

      // this.setState({ markers: [data.latitude, data.longitude] });
    };

    socket.onclose = function(event) {
      if (event.wasClean) {
        alert(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        alert("[close] Connection died");
      }
    };

    socket.onerror = function(error) {
      alert(`[error] ${error.message}`);
    };
  }

  componentWillUnmount() {
    socket.close();
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
  // setIconLong(map, name) {
  //   var icon = new google.maps.MarkerImage(
  //     "http://chart.googleapis.com/chart?chst=d_bubble_text_small&chld=bb|" +
  //       name +
  //       "|00DDEB|000000",
  //     null,
  //     null,
  //     new google.maps.Point(0, 42)
  //   );
  //   return icon;
  // }
  render() {
    const { gpxData } = this.props;
    const { roadOpened, markers } = this.state;
    let ranking = [];
    let trails = [];

    if (this.props.rank.count > 0) {
      ranking = this.props.rank.results;
    }

    if (this.props.trail.count > 0) {
      trails = this.props.trail.results["0"].trails;
    }
    console.log("message", this.state.message);

    // debugger;

    console.log("state", this.state.latitude, ">>", this.state.longitude);
    console.log("state", this.state.markers);
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
        //   if (this.state.gpx) {
        //     longTrail.loadGeoJson(
        //       "https://cors-anywhere.herokuapp.com/" + this.state.gpx
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
            <div>
              <Polyline
                path={[...gpxData[key]]}
                key={key}
                options={{
                  strokeColor: colors[index],
                  center: { lat: 47.760419, lng: 26.225507 }
                }}
              />
              {markers.map((el, key) => (
                // {Object.keys(markers).map(key => (
                <Marker
                  key={el.id}
                  // position={el}
                  // position={markers[key]}
                  options={{
                    icon:
                      "http://chart.googleapis.com/chart?chst=d_bubble_text_small&chld=bb|" +
                      el.first_name +
                      " " +
                      el.last_name +
                      "|00DDEB|000000",
                    // null, null, new google.maps.Point(0, 42)),

                    anchor: new window.google.maps.Point(0, 42)
                  }}
                  position={{
                    lat: parseFloat(el.latitude),
                    lng: parseFloat(el.longitude)
                  }}
                  title={el.last_name + " " + el.first_name}
                />
              ))}
            </div>
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
