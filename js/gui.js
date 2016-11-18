var gui = {
    instance: undefined,

    path: undefined,
    speed: undefined,
    pause: undefined,
    reload: undefined,

    init: function() {
        // Attaching gui to html
        this.instance = new dat.GUI({ autoPlace: false });
        domElement = document.getElementById('gui');
        domElement.appendChild(this.instance.domElement);

        // Creating buttons, sliders, options
        this.path = this.instance.add(settings.path, "current", settings.path.list);
        this.path.name("Configuration");
        this.path.onChange(check.path);
        pathinput = document.getElementById('configuration');
        pathinput.onchange = this.handleSelection;

        this.speed = this.instance.add(settings.speed, "value", settings.speed.min, settings.speed.max);
        this.speed.name("Speed");

        this.pause = this.instance.add(settings, "pause");
        this.pause.name("Pause");

        this.reload = this.instance.add(settings, "reload");
        this.reload.name("Reload");
    },
    reinit: function() {
        // Repopulating and refreshing gui
        $(".dg.main").remove();
        this.init();
        for (var i in this.instance.__controllers) {
            this.instance.__controllers[i].updateDisplay();
        }
    },
    handleSelection: function(evt) {
        var path = evt.target.files[0];
        settings.path.current = path;
        check.path(path);
    }
}
