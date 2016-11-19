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
    extension: function(filename) {
        regex = /([^.]+)?$/;
        return regex.exec(filename)[0].toLowerCase();
    },
    path: function(path) {
        if (path == "") {
            $("input#configuration").click();
        } else {
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
        }
    },
    content: function (filename, content) {
        switch (this.extension(filename)) {
            case "json":
            case "js":
                var success = true;
                try {
                    var generation = eval( "(" + content + ")" );
                } catch (err) {
                    success = false;
                    alert("Loaded Javascript had errors");
                    // In case any import fails or has bugs, you
                    // can eval it manually in the browser console
                    // and try finding the error by using planetsjs variable
                    planetsjs = content;
                    throw new Error(err);
                }
                if (success) {
                    planets = generation;
                    settings.path.save(filename);
                    gui.reinit();
                }
                break;
            default:
                settings.path.rollback();
                gui.reinit();
                alert("Incorrect filetype");
                throw new Error("File must have extension of .js or .json, but it's - '" + filename + "'");
        }
    }
}
