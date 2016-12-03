var manipulate = {
    move: function(vector, object) {
        object.position.value.add(vector);
        return object;
    },
    boost: function(vector, object) {
        object.position.velocity.add(vector);
        return object;
    },
    rotate: function(euler, object) {
        object.position.value.applyEuler(euler);
        object.position.velocity.applyEuler(euler);
        object.position.acceleration.applyEuler(euler);
        object.position.force.applyEuler(euler);
        object.rotation.value.set(
            object.rotation.value.x + euler.x,
            object.rotation.value.y + euler.y,
            object.rotation.value.z + euler.z
        );
        object.rotation.velocity.set(
            object.rotation.velocity.x + euler.x,
            object.rotation.velocity.y + euler.y,
            object.rotation.velocity.z + euler.z
        );
        return object;
    }
}
