(function() {
    var options = {
        "simulation": {
            "gravity": 4.45 * Math.pow(10, -16)
        },
        "appearance": {
            gridvisible: true,
            gridcolor: "#abaaaa",
            ambientcolor: "#0000ff",
            highlightcolor: "#f0f0f0",
            backgroundcolor: "#040409"
        },
        "generation": {
            "count": 200,
            "mass": {
                "center": 13,
                "base": 6
            },
            "size": {
                "center": 0.2,
                "base": 0.1
            },
            "spread": {
                "min": 0.7,
                "max": 1.0
            },
            "clockwise": true,
            "randomize": true
        }
    }
    var generate = {
        "object": function(s, p, m, b, c) {
            var object = {};
            var geometry = new THREE.BoxGeometry(s, s, s);
            if (b) {
                var col = new THREE.Color("hsl(" + c + ", 100%, 40%)");
            } else {
                var col = new THREE.Color("hsl(" + c + ", 100%, 65%)");
            }
            var material = new THREE.MeshPhongMaterial({ color: col, specular: 0x111111, shininess: 50 });
            object["object3d"] = new THREE.Mesh(geometry, material);
            var randomize = options.generation.randomize;
            object["mass"] = Math.pow(10, m) * (randomize ? Math.random() * 0.4 + 0.8 : 1);
            var clockwise = (options.generation.clockwise ? 1 : -1);
            var deg90 = new THREE.Euler(0,(clockwise*Math.PI/2),0);
            var position = p.clone();
            var velocityv = p.clone();
            var velocitys = position.length() / 2;
            object["position"] = {
                "value": position,
                "velocity": velocityv.applyEuler(deg90).setLength(velocitys),
                "force": new THREE.Vector3(),
                "acceleration": new THREE.Vector3()
            }
            function deg(n) { return Math.PI * Math.random() / 180 * n; }
            object["rotation"] = {
                "value": new THREE.Euler(deg(360), deg(360), deg(360)),
                "velocity": new THREE.Euler(deg(60), deg(60), deg(60))
            }
            return object;
        },
        "solar": function() {
            var objects = new Array();
            var color = Math.round(Math.random() * 360);
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
                var center = false;
                objects[objects.length] = this.object(size, position, mass, center, color);
            }
            // Sun
            var size = options.generation.size.center;
            var mass = options.generation.mass.center;
            var position = new THREE.Vector3(0,0,0);
            var center = true;
            objects[objects.length] = this.object(size, position, mass, center, color);

            return objects
        },
        "objects": function() {
            var p1 = new THREE.Vector3(0,0,0);
            var r1 = new THREE.Euler(0.3, 0.2, 0);
            var b1 = new THREE.Vector3(0,0,0);
            var sol = $.map(this.solar(), function(o) {
                var moved = manipulate.move(p1, o);
                var rotated = manipulate.rotate(r1, moved);
                var boosted = manipulate.boost(b1, rotated);
                return boosted;
            });

            // Exporting
            var objectsjson = sol;
            objectsjson.map(convert.exporter.object);
            return objectsjson;
        }
    }
    return {
        "options": options,
        "objects": generate.objects()
    };
})()
