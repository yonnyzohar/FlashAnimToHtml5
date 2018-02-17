function TileShower() {
    var self = this;
    var prevRow = -1;
    var prevCol = -1;
    var addTiles = true;
    var removeTiles = true;

    this.showHideTiles = function (world) {



        var n;
        var col = 0;
        var row = 0;
        var gap = 1;
        var hudTiles = 0

        var globalWorldPoint = world.view.toGlobal(new PIXI.Point(0, 0));

        var screenRow = parseInt(Math.abs(globalWorldPoint.y / (Model.TILE_SIZE)));
        var screenCol = parseInt(Math.abs(globalWorldPoint.x / (Model.TILE_SIZE)));
        var _stageWidth = parseInt((Model.stageWidth) / Model.TILE_SIZE);
        var _stageHeight = parseInt(Model.stageHeight / Model.TILE_SIZE);



        function isValidTile(row, col) {
            if (Model.mapArray[row] != undefined &&
                Model.mapArray[row][col] != undefined &&
                Model.mapArray[row][col] != null) {
                return true
            } else {
                return false
            }
        }


        if (prevRow == -1 || prevCol == -1) {

            if (addTiles == true) {
                for (row = screenRow; row <= (_stageHeight + screenRow); row++) {
                    for (col = screenCol; col <= (_stageWidth + screenCol); col++) {

                        if (isValidTile(row, col)) {
                            n = world.levelTilesArray[row][col];
                            n.visible = true;
                        }
                    }
                }
            }

        } else {

            if (prevRow != screenRow || prevCol != screenCol) {
                if (screenRow > prevRow) {


                    //remove only the top most row
                    for (row = prevRow; row < screenRow; row++) {
                        for (col = screenCol; col < (_stageWidth + screenCol + hudTiles); col++) {

                            if (isValidTile(row, col)) {
                                n = world.levelTilesArray[row][col];
                                n.visible = false;

                            }
                        }
                    }

                    //add the bottom most row
                    for (row = (_stageHeight + prevRow); row <= (_stageHeight + screenRow + gap); row++) {
                        for (col = screenCol; col <= (_stageWidth + screenCol + gap); col++) {


                            if (isValidTile(row, col)) {
                                n = world.levelTilesArray[row][col];
                                n.visible = true;

                            }
                        }
                    }


                } else {

                    //remove the bottom most row
                    for (row = (_stageHeight + prevRow - gap); row > (_stageHeight + screenRow); row--) {
                        for (col = screenCol; col < (_stageWidth + screenCol + hudTiles); col++) {

                            if (isValidTile(row, col)) {
                                n = world.levelTilesArray[row][col];
                                n.visible = false;
                            }
                        }
                    }
                    //add the top most
                    for (row = prevRow; row >= screenRow; row--) {
                        for (col = screenCol; col <= (_stageWidth + screenCol + gap); col++) {

                            for (col = screenCol; col <= (_stageWidth + screenCol + gap); col++) {
                                if (isValidTile(row, col)) {
                                    n = world.levelTilesArray[row][col];
                                    n.visible = true;

                                }
                            }
                        }
                    }
                }

                if (screenCol > prevCol) {

                    //remove only left most col
                    for (col = prevCol; col < screenCol; col++) {
                        for (row = screenRow; row < (_stageHeight + screenRow); row++) {
                            if (isValidTile(col, row)) {
                                if (isValidTile(row, col)) {
                                    n = world.levelTilesArray[row][col];
                                    n.visible = false;
                                }
                            }
                        }
                    }

                    //add right most col
                    for (col = (_stageWidth + prevCol); col <= (_stageWidth + screenCol + gap); col++) {
                        for (row = screenRow; row <= (_stageHeight + screenRow); row++) {
                            if (isValidTile(row, col)) {
                                n = world.levelTilesArray[row][col];
                                n.visible = true;
                            }
                        }
                    }
                } else {

                    //prevCol > screenCol
                    //remove right most col
                    for (col = (_stageWidth + prevCol + gap + hudTiles); col > (_stageWidth + screenCol + gap); col--) {
                        for (row = screenRow; row <= (_stageHeight + screenRow + gap); row++) {

                            if (isValidTile(row, col)) {
                                n = world.levelTilesArray[row][col];
                                n.visible = false;

                            }
                        }
                    }

                    //add left most col
                    for (col = prevCol; col >= screenCol; col--) {
                        for (row = screenRow; row <= (_stageHeight + screenRow + gap); row++) {
                            if (isValidTile(row, col)) {
                                n = world.levelTilesArray[row][col];
                                n.visible = true;

                            }
                        }
                    }
                }
            }
        }
        prevRow = screenRow;
        prevCol = screenCol;
    }
}