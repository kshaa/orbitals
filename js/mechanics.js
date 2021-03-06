var mechanics = {
    setup: function(options, objects) {
        settings.setup(options);
        $.map(planets, this.update.render.dispose);
        planets = $.map(objects, preset.populate);
        this.update.appearance.all();
        this.update.physics.all();
        this.update.render.all();
        $.map(planets, this.update.render.color);
    },
    update: {
        physics: physics,
        appearance: {
            all: function() {
                var d = settings.appearance;
                this.gridvisible(d.gridvisible);
                this.gridcolor(d.gridcolor);
                this.ambientcolor(d.ambientcolor);
                this.highlightcolor(d.highlightcolor);
                this.backgroundcolor(d.backgroundcolor);
            },
            gridvisible: function(v) { grid.visible = v; },
            gridcolor: function(v) { grid.material.color.setStyle(v); },
            ambientcolor: function(v) { ambientlight.color.setStyle(v); },
            highlightcolor: function(v) { 
                highlight1.color.setStyle(v);
                highlight2.color.setStyle(v);
                highlight3.color.setStyle(v);
            },
            backgroundcolor: function(v) { renderer.setClearColor(v); }
        },
        render: {
            all: function() {
                $.map(planets, this.position);
                $.map(planets, this.rotation);
                $.map(planets, this.impose);
            },
            color: function(object) {
                object.object3d.traverse(function(child) {
                    if ( child instanceof THREE.Mesh) {
                        child.material.color = object.color;
                    }
                })
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
}
