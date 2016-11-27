var settings = {
    path: {
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
