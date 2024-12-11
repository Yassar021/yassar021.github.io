// Grant CesiumJS access to your ion assets
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZGFiY2E0Yy01YmM5LTQ0ZjYtYjRhZS01ODYzNDUwNGJjZDAiLCJpZCI6MjI2NDg3LCJpYXQiOjE3MjAxMjE1ODJ9.5Jw86ZWo24lC7R8TNiGQxS7bYwfMzZrBLGnIwOpCy1s";

const viewer = new Cesium.Viewer("cesiumContainer", {
  terrainProvider: await Cesium.CesiumTerrainProvider.fromIonAssetId(
    2650631,
  ),
});
viewer.scene.globe.depthTestAgainstTerrain = true;

try {
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2650601);
  viewer.scene.primitives.add(tileset);
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
} catch (error) {
  console.log(error);
}