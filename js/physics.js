var physics = {
    all: function() {
        $.map(planets, this.force);
        $.map(planets, this.acceleration);
        $.map(planets, this.force);
        $.map(planets, this.velocity);
        $.map(planets, this.position);
        $.map(planets, this.rotation);
    },
    position: function(object) {
        var t = 1 / 60;
        var p = object.position.value.clone();
        var v = object.position.velocity.clone();
        object.position.value.set(
            p.x + v.x * t,
            p.y + v.y * t,
            p.z + v.z * t
        );
        return object;
    },
    velocity: function(object) {
        var a = object.position.acceleration;
        var v = object.position.velocity;
        object.position.velocity.set(
            v.x + a.x,
            v.y + a.y,
            v.z + a.z
        );
    },
    rotation: function(object) {
        var t = 1 / 60;
        var r = object.rotation.value.clone();
        var v = object.rotation.velocity.clone();
        object.rotation.value.set(
            r.x + v.x * t,
            r.y + v.y * t,
            r.z + v.z * t
        );
        return object;
    },
    force: function(object1) {
        object1.position.force.set(0,0,0);
        var g = settings.simulation.gravity;
        for (n = 0; n < planets.length; n++) {
            var object2 = planets[n];
            if (object1.id != object2.id) {
                var m1 = object1.mass;
                var m2 = object2.mass;
                var p1 = object1.position.value.clone();
                var p2 = object2.position.value.clone();
                var rv = p2.sub(p1);
                var rs = rv.length();
                var fs = (m1 * m2 * g) / Math.pow(rs, 2);
                var fv = rv.clone().setLength(fs);
                a = object1.position.force;
                b = fv;
                object1.position.force.add(fv);
            }
        }
        return object1;
    },
    acceleration: function(object) {
        object.position.acceleration = object.position.force.clone().divideScalar(object.mass);
    }
}
