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
    }
}
