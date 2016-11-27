var convert = {
    importer: {
        object: function(objectJson) {
            var o = objectJson;
            function imp(val, con) {
                if (typeof val !== "undefined") {
                    return con(val);
                } else {
                    return undefined;
                }
            }
            o.object3d = imp(o.object3d, convert.importer.object3d);
            o.position.value = imp(o.position.value, convert.importer.vector3d);
            o.position.velocity = imp(o.position.velocity, convert.importer.vector3d);
            o.position.acceleration = imp(o.position.acceleration, convert.importer.vector3d);
            o.position.force = imp(o.position.force, convert.importer.vector3d);
            o.rotation.value = imp(o.rotation.value, convert.importer.euler3d);
            o.rotation.velocity = imp(o.rotation.velocity, convert.importer.euler3d);
            return o;
        },
        object3d: function(obj3dJson) {
            var loader = new THREE.OBJLoader();
            return loader.parse(obj3dJson);
        },
        vector3d: function(vec3dJson) {
            var x = vec3dJson.x;
            var y = vec3dJson.y;
            var z = vec3dJson.z;
            return new THREE.Vector3(x, y, z);
        },
        euler3d: function(eul3dJson) {
            var x = eul3dJson.x;
            var y = eul3dJson.y;
            var z = eul3dJson.z;
            return new THREE.Euler(x, y, z);
        }
    },
    exporter: {
        planets: function() {
            // Fetching objects
            var objects = $.extend(true, {}, planets);
            $.map(objects, function(object) {
                object.object3d.position.set(0,0,0);
                object.object3d.rotation.set(0,0,0);
            });
            scene.updateMatrixWorld();
            $.map(objects, convert.exporter.object);
            // Fetching options
            var options = settings.simulation;
            // Resetting original objects
            planets.map(physics.update.position);
            planets.map(physics.update.rotation);
            scene.updateMatrixWorld();
            // Exporting configuration
            return JSON.stringify({
                "objects": objects,
                "options": options
            });
        },
        object: function(object) {
            var j = object;
            function exp(val, con) {
                if (typeof val !== "undefined") {
                    return con(val);
                } else {
                    return undefined;
                }
            }
            j.object3d = exp(j.object3d, convert.exporter.object3d);
            j.position.value = exp(j.position.value, convert.exporter.vector3d);
            j.position.velocity = exp(j.position.velocity, convert.exporter.vector3d);
            j.position.acceleration = exp(j.position.acceleration, convert.exporter.vector3d);
            j.position.force = exp(j.position.force, convert.exporter.vector3d);
            j.rotation.value = exp(j.rotation.value, convert.exporter.euler3d);
            j.rotation.velocity = exp(j.rotation.velocity, convert.exporter.euler3d);
            return j;
        },
        object3d: function(obj3d) {
            var exporter = new THREE.OBJExporter;
            var obj = exporter.parse(obj3d);
            return obj;
        },
        vector3d: function(vector3) {
            var x = vector3.x;
            var y = vector3.y;
            var z = vector3.z;
            return {
                "x": x,
                "y": y,
                "z": z
            };
        },
        euler3d: function(euler3) {
            var x = euler3.x;
            var y = euler3.y;
            var z = euler3.z;
            return {
                "x": x,
                "y": y,
                "z": z
            };
        }
    }
}
