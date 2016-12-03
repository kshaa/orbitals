var physics = {
    all: function() {
        $.map(planets, this.position);
        $.map(planets, this.rotation);
    },
    position: function(object) {
        var t = timer.time;
        var s = settings.simulation.speed;
        var p = object.position.value.clone();
        var v = object.position.velocity.clone();
        object.position.value.set(
            p.x + v.x * t * s,
            p.y + v.y * t * s,
            p.z + v.z * t * s
        );
        return object;
    },
    rotation: function(object) {
        var t = timer.time;
        var s = settings.simulation.speed;
        var r = object.rotation.value.clone();
        var v = object.rotation.velocity.clone();
        object.rotation.value.set(
            r.x + v.x * t * s,
            r.y + v.y * t * s,
            r.z + v.z * t * s
        );
    }
}
