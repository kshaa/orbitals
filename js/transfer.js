function exportconfig() {
    // Fetching objects
    var objects = $.extend(true, {}, planets);
    $.map(objects, function(object) {
        object.object3d.position.set(0,0,0);
        object.object3d.rotation.set(0,0,0);
    });
    scene.updateMatrixWorld();
    $.map(objects, convert.exporter.object);
    textualobject = objects[0].object3d;
    // Fetching options
    var options = settings.simulation;
    // Exporting configuration
    var json = JSON.stringify({
        "objects": objects,
        "options": options
    });
    blob = new Blob([json], {type: "octet/stream"}),
    url = window.URL.createObjectURL(blob);
    $("#outsource").attr('href', url); 
    $("#outsource").attr('download', "orbitals.json"); 
    // Resetting objects
    planets.map(physics.update.position);
    planets.map(physics.update.rotation);
    scene.updateMatrixWorld();
}

var download = {
    remote: function(file) {
        $(function() {     
            $.ajax({
                url: file,
                dataType: "text",
                success: function(data, state, settings) {
                    check.content(file, data);
                },
                error: function(request, options, error) {
                    settings.path.rollback();
                    gui.reinit();
                    alert("Failed to download file");
                }
            });        
        });
    },
    local: function(file) {
        try {
            var reader = new FileReader();
            reader.onload = function(e) {
                check.content(file["name"], e.target.result);
            };
            reader.readAsText(file);
        } catch (err) {
            settings.path.rollback();
            gui.reinit();
            alert("Failed to download file");
            throw new Error("Failed to download local file: " + err);
        }
    }
}

var check = {
    extension: function(path) {
        regex = /([^.]+)?$/;
        return regex.exec(path)[0].toLowerCase();
    },
    filename: function(path) {
        regex = /^((.+)\/)?([^\/]+)$/;
        return regex.exec(path)[3];
    },
    path: function(path) {
        try {
            switch (typeof(path)) {
                case "string":
                    download.remote(path);
                    break;
                case "object":
                    download.local(path);
                    break;
                default:
                    throw new Error("No file selected.");
            }
        } catch (err) {
            settings.path.rollback();
            gui.reinit();
            console.log("", err.message);
        }
    },
    content: function (filename, content) {
        var success = true;
        function error(err, popup) {
            success = false;
            settings.path.rollback();
            gui.reinit();
            alert(popup);
            throw new Error(err);
        } 
        // Globalize import for debugging
        importedjs = content;
        switch (this.extension(filename)) {
            case "json":
            case "js":
                try {
                    var imported = eval( "(" + content + ")" );
                    var objects = $.map(imported.objects, convert.importer.object);
                    var options = imported.options;
                } catch (err) {
                    error(err, "Loaded Javascript had errors");
                }
                if (success) {
                    try {
                        settings.setup(options);
                        physics.setup(objects);
                    } catch (err) {
                        error(err, "Loaded Javascript had errors");
                    }
                }
                if (success) {
                    settings.path.save();
                    gui.reinit();
                }
                break;
            default:
                error(
                    "Incorrect filetype",
                    "File must have extension of .js or .json, but it's - '" + filename + "'"
                );
        }
    }
}
