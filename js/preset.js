var preset =  {
    populate: function(o) {
        o.object3d              = o.object3d                || preset.object3d();
        o.mass                  = o.mass                    || preset.mass();
        o.position              = o.position                || {};
        o.position.value        = o.position.value          || preset.vector3d();
        o.position.velocity     = o.position.velocity       || preset.vector3d();
        o.position.acceleration = o.position.acceleration   || preset.vector3d();
        o.position.force        = o.position.force          || preset.vector3d();
        o.rotation              = o.rotation                || {};
        o.rotation.value        = o.rotation.value          || preset.euler3d();
        o.rotation.velocity     = o.rotation.velocity       || preset.euler3d();
        return o;
    },
    object3d: function() {
        var s = 0.1;
        geometry = new THREE.BoxGeometry(s, s, s);
        material = new THREE.MeshPhongMaterial({ color: 0x555555, specular: 0x111111, shininess: 50 });
        object3d = new THREE.Mesh(geometry, material);
        return object3d;
    },
    vector3d: function() {
        return new THREE.Euler(0, 0, 0);
    },
    euler3d: function() {
        return new THREE.Vector3(0, 0, 0);
    },
    mass: function() {
        return Math.pow(10, 6);
    }
}
