// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Events = Matter.Events;

// create an engine
var engine = Engine.create();
engine.world.gravity.y = 0;
// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
});

// create two boxes and a ground
var ship = Bodies.polygon(10, 10, 3, 6);

var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });


// add all of the bodies to the world
Composite.add(engine.world, [ship, ground]);

var keys = [];
document.body.addEventListener("keydown", function (e) {
    keys[e.code] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.code] = false;
});
// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

callback = function (event) {
    var watch = {
        //angle: ship.angle,
        //anglePrev: ship.anglePrev,
        //angularSpeed: ship.angularSpeed,
        //angularVelocity: ship.angularVelocity,
        //axes: ship.axes,
        //motion: ship.motion,
        speed: ship.speed,
        velocity: ship.velocity,
        center: ship.center,
    };
    console.log(watch);
    //console.log(ship.velocity)
    let thrust = () => {

        if (keys["ArrowUp"]) {
            try {
                var forceMagnitude = 0.0002 * ship.mass;
                var force = { x: forceMagnitude * Math.cos(ship.angle), y: forceMagnitude * Math.sin(ship.angle) };

                console.log("force");
                console.log(force);
                Matter.Body.applyForce(ship, ship.position, force);
            } catch (error) {
                console.log(error);
            }
        }
    }

    let steer = () => {

        if (keys["ArrowLeft"] || keys["ArrowRight"]) {
            console.log("rotating");
            console.log(ship.angle);
            var x = keys["ArrowLeft"] ? -0.008 : 0.008;
            Matter.Body.rotate(ship, Math.PI * x, ship.position);
            console.log(ship.position);
        }
    }

    thrust();
    steer();
};
Events.on(runner, "beforeTick", callback);