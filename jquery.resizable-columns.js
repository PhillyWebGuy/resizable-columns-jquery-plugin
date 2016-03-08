(function($) {

    var methods = {
        init: function(options) {
            
            var self = this;

            if(!options || !options.draggableElement || !options.columnRightElement || !options.containerElement) {
                return false;
            }
            
            self.draggableElement = options.draggableElement;
            self.columnRightElement = options.columnRightElement;
            self.containerElement = options.containerElement;
            self.maxWidthColumnRight = options.maxWidthColumnRight ? parseInt(options.maxWidthColumnRight, 10) + 'px' : '400px';
            self.minWidthColumnRight = options.minWidthColumnRight ? parseInt(options.minWidthColumnRight, 10) + 'px' : '200px';

            function resizerObj(resizerID, mousemove, cursor) {

                var resizer = $(resizerID)[0];
                $(resizerID).css("cursor", cursor);
                resizer.mousemove = mousemove;

                resizer.onmousedown = function() {
                    $(self.containerElement).on('mousemove', function(event) {
                        resizer.doDrag(event);
                    });
                    $(self.containerElement).on('mouseup', function(event) {
                        resizer.stopDrag(event);
                    });
                };

                resizer.doDrag = function(event) {
                    if (event.which !== 1) {
                        resizer.stopDrag();
                        return;
                    }
                    resizer.mousemove(event);
                };

                resizer.stopDrag = function() {
                    $(self.containerElement).off('mousemove');
                    $(self.containerElement).off('mouseup');
                };
            }

            function resizeColumns(resizerID, mousemove) {
                resizerObj(resizerID, mousemove, "col-resize");
            }

            function resize(x) {
                var width = $(self.columnRightElement).parent().innerWidth(),
                    container = $(self.containerElement),
                    offset = container.offset();
                    width = width + offset.left - x + 'px';
                
                if(parseInt(width, 10) > parseInt(self.maxWidthColumnRight, 10)) {
                    $(self.columnRightElement).css("width", self.maxWidthColumnRight); 
                } else if(parseInt(width, 10) < parseInt(self.minWidthColumnRight, 10)) {
                    $(self.columnRightElement).css("width", self.minWidthColumnRight); 
                } else {
                    $(self.columnRightElement).css("width", width);
                }
            }

            resizeColumns(self.draggableElement, function(event) {
                resize(event.pageX);
            });

        }
    };

    $.fn.resizableColumns = function(method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method ' + method + ' does not exist on jQuery.mettel.resizableColumns');
        }

    };

})(jQuery);
