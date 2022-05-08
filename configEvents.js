const clearConfig = document.getElementById("clearConfig");
const solarConfig = document.getElementById("solarConfig");
const mousePosConfig = document.getElementById("track-mouse-button");
const xField = document.getElementById("pos-x-field");
const yField = document.getElementById("pos-y-field");
const copySunConfig = document.getElementById('copy-sun-config');
const createCelestialBody = document.getElementById('create-celestial-body');

const nameField = document.getElementById('celestial-name');
const massVal = document.getElementById('celestial-mass');
const massMult = document.getElementById('celestial-mass-mult');
const colorField = document.getElementById('celestial-color');
const sidewaysVel = document.getElementById('celestial-vel');
const sidewaysVelMult = document.getElementById('celestial-vel-mult');
const diameterField = document.getElementById('celestial-diameter');


mousePosConfig.addEventListener('click', () => {
    trackingMouse = !trackingMouse;
    if (!trackingMouse) {
        xField.value = ( - windowWidth / 2 + lastMousePosition.x ) * (1/scale) / au;
        yField.value = ( - windowHeight / 2 + lastMousePosition.y) * (1/scale) / au ;
    }

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


copySunConfig.addEventListener('click', () => {
    nameField.value = "Another Sun";
    massVal.value = 1.989;
    massMult.value = 30;
    colorField.value = "#ffff00";
    diameterField.value = 25 * ( scale * ( 1 / defaultScale) );
})

createCelestialBody.addEventListener('click', () => {
    let planet = new Planet( parseFloat( massVal.value ) * 10 ^ parseFloat( massMult.value ), colorField.value, parseInt( xField.value ) * au, parseInt(yField.value) * au, parseFloat(diameterField.value), nameField.value );
    planet.yVelocity = sidewaysVel.value * ( 10 ^ sidewaysVelMult.value );
    console.log(planet.yVelocity);
    celestial_bodies.push(planet);
})

