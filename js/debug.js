var tracer = {
    data: {
        pause: true,
        forces: new Array(),
        velocities: new Array()
    },
    enable: function() {
        this.data.pause = false;
    },
    disable: function() {
        this.data.pause = true;
        for (i = 0; i < tracer.data.forces.length; i++) {
            scene.remove(tracer.data.forces[i]);
        }
        for (i = 0; i < tracer.data.velocities.length; i++) {
            scene.remove(tracer.data.velocities[i]);
        }
    },
    render: {
        all: function() {
            this.forces();
            this.velocities();
        },
        forces: function() {
            for (i = 0; i < tracer.data.forces.length; i++) {
                scene.remove(tracer.data.forces[i]);
            }
            $.map(planets, function(o, n) {
                forces = new Array();
                var origin = o.position.value;
                var direction = o.position.force;
                var arrow = new THREE.ArrowHelper(direction, origin, 0.3, 0xdd3344);
                tracer.data.forces[n] = arrow;
                scene.add(arrow);
            })
        },
        velocities: function() {
            for (i = 0; i < tracer.data.velocities.length; i++) {
                scene.remove(tracer.data.velocities[i]);
            }
            $.map(planets, function(o, n) {
                forces = new Array();
                var origin = o.position.value;
                var direction = o.position.velocity;
                var arrow = new THREE.ArrowHelper(direction, origin, 0.3, 0x4433dd);
                tracer.data.velocities[n] = arrow;
                scene.add(arrow);
            })
        }
    }
}
