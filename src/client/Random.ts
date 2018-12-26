const int   = (min, max) => Math.round(float(min, max));
const float = (min, max) => (min + Math.random() * (max - min));

const arrayElement = a => a[int(0, a.length - 1)];

let y = 123 % 2147483647;

function groundYCoord() {
    y = y * 16807 % 2147483647;
    return (y - 1) / 2147483646;
}

export default {
    int,
    float,
    arrayElement,
    groundYCoord
};