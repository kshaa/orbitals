var settings = {
    path: {
        current: "js/examples/onesun.json",
        previous: "js/examples/onesun.json",
        list: {
            "Random solar system": "js/examples/onesun.js",
            "Stable solar system": "js/examples/onesun.json"
        },
        rollback: function() {
            this.current = this.previous;
        },
        save: function(filename) {
            var unique = true;
            for (var path in this.list) {
                if (this.list[path] == this.current) {
                    unique = false;
                }
            }
            if (unique) {
                this.list[filename] = this.current;
            }
            this.current = this.current;
            this.previous = this.current;
        }
    },
    simulation: {
        speed: 1,
        pause: true,
        gravity: 6.67 * Math.pow(10, -11)
    },
    reload: function() {
        check.path(this.path.current);
    },
    setup: function(options) {
        for(var key in options) {
            settings.simulation[key] = options[key];
        }
    }
}
