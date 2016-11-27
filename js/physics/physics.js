var physics = {
    setup: function(objects) {
        $.map(planets, this.update.dispose);
        planets = objects;
        //planets.map(this.update.populate);
        $.map(planets,function(object) {
            object.object3d.material = new THREE.MeshPhongMaterial({ color: 0x1111cc, specular: 0x111111, shininess: 50 });
        });
        $.map(planets, this.update.position);
        $.map(planets, this.update.rotation);
        $.map(planets, this.update.impose);
        this.update.appearance();
    },
    update: {
        appearance: function(_) {
            var d = settings.appearance;
            grid.visible = d.gridvisible;
            grid.material.color.setStyle(d.gridcolor);
            ambientlight.color.setStyle(d.ambientcolor);
            highlight.color.setStyle(d.highlightcolor);
            renderer.setClearColor(d.backgroundcolor);
        },
        position: function(object) {
            object.object3d.position.set(
                object.position.value.x,
                object.position.value.y,
                object.position.value.z
            );
        },
        rotation: function(object) {
            object.object3d.rotation.set(
                object.rotation.value.x,
                object.rotation.value.y,
                object.rotation.value.z
            );
        },
        impose: function(object) {
            scene.add(object.object3d);
        },
        dispose: function(object) {
            scene.remove(object.object3d);
        }
    }
}
