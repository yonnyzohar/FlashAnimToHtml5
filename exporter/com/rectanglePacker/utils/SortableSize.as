
package com.rectanglePacker.utils
{
    /**
     * Class used for sorting the inserted rectangles based on the dimensions
     */
    public class SortableSize
    {
        public var width:int;
        public var height:int;
        public var id:int;

        public function SortableSize(width:int, height:int, id:int)
        {
            this.width = width;
            this.height = height;
            this.id = id;
        }
    }
}
