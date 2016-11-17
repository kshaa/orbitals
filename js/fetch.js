var download = {
    remote: function(file) {
        try {
            $(function() {     
                $.ajax({
                    url:file,
                    success: function(content) {
                        check.content(file, content);
                    }
                });        
            });
        } catch (err) {
            settings.path.rollback();
            gui.reinit();
            alert("Failed to download file");
            throw new Error("Failed to download remote file: " + err);
        }
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
                console.log("Parsing the content of JSON file");
                // Parse json
                console.log(content);
                break;
            case "js":
                console.log("Parsing the content of JS file");
                // Parse js
                console.log(content);
                break;
            default:
                settings.path.rollback();
                gui.reinit();
                alert("Incorrect filetype");
                throw new Error("File must have extension of .js or .json, but it's - '" + filename + "'");
        }
    }
}
