## Synopsis

This is a JQuery plugin that allows you to create two resizable columns within a container.

## Code Example

$(document).ready(function() {
    $("#containerElement").resizableColumns({
        draggableElement: "#draggableElement",
        columnRightElement: "#element2",
        containerElement: "#containerElement",
        maxWidthColumnRight: 400,
        minWidthColumnRight: 100
    });
});
    
## Installation

The file requires the index.html and the jquery.resizable-columns.js file in a directory in order to see working.

## License

MIT