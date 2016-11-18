# Orbitals

Planet orbiting simulator inspired by [Spiral](https://github.com/kshaa/spiral).

# Known bugs

* Cancelling file selection on custom preset import doesn't trigger preset rollback
    * Preset rollback/preset loading is triggered by an input onchange event, but the input element doesn't change.
* Selecting previously imported preset doesn't work
    * It's properly saved as a File object in path list, but on selection transforms to a string
    * Probably a bug in dat.gui, where it can't set objects as property values.
