import Component from '../component';

import DB from './_DB';

// Units and Facilities
import Tank from './Tank';
import Shield from './Shield';

const TYPES_UNITS = {
    Tank,
    Shield
};

// Projectiles
import CannonShot from './CannonShot';
import HeavyCannonShot from './HeavyCannonShot';

const TYPES_PROJECTILES = {
    CannonShot,
    HeavyCannonShot
};

// Surfaces
import Ground from './Ground';

const TYPES_BODIES = {
    Ground
};

const ALL_ENTITIES = {
    ...TYPES_BODIES,
    ...TYPES_UNITS,
    ...TYPES_PROJECTILES
};

const UPDATE_ALL_ENTITIES_SEQUENCE = [
    ...Object.keys(TYPES_UNITS),
    ...Object.keys(TYPES_PROJECTILES)
];

// Manage serialization references by unique ids for every entity
let _creationId = 1;

function resetCreationId(newCreationId = 1) {
    _creationId = newCreationId;
}

function create(type, params) {
    let entity;

    // Break any refs to previous params used by other entities
    // by not reusing the params for a previous entity creation
    // even if they're passed in
    params = {...params};

    // Record creation time for serialization / deserialization
    if (!params._creationId) {
        params._creationId = _creationId++;
    }

    if (type in ALL_ENTITIES) {
        entity = new ALL_ENTITIES[type](params);
        Component.init(entity);
        DB.add(entity);
    }

    return entity;
}

function update(type: string) {
    const entitiesOfType = DB.getByType(type);
    entitiesOfType && entitiesOfType.forEach(Component.update);
}

function updateAll() {
    UPDATE_ALL_ENTITIES_SEQUENCE.forEach(update);
}

function getNearestUnits() {
    return DB.getByType('Tank');
}

export default {
    resetCreationId,
    create,
    updateAll,

    getNearestUnits,

    clearAll:  DB.clearAll,
    getAll:    DB.getAll,
    destroy:   DB.remove,
    getByType: DB.getByType,
    getById:   DB.getById
};