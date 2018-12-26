import sounds from './sounds';
import {defineSound} from './audio';

function load(): Promise<any> {
    return Promise.all(
        sounds.map(name =>
            fetch(`sounds/${name}`)
                .then(res => res.arrayBuffer())
                .then(arrayBuffer => defineSound({
                    name: name.replace('.ogg', ''),
                    arrayBuffer
                }))
        )
    );
}

export default {load};
