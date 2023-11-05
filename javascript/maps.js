let map;
let geocoder;
let circle;
let rectangle;
let polygon;
let directionsService;
let directionsRenderer;
// Initialize and add the map
function initMap() {
  geocoder = new google.maps.Geocoder(); // 1. Function to place a marker on the map
  directionsService = new google.maps.DirectionsService(); //2. Function to get the path of origin to destination
  directionsRenderer = new google.maps.DirectionsRenderer(); //2. Function to get the path of origin to destination
  const coordinates = {
    lat: 37.422040,
    lng: -122.082810
  };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: coordinates,
  });
  directionsRenderer.setMap(map);
  
}
// 1. Function to place a marker on the map
function getCoordinates() {
  let address = document.getElementById('address').value;
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if(status == 'OK') {
      
      map.setCenter(results[0].geometry.location);
      let marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
      // put the values for the circle
      document.getElementById('cirLat').value = results[0].geometry.location.lat();
      document.getElementById('cirLong').value = results[0].geometry.location.lng();
    } else {
      alert('Sorry, an error occurred: ' + status);
    }
  });
}
//2. Function to get the path of origin to destination
function calcRoute() {
  let start = document.getElementById('origin').value;
  let end = document.getElementById('destination').value;
  if (start == "" || end == ""){
    alert('Please enter a valid number for Origin and Destination ');
  }
  else {
    let request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
      if(status == 'OK') {
        directionsRenderer.setDirections(result);
      } else {
        alert('Sorry, an error occurred: ' + status);
      }
    });
  }
}
//3. Function to Create circle
function createCircle() {
	
  const cirLat = parseFloat(document.getElementById('cirLat').value);
  const cirLong = parseFloat(document.getElementById('cirLong').value);
  const cirRadius = parseFloat(document.getElementById('cirRadius').value);

  console.log(isNaN(cirLat));
  if(isNaN(cirLat) || isNaN(cirLong) || isNaN(cirRadius)){
    alert('Please enter a valid number for Latitude, Longitude and Radius ');

  }
  else {
    const cirCoor = {
      lat: cirLat,
      lng: cirLong
    };
   
    /* Delete the old circle */
    if (circle && circle.setMap) 
      circle.setMap(null);
      
    circle = new google.maps.Circle({
      strokeColor: "blue",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FFF",
      fillOpacity: 0.5,
      map: map,
      center: cirCoor,
      radius: cirRadius,
    });
    
    // put the values for the rectangle
    document.getElementById('north').value = cirLat - 0.007;
    document.getElementById('south').value = cirLat + 0.007;
    document.getElementById('east').value = cirLong + 0.01;
    document.getElementById('west').value = cirLong - 0.01;
  }
}
//4. Function to place a rectangle on the map
function createRectangle() {
  const north = parseFloat(document.getElementById('north').value);
  const south = parseFloat(document.getElementById('south').value);
  const east = parseFloat(document.getElementById('east').value);
  const west = parseFloat(document.getElementById('west').value);
  
  if(isNaN(north) || isNaN(south) || isNaN(east) || isNaN(west)){
    alert('Please enter a valid number for North, South, East and West');
  }
  else {
    /* Delete the old rectangle */
    if (rectangle && rectangle.setMap) 
    rectangle.setMap(null);

    rectangle = new google.maps.Rectangle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      bounds: {
        north: north,
        south: south,
        east: east,
        west: west,
      },
    });

    // put the values for the Polygon
    document.getElementById('txtLat1').value = north - 0.001;
    document.getElementById('txtLat2').value = south + 0.0061;
    document.getElementById('txtLat3').value = south - 0.01;
    document.getElementById('txtLat4').value = north - 0.001;
    document.getElementById('txtLng1').value = east + 0.01;
    document.getElementById('txtLng2').value = west ;
    document.getElementById('txtLng3').value = west - 0.01;
    document.getElementById('txtLng4').value = east + 0.01;
  }
}

//5. function to place a polygon on the map
function createPolygon(){
	const lat1 = parseFloat(document.getElementById('txtLat1').value);
	const lat2 = parseFloat(document.getElementById('txtLat2').value);
	const lat3 = parseFloat(document.getElementById('txtLat3').value);
	const lat4 = parseFloat(document.getElementById('txtLat4').value);
	const lng1 = parseFloat(document.getElementById('txtLng1').value);
	const lng2 = parseFloat(document.getElementById('txtLng2').value);
	const lng3 = parseFloat(document.getElementById('txtLng3').value);
	const lng4 = parseFloat(document.getElementById('txtLng4').value);

  if(isNaN(lat1) || isNaN(lat2) || isNaN(lat3) || isNaN(lat4) || 
     isNaN(lng1) || isNaN(lng2) || isNaN(lng3) || isNaN(lng4))
  {
    alert('Please enter a valid number for Latitude and Longitude');
  }
  else {
    const triangleCoords = [
      { lat: lat1, lng: lng1 },
      { lat: lat2, lng: lng2 },
      { lat: lat3, lng: lng3 },
      { lat: lat4, lng: lng4 },
    ];
  
    /* Delete the old polygon */
    if (polygon && polygon.setMap) 
      polygon.setMap(null);
  
    polygon = new google.maps.Polygon({
      paths: triangleCoords,
      strokeColor: "#ffd700",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#ffd700",
      fillOpacity: 0.35,
      map: map
    });

  }
	
	
}