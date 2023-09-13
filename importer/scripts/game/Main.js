class Main {

    constructor() {
        this.view = null;
        this.gameHolder = new PIXI.Container();
        this.viewHeirarchyObj;
        this.assetsLoaded = false;
        this.placeMentsLoaded = false;
        var url = "assets/placements.json?rnd=" + Math.random();
        console.log(url)

        $.getJSON(url, this.placementsRetreived.bind(this));

        TextureAtlas.init(this.loadedComplete.bind(this), this.loadProgress, "assets/ta.json?rnd="+ Math.random());

    }

    placementsRetreived(data) {
        this.placeMentsLoaded = true;
        this.viewHeirarchyObj = data;
        this.loadView();
    }

    loadProgress(_progress) {

    }



    loadedComplete() {
        this.assetsLoaded = true;
        this.loadView();
    }

    loadView() {
        if (this.assetsLoaded && this.placeMentsLoaded) {
            TemplateLoader.init(this.viewHeirarchyObj);

            for(var i = 0; i < this.viewHeirarchyObj.stage.children.length; i++)
            {
                var templateName = this.viewHeirarchyObj.stage.children[i].name;
                console.log(templateName);
                var view = TemplateLoader.spawn(templateName);
                this.gameHolder.addChild(view);
                view.looping = true;
                if(view.gotoAndPlay)
                {
                    view.gotoAndPlay(0);
                }
                
            }

            //view.ball1.tf.text = "Yonny";
/*
            var viewName = "BigAnimMC";
            var view = TemplateLoader.get(viewName); //HudUI // MenuScreenMC // DetailsPanelMC
            if (viewName == "BigAnimMC") {
                
            }

            this.view = view;
            this.gameHolder.addChild(view);
*/

            //view.btn1.addEventListener(TouchEvent.TOUCH, onGameClicked);
            //view.btn2.addEventListener(TouchEvent.TOUCH, onLoadClicked);
            //view.btn3.addEventListener(TouchEvent.TOUCH, onAiGameClicked);
            // view.editBTN.addEventListener(TouchEvent.TOUCH, onEditClicked);

        }

    }

    onStartTouched() {
        this.startScreen.mouseup = this.startScreen.touchend = this.startScreen.mouseupoutside = this.startScreen.touchendoutside = null;
        this.gameHolder.removeChild(this.startScreen);
        //this.player.addEventListener("DO_FLOOD_FILL", this.doFloodFill.bind(this));
        toggleFullScreen();

        addUpdateAble(this);


    }


    onMove(interactionData) {
        this.point = interactionData.data.global;
    }


    onDown(interactionData) {
        this.point = interactionData.data.global;
        var touchcol = parseInt(this.point.x / Model.TILE_SIZE);
        var touchrow = parseInt(this.point.y / Model.TILE_SIZE);
    }


    update() {
        var asset = this.view.editBTN.instance133.TeamBTNBG;
        asset.y++;
        trace(asset.scale.x)
    }
}
