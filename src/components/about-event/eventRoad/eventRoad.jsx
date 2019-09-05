import React, { Component } from "react";
class Map extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this);
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options
    );
    this.props.onMapLoad(map);
  }

  componentWillReceiveProps() {
    if (!window.google) {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAINi921FLafU1ldsEL0T2nGk7sX5OL_UU`;
      var x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
      s.addEventListener("load", e => {
        this.onScriptLoad();
      });
    } else {
      this.onScriptLoad();
    }
  }

  render() {
    return <div style={{ width: "100%", height: 760 }} id={this.props.id} />;
  }
}

export default Map;
