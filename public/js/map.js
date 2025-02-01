mapboxgl.accessToken = mapToken;

  const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });

  
    const marker = new mapboxgl.Marker({ color: "red"}) //Marker is used to mark a particular location on the map
    // a new marker will be created at the coordinates of the location of the listing
        .setLngLat(listing.geometry.coordinates) // coordinates of the marker
        .setPopup(
          new mapboxgl.Popup({ offset: 25}) // add popups
        .setHTML(`<h4>${listing.title}</h4><p>Exact location will be provided after booking</p>`
        )
        )
        .addTo(map);

      