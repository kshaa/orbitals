# Orbitals

Planet orbiting simulator inspired by [Spiral](https://github.com/kshaa/spiral).

# To-do list

#### Important
* Import/export decoding/encoding
    * Don't make dat.gui load objects by having two path arrays - keys and file objects
* Physics
    * Velocity
    * Gravity
    * Collisions
#### Less important
* Appearance subfolder in gui
* Find out how to make camera smoother

# Known bugs
* Selecting previously imported preset doesn't work
    * It's properly saved as a File object in path list, but on selection transforms to a string
    * Probably a bug in dat.gui, where it can't set objects as property values.
