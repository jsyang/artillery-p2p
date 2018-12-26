const scores = {
    self:  0,
    other: 0
};

function add(self, other: number): void {
    scores.self += self;
    scores.other += other;
}


export default {
    add,
    setScore: (self, other) => {
        scores.self  = other;
        scores.other = self;
    },
    getScore: () => scores
}