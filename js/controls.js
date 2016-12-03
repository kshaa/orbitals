var controls = {
    check: function(e) {
        switch(e.keyCode) {
            case 82: // r
                settings.reload();
                break;
            case 32: // spacebar
                settings.simulation.pause = !settings.simulation.pause;
                break;
            case 84: // t
                var m = $(".dg.main");
                var o = m.css("opacity");
                m.css("opacity", (o == 1 ? 0 : 1));
                break;
        }
    } 
}
