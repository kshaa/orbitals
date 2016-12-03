var mechanics = {
    setup: function(options, objects) {
        $.map(planets, this.update.dispose);
        planets = $.map(objects, preset.populate);
        this.update.structure.all();
        this.update.appearance.all();
    },
    update: {
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
            highlightcolor: function(v) { highlight.color.setStyle(v); },
            backgroundcolor: function(v) { renderer.setClearColor(v); }
        },
        structure: {
            all: function() {
                $.map(planets, this.position);
                $.map(planets, this.rotation);
                $.map(planets, this.impose);
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
