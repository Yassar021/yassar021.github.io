import { createSelectElement } from "./js/Dropdown.js";

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MDI4NjExYi1kMmEyLTQwMTAtYTlmYS1iNWQ5YzFjODkyNzAiLCJpZCI6MjI2ODA4LCJpYXQiOjE3MzQwOTQ4NDh9.93xKIs14kL27HpM_ckxZYA4LTUjwsaNNzZX2cu5ftnQ";

// Fly the camera to a location based on Cesium Ion Asset ID.
export async function flyToAssetID(viewer, assetID, terrainAssetID) {
  try {
    // Load the terrain for the specified assetID if provided
    if (terrainAssetID) {
      viewer.terrainProvider =
        await Cesium.CesiumTerrainProvider.fromIonAssetId(terrainAssetID);
      viewer.scene.globe.depthTestAgainstTerrain = true;
    } else {
      viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider(); // Default to no terrain
    }

    // Remove all previous tilesets
    viewer.scene.primitives.removeAll();

    // Load the Cesium Ion Asset using the provided assetID
    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(assetID);

    // Add the tileset to the viewer's scene
    viewer.scene.primitives.add(tileset);

    // Zoom to the tileset
    await viewer.zoomTo(tileset);

    // Apply the default style if it exists
    const extras = tileset.asset.extras;
    if (
      Cesium.defined(extras) &&
      Cesium.defined(extras.ion) &&
      Cesium.defined(extras.ion.defaultStyle)
    ) {
      tileset.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
    }

    // Return the tileset for further use
    return tileset;
  } catch (error) {
    console.error("Error in flyToAssetID:", error);
  }
}

(async function () {
  // Define locations with asset IDs and terrain IDs
  const locations = {
    0: { cityName: "3D", assetID: 2923425 },
    1: { cityName: "2D", assetID: 2921922 }, // GeoJSON asset
    2: { cityName: "Raster", assetID: 2, terrainAssetID: 2650644 },
  };

  // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
  const defaultLocation = locations[0];
  const viewer = new Cesium.Viewer("cesiumContainer", {
    terrainProvider: defaultLocation.terrainAssetID
      ? await Cesium.CesiumTerrainProvider.fromIonAssetId(
          defaultLocation.terrainAssetID
        )
      : new Cesium.EllipsoidTerrainProvider(),
  });

  viewer.scene.globe.depthTestAgainstTerrain = true;

  // Add Cesium OSM Buildings, a global 3D buildings layer.
  const buildingTileset = await Cesium.createOsmBuildingsAsync();
  viewer.scene.primitives.add(buildingTileset);

  // Create options for the dropdown
  const options = Object.keys(locations).map((key) => ({
    value: key,
    textContent: locations[key].cityName,
  }));

  // Create the dropdown menu
  const dropdown = createSelectElement(options, "toolbar");

  // Fly to the first location by default
  const defaultTileset = await flyToAssetID(
    viewer,
    defaultLocation.assetID,
    defaultLocation.terrainAssetID
  );

  // Add event listener for dropdown changes
  if (dropdown) {
    dropdown.addEventListener("change", async (event) => {
      const selectedIndex = event.target.value;
      const selectedLocation = locations[selectedIndex];
      if (selectedLocation) {
        if (selectedLocation.assetID === 2921922) {
          // GeoJSON asset
          try {
            console.log(
              "Attempting to load GeoJSON for asset ID:",
              selectedLocation.assetID
            );

            // Load GeoJSON using GeoJsonDataSource
            const geoJsonDataSource = await Cesium.GeoJsonDataSource.load(
              await Cesium.IonResource.fromAssetId(selectedLocation.assetID),
              {
                clampToGround: true, // Optional: Clamp features to ground if needed
              }
            );

            // Add the GeoJSON data source to the viewer
            viewer.dataSources.removeAll(); // Remove previous data sources if necessary
            viewer.dataSources.add(geoJsonDataSource);

            console.log(
              "GeoJSON loaded successfully for asset ID:",
              selectedLocation.assetID
            );

            // Optionally, zoom to the newly added GeoJSON data
            viewer.flyTo(geoJsonDataSource);
          } catch (error) {
            console.error("Error loading GeoJSON from Ion Asset:", error, {
              assetID: selectedLocation.assetID,
            });
          }
        } else {
          // Load 3D tileset as usual
          await flyToAssetID(
            viewer,
            selectedLocation.assetID,
            selectedLocation.terrainAssetID
          );
        }
      } else {
        console.error("Invalid location selected.");
      }
    });
  }

  // Tambahkan tileset dari Cesium Ion
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2923425);
  viewer.scene.primitives.add(tileset);

  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

  handler.setInputAction((movement) => {
    // Menggunakan pick untuk memilih satu fitur pada posisi klik
    const pickedFeature = viewer.scene.pick(movement.position);

    if (Cesium.defined(pickedFeature)) {
      console.log("Picked feature:", pickedFeature);

      // Cek jika pickedFeature adalah fitur yang valid dari 3D Tiles
      if (pickedFeature instanceof Cesium.Cesium3DTileFeature) {
        const availableProperties = pickedFeature.getPropertyNames
          ? pickedFeature.getPropertyNames()
          : [];
        console.log("Available Properties:", availableProperties);

        const name = pickedFeature.getProperty("name") || "Unknown Name";
        const fungsi = pickedFeature.getProperty("fungsi") || "Unknown Fungsi";
        const description =
          pickedFeature.getProperty("description") ||
          "No Description Available";

        // Dapatkan posisi geografis
        const cartesian = viewer.scene.pickPosition(movement.position);
        if (Cesium.defined(cartesian)) {
          const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          const longitude = Cesium.Math.toDegrees(
            cartographic.longitude
          ).toFixed(6);
          const latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(
            6
          );

          // Menampilkan informasi di infobox
          viewer.selectedEntity = new Cesium.Entity({
            name: "Building Description",
            description: `
                            <table class="cesium-infoBox-defaultTable">
                                <tbody>
                                    <tr><th>Nama Bangunan</th><td>${name}</td></tr>
                                    <tr><th>Fungsi</th><td>${fungsi}</td></tr>
                                    <tr><th>Description</th><td>${description}</td></tr>
                                    <tr><th>Longitude</th><td>${longitude}</td></tr>
                                    <tr><th>Latitude</th><td>${latitude}</td></tr>
                                </tbody>
                            </table>
                        `,
          });
        }
      } else {
        console.log("Picked feature is not a valid 3D Tile feature.");
      }
    } else {
      console.log("No feature picked.");
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);


  
// Memuat GeoJSON asset setelah viewer siap
const assetId = 2921922; // Ganti dengan assetId GeoJSON Anda
try {
  const geoJsonDataSource = await Cesium.GeoJsonDataSource.load(
    await Cesium.IonResource.fromAssetId(assetId)
  );
  viewer.dataSources.add(geoJsonDataSource);
  
  console.log("GeoJSON data loaded:", geoJsonDataSource);

  // Panggil setupGeoJsonSearch setelah GeoJSON terload
  setupGeoJsonSearch(viewer, geoJsonDataSource);
} catch (error) {
  console.error("Failed to load GeoJSON:", error);
}

// Setup pencarian GeoJSON berdasarkan No_Kuision
function setupGeoJsonSearch(viewer, geoJsonDataSource) {
  const searchBox = document.getElementById("searchBox");

  if (!searchBox) {
    console.error("Search box element not found!");
    return;
  }

  // Tambahkan event listener untuk input search
  searchBox.addEventListener("input", () => {
    const query = searchBox.value.trim();
    if (!query || isNaN(query)) return; // Pastikan input adalah angka

    const features = geoJsonDataSource.entities.values;

    // Reset gaya visual default untuk semua fitur sebelum mencari
    features.forEach((entity) => {
      if (entity.polygon) {
        // Reset warna polygon ke default jika tidak dicari
        entity.polygon.material = Cesium.Color.YELLOW.withAlpha(0.7); // Default kuning
        entity.polygon.outlineColor = Cesium.Color.GRAY; // Default outline
      }
    });

    // Cari fitur yang sesuai dengan No_Kuision
    const matchedFeature = features.find((entity) => {
      const noKuision = entity.properties.No_Kuision
        ? entity.properties.No_Kuision.getValue()?.toString()
        : "";
        
      // Debug log untuk melihat nilai dari query dan properti entity
      console.log(`Searching for: ${query}`);
      console.log(`Comparing with No_Kuision: ${noKuision}`);

      // Cocokkan berdasarkan No_Kuision
      return noKuision === query;
    });

    if (matchedFeature) {
      console.log(`Feature with No_Kuision ${query} matched.`);

      if (matchedFeature.polygon) {
        // Highlight fitur yang cocok dengan warna merah
        matchedFeature.polygon.material = Cesium.Color.RED.withAlpha(0.7); // Highlight merah
        matchedFeature.polygon.outlineColor = Cesium.Color.RED; // Outline merah

        // Menghitung pusat geometri secara manual dari polygon
        const positions = matchedFeature.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
        const boundingSphere = Cesium.BoundingSphere.fromPoints(positions);
        
        // Log untuk mengecek apakah bounding sphere berhasil
        console.log('BoundingSphere:', boundingSphere);

        // Arahkan kamera ke boundingSphere fitur
        viewer.camera.flyToBoundingSphere(boundingSphere, {
          duration: 2.0, // Durasi zoom-in
          offset: new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere.radius * 2.0), // Menambahkan offset
        });

        // Menampilkan infobox untuk entitas yang cocok
        viewer.selectedEntity = matchedFeature;
      }
    } else {
      alert("No matching feature found for No_Kuision.");
      console.log("No matching feature found.");
    }
  });
}


  
})();


