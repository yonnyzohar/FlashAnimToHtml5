function TextField(w, h, text, font, size, color)
{
	var tf = new PIXI.Text(text,{fontFamily: font, fontSize: size, fill: color, align : 'center'});
	return tf;
}