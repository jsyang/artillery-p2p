import Graphics from '../Graphics';

const byId   = {};
const byType = {};

function add(entity) {
    const {type, _creationId} = entity;

    byId[_creationId] = entity;

    if (byType[type]) {
        byType[type].push(entity);
    } else {
        byType[type] = [entity];
    }

    Graphics.addChild(entity.geo.graphics);
}

const getByType = (type: string): Array<any> => byType[type] || [];
const getById   = (id: string): any => byId[id];

function remove(entity) {
    entity.hp = 0;

    delete byId[entity._creationId];

    // Break reference to shield holder
    if (entity.anchor) {
        entity.anchor.shield = null;
        delete entity.anchor;
    }

    delete entity.shield;
    const byTypeCollection = getByType(entity.type);
    const byTypeIndex      = byTypeCollection.indexOf(entity);

    if (byTypeIndex !== -1) {
        byTypeCollection.splice(byTypeIndex, 1);
    }

    Graphics.removeChild(entity.geo.graphics);
}

function getAll() {
    let allEntities = [];

    // [].push is fastest
    Object.keys(byType).forEach(entityType => Array.prototype.push.apply(allEntities, byType[entityType]));

    return allEntities;
}

function clearAll() {
    getAll().forEach(remove);

    Object.keys(byType)
        .forEach(type => delete byType[type]);
}

export default {
    add,
    remove,
    getAll,
    clearAll,
    getByType,
    getById
};
