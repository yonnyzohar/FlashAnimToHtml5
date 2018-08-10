var FitToScreenUtil = {

    fitToScreen: function (mc) {
        //if this is portrait mode
        if (Model.theStage.height > Model.theStage.width) {
            //if asset is wider than the stage

            var scale = mc.width / Model.theStage.width;

            mc.scale.x /= scale;
            mc.scale.y /= scale;

        } else {
            //if this is landscape mode
            var scale = mc.height / Model.theStage.height;
            mc.scale.x /= scale;
            mc.scale.y /= scale;
        }

        mc.x = (Model.theStage.width - mc.width) / 2;
        mc.y = (Model.theStage.height - mc.height) / 2;
    }

}
