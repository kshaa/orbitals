var settings = {
    path: {
        exportkey: "Orbitals.json",
        current: {
            key: "Random solar system",
            value: "js/examples/onesun.js"
        },
        previous: this.current,
        database: {
            "Random solar system": "js/examples/onesun.js", 
            "Stable solar system": "js/examples/onesun.json"
        },
        rollback: function() {
            this.current = this.previous;
        },
        save: function() {
            var unique = true;
            for (var key in this.database) {
                if (this.database[key] == this.current.value) {
                    unique = false;
                }
            }
            if (unique) {
                var key = this.current.key;
                var value = this.current.value;
                this.database[key] = value;
            }
            this.current = this.current;
            this.previous = this.current;
        }
    },
    appearance: {
        gridvisible: true,
        gridcolor: "#abaaaa",
        ambientcolor: "#0000ff",
        highlightcolor: "#f0f0f0",
        backgroundcolor: "#040409",
    },
    simulation: {
        speed: 1,
        pause: true,
        gravity: 4.45 * Math.pow(10, -16) 
    },
    reload: function() {
        check.path(this.path.current.value);
    },
    setup: function(options) {
        for(var key in options.appearance) {
            settings.appearance[key] = options.appearance[key];
        }
        for(var key in options.simulation) {
            settings.simulation[key] = options.simulation[key];
        }
    }
}
