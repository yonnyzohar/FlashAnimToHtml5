
package com.rectanglePacker.utils
{
    /**
     * Class used to store rectangles values inside rectangle packer
     * ID parameter needed to connect rectangle with the originally inserted rectangle
     */
    public class IntegerRectangle
    {
        public var x:int;
        public var y:int;
        public var width:int;
        public var height:int;
        public var right:int;
        public var bottom:int;
        public var id:int;

        public function IntegerRectangle(x:int = 0, y:int = 0, width:int = 0, height:int = 0)
        {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.right = x + width;
            this.bottom = y + height;
        }
    }
}
