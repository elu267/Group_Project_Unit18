data = '/resorts';

var resorts = {
    matrix: []
};

for (var i = 0; i < 432; i++) {
    matrix.push(0);
};

console.log(matrix);

for (var i in data) {
    var item = data[i];
    resorts.matrix.push({
        "Easy": item.Easy,
        "Intermediate": item.Intermediate,
        "Difficult": item.Difficult
    });
};

console.log(matrix);