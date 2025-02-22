﻿
	class GameTextField extends PIXI.Text
	{
		constructor(boundsObj, _text, _fontName="Verdana", _fontSize=12, _color=0, _bold=false) 
		{
            super(_text,{fontFamily: _fontName, fontSize: _fontSize, fill: _color, align : 'center'});
			this.innerVal;
            this.z;
            this.bgTF;
		}

		showBorder()
		{
			
		}
		
		setName(_name, placement = "")
		{
			this.name = _name;
			
			if (placement == "middle")
			{
				this.pivot.x = this.width * 0.5;
				this.pivot.y = this.height * 0.5;
			}
		}
		
		
		
		setText(str)
		{
			this.text = str;
			
			if (this.bgTF != null)
			{
				this.bgTF.text = str;
			}
		}
		
		killMe()
		{
			if (this.bgTF)
			{
				this.bgTF.dispose();
				this.bgTF.removeFromParent(true);
				this.bgTF = null;
			}
			
			this.removeFromParent();
		}
		
	}

