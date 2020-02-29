const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoibmFkaXgiLCJhIjoiY2s3N3U2aXplMDRwZDNsbXBndGk4Njd1ayJ9.CWn_TL7WfBKa9Znp13XrIw';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/nadix/ck77udd9n1nf91ilmyjmt0f91',
  scrollZoom: false
  // center: [],
  // zoom: 8
  // interactive
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100
  }
});
