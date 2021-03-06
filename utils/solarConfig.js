function getSolarCelestialBodies(scale, defaultSclae) {
    const scaleFactor = scale / defaultScale;

    sun = new Planet(1.989e30, "#ffff00", 0, 0, 25 * scaleFactor, "Sun");
    // another sun planet config, for (chaos)
    // anotherSun = new Planet(1.989e31, [255, 255, 0], 10 * au, 0, 25 * scaleFactor, "Another Sun");

    earth = new Planet(5.972e24, "#6495ed", -au, 0, 8 * scaleFactor, "Earth" );
    earth.yVelocity = 29.783 * 1000;

    mars = new Planet( 6.39 * 10**23, "#bc2732", -1.524 * au, 0, 6 * scaleFactor, "Mars" );
    mars.yVelocity = 25.077 * 1000

    mercury = new Planet( 3.30 * 10**23, "#504e51" , -0.387 * au, 0, 4 * scaleFactor, "Mercury" )
    mercury.yVelocity = 47.4 * 1000

    venus = new Planet(  4.8685 * 10**24, "#ffffff", -0.723 * au, 0, 7 * scaleFactor, "Venus" )
    venus.yVelocity = 35.02 * 1000;

    jupiter = new Planet( 1.898 *10^27, "#c2ad9d", -5.2 * au, 0, 15 * scaleFactor, "Jupiter" );
    jupiter.yVelocity = 13 * 1000; 

    saturn = new Planet( 5.683e26, "#544e74", -9.5 * au, 0, 15 * scaleFactor, "Saturn" );
    saturn.yVelocity = 10 * 1000; 

    celestial_bodies = [ sun, mercury, venus, earth, mars, jupiter, saturn];
    return celestial_bodies;
}