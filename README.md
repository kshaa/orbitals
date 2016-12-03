# Orbitals

Planet orbiting simulator inspired by [Spiral](https://github.com/kshaa/spiral).

# To-do list

* Simple collisions

# Data structure

Objects can be imported with a self-executing .js, or a static .json file.
Imported file must return or be structured as presented below.
To transform .js to .json you can just JSON.stringify() your object.
```
{
    options: {
          appearance: {
              gridvisible: true,
              gridcolor: "#abaaaa",
              ambientcolor: "#0000ff",
              highlightcolor: "#f0f0f0",
              backgroundcolor: "#040409",
          },
          simulation: {
              speed: 1,
              pause: false,
              gravity: 4.45 * Math.pow(10, -16)
          }
    },
    objects: [
        {
            id:       ":: Integer",
            object3d: ":: THREE.Object3d",
            mass:     ":: Float",
            position: {
                value:        ":: THREE.Vector3",
                velocity:     ":: THREE.Vector3",
                acceleration: ":: THREE.Vector3",
                force:        ":: THREE.Vector3"
            },
            rotation: {
                value:    ":: THREE.Euler",
                velocity: ":: THREE.Euler"
            }
        }
    ]
}
```
