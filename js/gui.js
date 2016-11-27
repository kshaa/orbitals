var gui = {
    instance: undefined,

    structure: undefined,
    appearance: undefined,

    path: undefined,
    insource: undefined,
    outsource: undefined,
    path: undefined,
    gravity: undefined,
    speed: undefined,
    pause: undefined,
    reload: undefined,

    init: function() {
        // Instance
        this.instance = new dat.GUI({ autoPlace: false });
        domElement = document.getElementById('gui');
        domElement.appendChild(this.instance.domElement);

        // Folders
        this.structure = this.instance.addFolder("Structure");
        this.structure.open();

        // Values, functions
        this.path = this.structure.add(settings.path, "current", settings.path.list);
        this.path.name("Configuration");
        this.path.onChange(check.path);
        
        this.insource = this.structure.add(this.helpers.click, "insource"); 
        this.insource.name("Import");

        this.outsource = this.structure.add(this.helpers.click, "outsource"); 
        this.outsource.name("Export");
        
        localpath = document.getElementById('insource');
        localpath.onchange = this.helpers.checklocal;

        this.gravity = this.instance.add(settings.simulation, "gravity", 0, Math.pow(10, -9));
        this.gravity.name("Gravity");

        this.speed = this.instance.add(settings.simulation, "speed", 0, 5);
        this.speed.name("Speed");

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
                exportconfig();
                $("#outsource")[0].click();
            }
        },
        checklocal: function(evt) {
            var path = evt.target.files[0];
            settings.path.current = path;
            check.path(path);
        }
    }
}
