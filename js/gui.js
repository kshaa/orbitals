var gui = {
    instance: undefined,

    structure: undefined,
    appearance: undefined,

    path: undefined,
    insource: undefined,
    outsource: undefined,
    
    gridvisible: undefined,
    gridcolor: undefined,
    ambientcolor: undefined,
    highlightcolor: undefined,
    backgroundcolor: undefined,

    gravity: undefined,
    speed: undefined,
    reload: undefined,

    init: function() {
        // Instance
        this.instance = new dat.GUI({ autoPlace: false });
        domElement = document.getElementById('gui');
        domElement.appendChild(this.instance.domElement);

        // Structure
        var closed = typeof this.structure == "undefined" ? false : this.structure.closed;
        this.structure = this.instance.addFolder("Structure");
        if (closed) {
            this.structure.close();
        } else {
            this.structure.open();
        }

        this.path = this.structure.add(settings.path.current, "key", Object.keys(settings.path.database));
        this.path.name("Configuration");
        this.path.onChange(this.helpers.check.remote);
        
        this.insource = this.structure.add(this.helpers.click, "insource"); 
        this.insource.name("Import");

        this.outsource = this.structure.add(this.helpers.click, "outsource"); 
        this.outsource.name("Export");
        
        localpath = document.getElementById('insource');
        localpath.onchange = this.helpers.check.local;

        // Appearance
        var closed = typeof this.appearance == "undefined" ? true : this.appearance.closed;
        this.appearance = this.instance.addFolder("Appearance");
        if (closed) {
            this.appearance.close();
        } else {
            this.appearance.open();
        }

        this.gridvisible = this.appearance.add(settings.appearance, "gridvisible");
        this.gridvisible.onChange(mechanics.update.appearance.gridvisible);
        this.gridvisible.name("Grid on");

        this.gridcolor = this.appearance.addColor(settings.appearance, "gridcolor");
        this.gridcolor.onChange(mechanics.update.appearance.gridcolor);
        this.gridcolor.name("Grid color");

        this.ambientcolor = this.appearance.addColor(settings.appearance, "ambientcolor");
        this.ambientcolor.onChange(mechanics.update.appearance.ambientcolor);
        this.ambientcolor.name("Ambient color");

        this.highlightcolor = this.appearance.addColor(settings.appearance, "highlightcolor");
        this.highlightcolor.onChange(mechanics.update.appearance.highlightcolor);
        this.highlightcolor.name("Highlight color");

        this.backgroundcolor = this.appearance.addColor(settings.appearance, "backgroundcolor");
        this.backgroundcolor.onChange(mechanics.update.appearance.backgroundcolor);
        this.backgroundcolor.name("Background color");


        // Simulation
        this.gravity = this.instance.add(settings.simulation, "gravity");
        this.gravity.name("Gravity");

        this.pause = this.instance.add(settings.simulation, "pause");
        this.pause.name("Pause");

        this.reload = this.instance.add(settings, "reload");
        this.reload.name("Reload");
    },
    reinit: function() {
        // Resetting input path value
        $("#insource").value = "";
        // Repopulating and refreshing gui
        $(".dg.main").remove();
        this.init();
        for (var i in this.instance.__controllers) {
            this.instance.__controllers[i].updateDisplay();
        }
    },
    helpers: {
        click: {
            insource: function() {
                $("#insource").click();
            },
            outsource: function() {
                var configuration = convert.exporter.planets();
                download.store(configuration, settings.path.exportkey);
                $("#outsource")[0].click();
            }
        },
        check: {
            local: function(evt) {
                var path = evt.target.files[0];
                settings.path.current = {
                    "key": check.filename(path.name),
                    "value": path
                };
                check.path(settings.path.current.value);
            },
            remote: function(key) {
                settings.path.current = {
                    "key": key,
                    "value": settings.path.database[key]
                };
                check.path(settings.path.current.value);
            }
        }
    }
}
