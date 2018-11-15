export const getBoardCode = (shape) => {
    const codeDict = {
        'O': 1,
        'T': 2,
        'I': 3,
        'J': 4,
        'L': 5,
        'S': 6,
        'Z': 7
    };
    return codeDict[shape];
}


//shuffle alghorithm from https://bost.ocks.org/mike/shuffle/
export const shuffleShapes = () => {
    let shapes = ['T', 'O', 'I', 'J', 'L', 'S', 'Z'];
    let m = 7, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = shapes[m];
        shapes[m] = shapes[i];
        shapes[i] = t;
  }
  return shapes;
}

export const getPieceBlocks = (piece) => {
    const { shape, orientation, x, y } = piece;
    switch (shape) {
        case 'T':
            switch (orientation) {
                case 0:
                    return [{x, y}, {x: x -1, y}, {x, y: y + 1}, {x: x + 1, y}];
                case 1:
                    return [{x, y}, {x, y: y + 1}, {x: x + 1, y}, {x, y: y - 1}];
                case 2:
                    return [{x, y}, {x: x - 1, y}, {x, y: y - 1}, {x: x + 1, y}];
                case 3:
                    return [{x, y}, {x, y: y + 1}, {x: x - 1, y}, {x, y: y - 1}];
                default:
                    return;
            }
        case 'I':
            switch (orientation) {
                case 0:
                    return [{x, y: y + 1}, {x, y}, {x, y: y - 1}, {x, y: y - 2}];
                case 1:
                    return [{x: x - 1, y}, {x, y}, {x: x + 1, y}, {x: x + 2, y}];
                case 2:
                    return [{x: x + 1, y: y + 1}, {x: x + 1, y}, {x: x + 1, y: y - 1}, {x: x + 1, y: y - 2}];
                case 3:
                    return [{x: x - 1, y: y - 1}, {x, y: y - 1}, {x: x + 1, y: y - 1}, {x: x + 2, y: y - 1}];
                default:
                    return;
            }
        case 'O':
            return [{x, y}, {x: x + 1, y}, {x, y: y - 1}, {x: x + 1, y: y - 1}];
        case 'L':
            switch (orientation) {
                case 0:
                    return [{x, y: y + 1}, {x, y}, {x, y: y - 1}, {x: x + 1, y: y - 1}];
                case 1:
                    return [{x: x - 1, y: y - 1}, {x: x - 1, y}, {x, y}, {x: x + 1, y}];
                case 2:
                    return [{x: x - 1, y: y + 1}, {x, y: y + 1}, {x, y}, {x, y: y - 1}];
                case 3:
                    return [{x: x - 1, y}, {x, y}, {x: x + 1, y}, {x: x + 1, y: y + 1}];
                default:
                    return;
            }
        case 'J':
            switch (orientation) {
                case 0:
                    return [{x, y: y + 1}, {x, y}, {x, y: y - 1}, {x: x - 1, y: y - 1}];
                case 1:
                    return [{x: x - 1, y: y + 1}, {x: x - 1, y}, {x, y}, {x: x + 1, y}];
                case 2:
                    return [{x: x + 1, y: y + 1}, {x, y: y + 1}, {x, y}, {x, y: y - 1}];
                case 3:
                    return [{x: x - 1, y}, {x, y}, {x: x + 1, y}, {x: x + 1, y: y - 1}];
                default:
                    return;
            }
        case 'S':
            switch (orientation) {
                case 0:
                    return [{x, y: y + 1}, {x, y}, {x: x + 1, y: y + 1}, {x: x - 1, y}];
                case 1:
                    return [{x, y: y + 1}, {x, y}, {x: x + 1, y}, {x: x + 1, y: y - 1}];
                case 2:
                    return [{x: x - 1, y: y - 1}, {x, y: y - 1}, {x, y}, {x: x + 1, y}];
                case 3:
                    return [{x: x - 1, y: y + 1}, {x, y}, {x: x - 1, y}, {x, y: y - 1}];
                default:
                    return;
            }
        case 'Z':
            switch (orientation) {
                case 0:
                    return [{x, y: y + 1}, {x, y}, {x: x - 1, y: y + 1}, {x: x + 1, y}];
                case 1:
                    return [{x, y: y - 1}, {x, y}, {x: x + 1, y}, {x: x + 1, y: y + 1}];
                case 2:
                    return [{x: x - 1, y}, {x, y: y - 1}, {x, y}, {x: x + 1, y: y -1}];
                case 3:
                    return [{x: x - 1, y: y - 1}, {x, y}, {x: x - 1, y}, {x, y: y + 1}];
                default:
                    return;
            }
        default:
            return;
    }
}