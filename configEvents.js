const clearConfig = document.getElementById("clearConfig");
const solarConfig = document.getElementById("solarConfig");
const mousePosConfig = document.getElementById("track-mouse-button");
const mouseXField = document.getElementById("pos-x-field");
const mouseYField = document.getElementById("pos-y-field");


mousePosConfig.addEventListener('click', () => {
    trackingMouse = !trackingMouse;
    mousePosConfig.textContent = trackingMouse ? "Stop Mouse Tracking" : "Track Mouse Position";
    mousePosConfig.classList.remove( trackingMouse ? 'button-blue': 'button-red')
    mousePosConfig.classList.add( trackingMouse ? 'button-red': "button-blue");
})

clearConfig.addEventListener('click', () => {
    celestial_bodies = [];
});
solarConfig.addEventListener('click', () => {
    celestial_bodies = getSolarCelestialBodies(scale, defaultScale);
})

