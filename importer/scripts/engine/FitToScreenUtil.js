var FitToScreenUtil = {
    fitToScreen: function (mc) {
        //if this is portrait mode
        if (Model.theStage.height > Model.theStage.width) {
            //if asset is wider than the stage
            if (mc.width > Model.theStage.width) {
                this.shrinkAssetW(mc.width, mc.width, 1, 1, mc);
            } else {
                this.enlargeAssetW(mc.width, mc.width, 1, 1, mc);
            }
        } else {
            //if this is landscape mode
            if (mc.height > Model.theStage.height) {
                //if asset is taller than the stage
                this.shrinkAssetH(mc.height, mc.height, 1, 1, mc);
            } else {
                this.enlargeAssetH(mc.width, mc.width, 1, 1, mc);
            }
        }

        mc.x = (Model.theStage.width - mc.width) / 2;
        mc.y = (Model.theStage.height - mc.height) / 2;
    },

    enlargeAssetW: function (_origW, _w, sX, sY, mc) {
        if (_w < Model.theStage.width) {
            sX += 0.05;
            sY += 0.05;
            _w = _origW * sX;

            this.enlargeAssetW(_origW, _w, sX, sY, mc);
        } else {
            mc.scale.x = sX;
            mc.scale.y = sY;
        }
    },

    enlargeAssetH: function (_origH, _h, sX, sY, mc) {
        if (_h < Model.theStage.height) {
            sX += 0.05;
            sY += 0.05;
            _h = _origH * sX;

            this.enlargeAssetH(_origH, _h, sX, sY, mc);
        } else {
            mc.scale.x = sX;
            mc.scale.y = sY;
        }
    },

    shrinkAssetW: function (_origW, _w, sX, sY, mc) {
        if (_w > Model.theStage.width) {
            sX -= 0.05;
            sY -= 0.05;
            _w = _origW * sX;
            this.shrinkAssetW(_origW, _w, sX, sY, mc);
        } else {
            mc.scale.x = sX;
            mc.scale.y = sY;
        }
    },

    shrinkAssetH: function (_origH, _h, sX, sY, mc) {
        if (_h > Model.theStage.height) {
            sX -= 0.05;
            sY -= 0.05;
            _h = _origH * sX;
            this.shrinkAssetH(_origH, _h, sX, sY, mc);
        } else {
            mc.scale.x = sX;
            mc.scale.y = sY;
        }
    }

}