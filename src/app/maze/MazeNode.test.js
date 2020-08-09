import React from 'react';
import { render } from '@testing-library/react';
import MazeNode from './MazeNode';
import Maze from './Maze';

test('keep going up', () => {
    let array = [
        [0,1,2,3,4,5],
        [0,1,2,3,4,5],
        [0,1,2,3,4,5],
        [0,1,2,3,4,5],
        [0,1,2,3,4,5],
        [0,1,2,3,4,5]
    ];
    array[0,0] = "";
    array[1,0] = "";
    array[2,0] = "";
    array[3,0] = "";
    array[4,0] = "";
    array[5,0] = "";

    let maze = new Maze();
    maze.array = array;
    maze.createNodes();
    maze.solve(maze.parentNode);
});
