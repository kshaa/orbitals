(function() {
    var options = {
        "simulation": {
            "gravity": 6.67 * Math.pow(10, -11),
            "speed": 1,
            "pause": true
        },
        "generation": {
            "count": 30,
            "mass": {
                "center": 13,
                "base": 6
            },
            "size": {
                "center": 0.2,
                "base": 0.1
            },
            "spread": {
                "min": 1.5,
                "max": 4
            },
            "clockwise": true,
            "randomize": true
        }
    }
    var generate = {
        "object": function(s, p, m) {
            var object = {};
            var geometry = new THREE.BoxGeometry(s, s, s);
            var material = new THREE.MeshPhongMaterial({ color: 0x555555, specular: 0x111111, shininess: 50 });
            object["object3d"] = new THREE.Mesh(geometry, material);
            var randomize = options.generation.randomize;
            object["mass"] = Math.pow(10, m) * (randomize ? Math.random() * 10 : 1);
            var clockwise = (options.generation.clockwise ? 1 : -1);
            var deg90 = new THREE.Euler(0,(clockwise*Math.PI/2),0);
            var position = p.clone();
            var velocity = p.clone();
            object["position"] = {
                "value": position,
                "velocity": velocity.applyEuler(deg90).multiply(velocity).multiplyScalar(Math.pow(10,-4))
            }
            function deg360() { return Math.PI * Math.random() * 2; }
            function deg1() { return Math.PI * Math.random() / 180; }
            object["rotation"] = {
                "value": new THREE.Euler(deg360(), deg360(), deg360()),
                "velocity": new THREE.Euler(deg1(), deg1(), deg1())
            }
            return object;
        },
        "objects": function() {
            var objects = new Array();
            // Planets
            for (i = 0; i < options.generation.count; i++) {
                var deg360 = Math.PI * Math.random() * 2;
                var rotation = new THREE.Euler(0, deg360, 0);
                var mn = options.generation.spread.min;
                var mx = options.generation.spread.max;
                var distance = mn + Math.random() * (mx - mn);
                var position = new THREE.Vector3(distance, 0, 0).applyEuler(rotation);
                var size = options.generation.size.base;
                var mass = options.generation.mass.base;
                objects[objects.length] = this.object(size, position, mass);
            }
            // Sun
            var size = options.generation.size.center;
            var mass = options.generation.mass.center;
            var position = new THREE.Vector3(0,0,0);
            objects[objects.length] = this.object(size, position, mass);
            var objectsjson = objects;
            objectsjson.map(convert.exporter.object);
            return objectsjson;
        }
    }
    return {
        "options": options.simulation,
        "objects": generate.objects()
    };
})()
