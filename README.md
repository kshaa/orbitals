# Orbitals

Planet orbiting simulator inspired by [Spiral](https://github.com/kshaa/spiral).

# Features

* Three.js webgl library for rendering
* N-body gravitational pull simulation
* Import / export / store scene, appearance and settings
* Import formats:
    1. JS file with self invoking funtion, generating a unique data structure for scene
    2. JSON file with a static data structure for scene 
* Sample solar structure generation
* Bulk structure - speed / acceleration / velocity - manipulation

# Data structure

```
{
    options: {
          appearance: {
              gridvisible       :: Boolean,
              gridcolor         :: THREE.Color,
              ambientcolor      :: THREE.Color,
              highlightcolor    :: THREE.Color,
              backgroundcolor   :: THREE.Color,
          },
          simulation: {
              pause     :: Boolean,
              gravity   :: Float 
          }
    },
    objects: [
        {
            id          :: Integer,
            object3d    :: THREE.Object3d,
            color       :: THREE.Color,
            mass        :: Float,
            position: {
                value           :: THREE.Vector3,
                velocity        :: THREE.Vector3,
                acceleration    :: THREE.Vector3,
                force           :: THREE.Vector3
            },
            rotation: {
                value       :: THREE.Euler,
                velocity    :: THREE.Euler
            }
        }
    ]
}
```

# Notes

This code is ancient and not good.  

Usage:
```
nvm use
npm install
npm run start
```
