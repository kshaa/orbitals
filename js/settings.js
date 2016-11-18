var settings = {
    path: {
        current: "js/examples/onesun.json",
        previous: "js/examples/onesun.json",
        list: {
            "Random solar system": "js/examples/onesun.js",
            "Stable solar system": "js/examples/onesun.json",
            "Custom": ""
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
    speed: {
        value: 1,
        min: 0,
        max: 5
    },
    pause: true,
    reload: function() {
        check.path(this.path.current);
    },
    outsource: function() {
        // Export 'planets' json;
        // Save it locally;
    }
}
