import Entity from "../Entity";
import getEntityProperties, {PROPERTY_IS_REFERENCE} from './getEntityProperties';
import TeamSystem from '../GameScreen/TeamSystem';
import GameScreenControl from '../GameScreen/control';
import Score from "../Score";

export enum StorageGameState {
    Scores           = 'score',
    Entities         = 'entities',
    ControlledEntity = 'controlledEntity'
}

export function serialize(): string {
    return JSON.stringify(
        Entity.getAll().map(getEntityProperties),
        null, 2
    );
}

function inflateReferencesForEntity(entity, index, allEntities) {
    Object.keys(entity)
        .forEach(prop => {
            const value = entity[prop];

            if (PROPERTY_IS_REFERENCE.test(prop) && !isNaN(value)) {
                entity[prop] = allEntities.find(e => e._creationId === value);
            }
        });
}

export function deserialize(json: string): void {
    const all         = JSON.parse(json);
    let maxCreationId = 0;

    Entity.clearAll();

    // First pass, create all the entities, leaving references as numbers
    all.forEach(e => {
        Entity.create(e.type, e);

        if (maxCreationId < e._creationId) {
            maxCreationId = e._creationId;
        }
    });

    // Avoid potential creationId duplicates
    Entity.resetCreationId(maxCreationId + 10);

    // Second pass, inflate references
    Entity.getAll().forEach(inflateReferencesForEntity);
    TeamSystem.init();
}

// Network specific

export enum GameInfo {
    Entities = 'entities',
    Score    = 'score',
}

export function serializeForNetwork(gameInfo: GameInfo = GameInfo.Entities) {
    let outgoingData;

    switch (gameInfo) {
        case GameInfo.Entities:
            outgoingData = [
                ...Entity.getByType('Tank'),
                ...Entity.getByType('CannonShot'),
                ...Entity.getByType('HeavyCannonShot')
            ].map(getEntityProperties);
            break;

        case GameInfo.Score:
            outgoingData = Score.getScore();
            break;
    }

    return JSON.stringify(outgoingData);
}

export function deserializeFromNetwork(json: string) {
    const all = JSON.parse(json);

    if (Array.isArray(all)) {
        // Receiving entity updates
        const controlledEntity = GameScreenControl.getControlledEntity();

        let entityNet;
        let entityLocal;
        for (let i = all.length - 1; i >= 0; i--) {
            entityNet   = all[i];
            entityLocal = Entity.getById(entityNet._creationId);

            // 2 main cases:

            // 1. create entity if doesn't exist
            // 2. update the entity or not


            if (entityLocal) {
                // Do not let network state overwrite local state for team's controlled entity
                if (controlledEntity === entityLocal) {
                    continue;
                }

                // Do nothing for shots that are already created
                if (entityLocal.type === 'HeavyCannonShot' || entityLocal.type === 'CannonShot') {
                    continue;
                }

                Object.assign(entityLocal, entityNet);
            } else {
                entityLocal = Entity.create(entityNet.type, entityNet);
            }
        }
    } else {
        // Receiving score / misc updates
        const {self, other} = all;
        Score.setScore(self, other);
    }
}