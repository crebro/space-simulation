const clearConfig = document.getElementById("clearConfig");
const solarConfig = document.getElementById("solarConfig");

clearConfig.addEventListener('click', () => {
    celestial_bodies = [];
});
solarConfig.addEventListener('click', () => {
    celestial_bodies = getSolarCelestialBodies(scale, defaultScale);
})

