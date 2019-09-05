function CenterControl(controlDiv, map) {
  var dragomirna = { lat: 47.75868, lng: 26.225964 };
  var opt = { zoom: 12 };

  var controlUI = document.createElement("div");
  controlUI.style.backgroundColor = "#fff";
  controlUI.style.border = "4px solid rgb(12, 134, 235)";
  controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlUI.style.cursor = "pointer";
  controlUI.style.marginBottom = "22px";
  controlUI.style.textAlign = "center";
  controlUI.style.marginRight = "22px";
  controlUI.style.padding = "12px";
  controlUI.style.borderRadius = "35px";
  controlUI.title = "Click to recenter the map";
  controlDiv.appendChild(controlUI);

  var secondChild = document.createElement("div");
  secondChild.style.margin = "5px";
  secondChild.style.width = "18px";
  secondChild.style.height = "18px";
  secondChild.style.backgroundImage =
    "url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)";
  secondChild.style.backgroundSize = "180px 18px";
  secondChild.style.backgroundPosition = "0px 0px";
  secondChild.style.backgroundRepeat = "no-repeat";
  controlUI.appendChild(secondChild);

  controlUI.addEventListener("click", function() {
    map.setCenter(dragomirna);
    animateMapZoomTo(map, 10);
  });
}

function setIconLong(map, name) {
  var icon = new google.maps.MarkerImage(
    "http://chart.googleapis.com/chart?chst=d_bubble_text_small&chld=bb|" +
      name +
      "|00DDEB|000000",
    null,
    null,
    new google.maps.Point(0, 42)
  );
  return icon;
}

function setIconShort(map, name) {
  var icon = new google.maps.MarkerImage(
    "http://chart.googleapis.com/chart?chst=d_bubble_text_small&chld=bb|" +
      name +
      "|E6B928|000000",
    null,
    null,
    new google.maps.Point(0, 40)
  );
  return icon;
}

function animateMapZoomTo(map, targetZoom) {
  var currentZoom = arguments[2] || map.getZoom();
  if (currentZoom != targetZoom) {
    google.maps.event.addListenerOnce(map, "zoom_changed", function(event) {
      animateMapZoomTo(
        map,
        targetZoom,
        currentZoom + (targetZoom > currentZoom ? 1 : -1)
      );
    });
    setTimeout(function() {
      map.setZoom(currentZoom);
    }, 150);
  }
}
