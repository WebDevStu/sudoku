
"use strict";

/**
 * Sudoku
 * @constructor
 */
var Sudoku = function () {

    this.$sudoku = _.$('sudoku');
    this.$time = _.$('time');

    this.board = new Array(81);
    this.len = 9;
    this.sum = 45;

    this.selection = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    this.reset()
        .buildBoard();
};


// extend the prototype
_.extend(Sudoku.prototype, {


    /**
     * startClock
     */
    startClock: function () {

        var start = this.start,
            $time = this.$time;

        clearInterval(this.timeInterval);

        this.timeInterval = setInterval(function () {

            var diff = +new Date() - start,
                hours = Math.floor(diff / 1000 / 60 / 60),
                minutes = Math.floor((diff - (hours * 60 * 60 * 1000)) / 1000 / 60),
                seconds = Math.floor((diff - (hours * 60 * 60 * 1000) - (minutes * 60 * 1000)) / 1000);

            $time.innerHTML = [_.padding(hours), _.padding(minutes), _.padding(seconds)].join(':');
        }, 1000);
    },


    /**
     * reset the board array to zero on each
     *
     * @returns {Sudoku}
     */
    reset: function () {

        for (var i = 0; i < 81; i += 1) {
            this.board[i] = 0;
        }

        return this;
    },


    /**
     * builds the html board into the DOM
     *
     * @returns {Sudoku}
     */
    buildBoard: function () {

        var input;

        this.$sudoku.innerHTML = '';

        for (var i = 0; i < 81; i += 1) {
            input = document.createElement('input');
            input.setAttribute('maxlength', 1);
            input.setAttribute('type', 'text');
            input.value = this.board[i] || '';

            this.$sudoku.appendChild(input);
        }

        return this;
    },


    /**
     * start a new game
     *
     * @returns {Sudoku}
     */
    newGame: function () {

        var row,
            col,
            clone,
            rand;

        this.start = +new Date();
        this.$time.innerHTML = '00:00:00';

        // for each row
        for (row = 0; row < 9; row += 1) {

            clone = _.clone(this.selection);

            // for each column
            for (col = 0; col < 9; col += 1) {

                // pick random number from selection
                rand = Math.floor(Math.random() * clone.length);

                // place in array
                this.board[(row * 9) + col] = clone[rand];

                // remove selected from array
                clone.splice(rand, 1);
            }
        }

        console.log('random board', this.board);
        this.buildBoard()
             .validate(true)
            // .validate(false);


        this.startClock();


        return this;
    },




    // validates the board
    validate: function (horizontal) {

        var accumulative,
            yAxis,
            xAxis;

        for (yAxis = 0; yAxis < this.len; yAxis += 1) {

            accumulative = 0;

            for (xAxis = 0; xAxis < this.len; xAxis += 1) {
                if (horizontal) {
                    accumulative += this.board[this.getIndex(yAxis, xAxis)];
                } else {
                    accumulative += this.board[this.getIndex(xAxis, yAxis)];
                }
            }

            //console.log('acc', accumulative);
            // debug
            if (accumulative !== this.sum) {
                if (horizontal) {
                    console.log('error', yAxis);
                } else {
                    console.log('error', xAxis);
                }
            }
        }

        return this;
    },


    getIndex: function (x, y) {
        return (y * 9) + x;
    },



    /**
     * jumble the rows into order
     */
    jumble: function () {

        var matrix = {
                column: {},
                cubes: {}
            },
            row,
            cube,
            i;

        for (i = 0; i < 81; i += 1) {

            row = Math.floor(i / 9);
            cube = Math.floor(i / 3);

            // list columns and check for existing numbers
            //matrix.column[];


            //if (row < 3) {
            //    console.log(row, cube, i);
            //}
        }
    }
});



var board = [
    [3,2,6, 5,1,4, 7,8,9],
    [5,7,1, 8,2,9, 3,6,4],
    [9,8,4, 3,6,7, 2,1,5],

    [8,4,5, 7,9,2, 6,3,1],
    [2,1,3, 4,8,6, 9,5,7],
    [6,9,7, 1,3,5, 8,4,2],

    [7,5,2, 6,4,8, 1,9,3],
    [4,3,8, 9,7,1, 5,2,6],
    [1,6,9, 2,5,3, 4,7,8]
];




var sudoku = new Sudoku();

_.$('new-game').addEventListener('click', function (evt) {

    evt.preventDefault();

    sudoku.newGame();

}, false);

console.log(sudoku);

//sudoku.validate(true);
//sudoku.validate(false);
sudoku.jumble();

