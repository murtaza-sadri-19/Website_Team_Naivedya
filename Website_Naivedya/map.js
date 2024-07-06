import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
    import {
      getDatabase,
      ref,
      onValue,
      set,
      update,
      remove
    } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

    const firebaseConfig = {
      apiKey: "AIzaSyCa5yuGge1oIr6WMJ7C6ovsNU74ydYagrw",
      authDomain: "gps-tifan.firebaseapp.com",
      databaseURL: "https://gps-tifan-default-rtdb.firebaseio.com",
      projectId: "gps-tifan",
      storageBucket: "gps-tifan.appspot.com",
      messagingSenderId: "86663269298",
      appId: "1:86663269298:web:115b28d97a6f75a9a332ab",
      measurementId: "G-Z871QR5TP3",
    };

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    let map;
    let pathCoordinates = [];
    let path;
    let marker;

    function initMap() {
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: { lat: 0, lng: 0 },
      });

      path = new google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: "#00FF00",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      path.setMap(map);

      marker = new google.maps.Marker({
        position: { lat: 22.7, lng: 13.7 },
        map: map,
      });

      // Retrieve the stored track coordinates when the page loads
      const pathRef = ref(database, "TrackCoordinates");
      onValue(
        pathRef,
        (snapshot) => {
          const storedPath = snapshot.val();
          if (storedPath) {
            pathCoordinates = storedPath;
            path.setPath(pathCoordinates);
            if (pathCoordinates.length > 0) {
              map.setCenter(pathCoordinates[pathCoordinates.length - 1]);
              marker.setPosition(pathCoordinates[pathCoordinates.length - 1]);
            }
          }
        },
        (error) => {
          console.error("Error reading stored path from Firebase:", error);
        }
      );

      // Listen for new location updates
      const locationRef = ref(database, "Sensor");
      onValue(
        locationRef,
        (snapshot) => {
          const data = snapshot.val();
          console.log("Firebase data:", data);
          if (data && data.Latitude && data.Longitude) {
            const latLng = { lat: data.Latitude, lng: data.Longitude };
            map.setCenter(latLng);
            pathCoordinates.push(latLng);
            path.setPath(pathCoordinates);
            marker.setPosition(latLng);
            calculateArea(pathCoordinates);

            // Store the path coordinates in Firebase
            set(pathRef, pathCoordinates);
          } else {
            console.error("Invalid data format in Firebase:", data);
          }
        },
        (error) => {
          console.error("Error reading from Firebase:", error);
        }
      );
    }

    function calculateArea(coords) {
      let area = 0;
      const len = coords.length;
      for (let i = 0; i < len; i++) {
        const j = (i + 1) % len;
        area += coords[i].lng * coords[j].lat;
        area -= coords[j].lng * coords[i].lat;
      }
      area = Math.abs(area) / 2;

      // Convert area from square degrees to square kilometers
      const squareKmPerSquareDegree = 111.32 * 111.32;
      const areaInSquareKm = area * squareKmPerSquareDegree;

      // Convert area from square kilometers to hectares
      const areaInHectares = areaInSquareKm * 100;

      // Display the calculated area in hectares
      document.getElementById("area").textContent = "Area covered:  " + areaInHectares.toFixed(2) + " hectares";

      console.log("Area covered :", areaInHectares, "hectares");
    }

    function updateCoordinates() {
      const locationRef = ref(database, "Sensor");

      const latLng = { lat: data.Latitude, lng: data.Longitude };
      const delta = 0.000009;

      setInterval(() => {
        lat += delta;
        lng += delta;
        update(locationRef, { Latitude: lat, Longitude: lng });
      }, 1000);
    }

    function restartTrack() {
      const pathRef = ref(database, "TrackCoordinates");
      remove(pathRef)
        .then(() => {
          pathCoordinates = [];
          path.setPath(pathCoordinates);
          document.getElementById("area").textContent = "Calculated area: 0 hectares";
          console.log("Track coordinates have been reset.");
        })
        .catch((error) => {
          console.error("Error resetting track coordinates:", error);
        });
    }

    document.getElementById("restart").addEventListener("click", restartTrack);

    window.onload = () => {
      initMap();
      updateCoordinates();
    };