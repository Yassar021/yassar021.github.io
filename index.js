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
})();