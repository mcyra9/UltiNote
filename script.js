console.log("Script loaded");

// Get references to the toolbar buttons
const clearBtn = document.getElementById("clear");
const boldBtn = document.getElementById("bold");
const italicBtn = document.getElementById("italic");
const underlineBtn = document.getElementById("underline");
const strikethroughBtn = document.getElementById("strikethrough");

const backgroundBtn = document.getElementById("background");
const fontColorBtn = document.getElementById("fontColor");
const fontSizeBtn = document.getElementById("fontSize");

const unorderedListBtn = document.getElementById("unorderedList");
const orderedListBtn = document.getElementById("orderedList");
const horizontalRuleBtn = document.getElementById("horizontalRule");

const alignLeftBtn = document.getElementById("alignLeft");
const alignCenterBtn = document.getElementById("alignCenter");
const alignOtherBtn = document.getElementById("alignOther");

const superscriptBtn = document.getElementById("superscript");
const subscriptBtn = document.getElementById("subscript");
const symbolsBtn = document.getElementById("symbols");
const tableBtn = document.getElementById("tableBtn");
const checkboxBtn = document.getElementById("checkbox");

const fractionBtn = document.getElementById("fraction");
const sqrtBtn = document.getElementById("sqrt");
const radicalBtn = document.getElementById("radical");

const bgColourMenu = document.getElementById("bgColourMenu");
const fontColourMenu = document.getElementById("fontColourMenu");
const fontSizeMenu = document.getElementById("fontSizeMenu");
const alignMenu = document.getElementById("alignMenu");
const symbolsMenu = document.getElementById("symbolsMenu");
const tableMenu = document.getElementById("tableMenu");
const saveMenu = document.getElementById("saveMenu");

const textspace = document.getElementById("textspace");

//tabs
let tabList = [];
let currentTab = 0;
tabList[0] = textspace.innerHTML;

//clicks
let savedRange = null; // Store the cursor position globally

//function to close all submenus except the one passed as an argument
function closeOtherSubmenus(exceptMenu) {
    const submenus = document.querySelectorAll(".submenu");
    submenus.forEach(menu => {
        if (menu !== exceptMenu) {
            menu.classList.remove("active");
        }
    });
}

clearBtn.addEventListener("mousedown", (event) => {
    event.preventDefault(); // Prevents the button from losing focus
    textspace.focus(); // Ensure the text area is focused before executing the command
    document.execCommand("removeFormat", false, null);
    console.log("Clear button clicked");

});
boldBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();
    textspace.focus();
    document.execCommand("bold", false, null);
    console.log("Bold button clicked");
});

italicBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();
    textspace.focus();
    document.execCommand("italic", false, null);
    console.log("Italic button clicked");
});

underlineBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();
    textspace.focus();
    document.execCommand("underline", false, null);
    console.log("Underline button clicked");
});

strikethroughBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();
    textspace.focus();
    document.execCommand("strikethrough", false, null);
    console.log("Strikethrough button clicked");
});

//font buttons
backgroundBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();
    textspace.focus();
    //document.execCommand("hiliteColor", false, "yellow");
    
    //make the submenu visible
    event.stopPropagation(); // Prevent the click from propagating to the document
    bgColourMenu.classList.toggle("active");
    
    // position the submenu near the button
    const rect = backgroundBtn.getBoundingClientRect();
    bgColourMenu.style.top = `${rect.bottom + window.scrollY}px`;
    bgColourMenu.style.left = `${rect.left + window.scrollX}px`;

    
    closeOtherSubmenus(bgColourMenu);
    console.log("background colour button clicked");
});

fontColorBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();
    textspace.focus();
    //document.execCommand("foreColor", false, "red");
    
    //make the submenu visible
    event.stopPropagation(); // Prevent the click from propagating to the document
    fontColourMenu.classList.toggle("active");
    
    // position the submenu near the button
    const rect = fontColorBtn.getBoundingClientRect();
    fontColourMenu.style.top = `${rect.bottom + window.scrollY}px`;
    fontColourMenu.style.left = `${rect.left + window.scrollX}px`;

    closeOtherSubmenus(fontColourMenu);
    console.log("font colour button clicked");
});

fontSizeBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();
    textspace.focus();
    //document.execCommand("fontSize", false, "4");
    
    //make the submenu visible
    event.stopPropagation();
    fontSizeMenu.classList.toggle("active");
    
    // position the submenu near the button
    const rect = fontSizeBtn.getBoundingClientRect();
    fontSizeMenu.style.top = `${rect.bottom + window.scrollY}px`;
    fontSizeMenu.style.left = `${rect.left + window.scrollX}px`;

    closeOtherSubmenus(fontSizeMenu);
    console.log("font size button clicked");
});

//list buttons
unorderedListBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();
    textspace.focus();
    document.execCommand("insertUnorderedList", false, null);
    console.log("Unordered List button clicked");
});

orderedListBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();
    textspace.focus();
    document.execCommand("insertOrderedList", false, null);
    console.log("Ordered List button clicked");
});

horizontalRuleBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();
    textspace.focus();
    document.execCommand("insertHorizontalRule", false, null);
    console.log("Horizontal Rule button clicked");
});

//alignment buttons
alignLeftBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();
    textspace.focus();
    document.execCommand("justifyLeft", false, null);
    console.log("Align Left button clicked");
});

alignCenterBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();
    textspace.focus();
    document.execCommand("justifyCenter", false, null);
    console.log("Align Center button clicked");
});

alignOtherBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();

    //make the submenu visible
    event.stopPropagation();
    alignMenu.classList.toggle("active");
    
    // position the submenu near the button
    const rect = alignOtherBtn.getBoundingClientRect();
    alignMenu.style.top = `${rect.bottom + window.scrollY}px`;
    alignMenu.style.left = `${rect.left + window.scrollX}px`;

    closeOtherSubmenus(alignMenu);
    console.log("Other Align button clicked");
});

//script buttons
superscriptBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();
    textspace.focus();
    document.execCommand("superscript", false, null);
    console.log("Superscript button clicked");
});

subscriptBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();
    textspace.focus();
    document.execCommand("subscript", false, null);
    console.log("Suberscript button clicked");
});

symbolsBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();

    //make the submenu visible
    event.stopPropagation();
    symbolsMenu.classList.toggle("active");
    
    // position the submenu near the button
    const rect = symbolsBtn.getBoundingClientRect();
    symbolsMenu.style.top = `${rect.bottom + window.scrollY}px`;
    symbolsMenu.style.left = `${rect.left + window.scrollX}px`;

    closeOtherSubmenus(symbolsMenu);
    console.log("Symbols button clicked");
});

tableBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();

    // Save the exact cursor position before opening the menu
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        savedRange = selection.getRangeAt(0);
    }

    event.stopPropagation();
    tableMenu.classList.toggle("active");

    // position the submenu near the button
    const rect = tableBtn.getBoundingClientRect();
    tableMenu.style.top = `${rect.bottom + window.scrollY}px`;
    tableMenu.style.left = `${rect.left + window.scrollX}px`;

    closeOtherSubmenus(tableMenu);
    console.log("Table inserted");
});

checkboxBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();
    textspace.focus();
    // Insert a checkbox at the cursor's location
    document.execCommand("insertHTML", false, '<input type="checkbox">');
    console.log("Checkbox button clicked");
});

fractionBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();
    textspace.focus();
    //use mathml to insert a fraction at the cursor's location
    document.execCommand("insertHTML", false, '<math><mfrac><mi>a</mi><mi>b</mi></mfrac></math>');
    console.log("Fraction button clicked");
});

sqrtBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();
    textspace.focus();
    //use mathml to insert a square root at the cursor's location
    document.execCommand("insertHTML", false, `
        <math>
        <msqrt>
            <mi>x</mi>
            <mo>+</mo>
            <mn>2</mn>
        </msqrt>
        </math>
        <br>
    `);
    console.log("Square root button clicked");
});

radicalBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();
    textspace.focus();
    //use mathml to insert a radical at the cursor's location
    document.execCommand("insertHTML", false, `
        <math>
            <mroot>
                <mi>
                    a
                </mi>
                <mi>
                    b
                </mi>
            </mroot>
        </math>
    `);
    console.log("Radical button clicked");
});

//tab indenting
textspace.addEventListener("keydown", (event) => {
    tabList[currentTab] = textspace.innerHTML;
    saveToLocalStorage();

    if (event.key === "Tab") {
        event.preventDefault();;
        if (event.shiftKey) {
            // Shift + Tab: Outdent
            document.execCommand("outdent", false, null);
        } else {
            // Tab: Indent
            document.execCommand("indent", false, null);
        }
    console.log("Tab key pressed,", event.shiftKey ? "outdenting" : "indenting");
    }
});

//image resize
//     ██      █
//    █  █
//   ██████    █
//  █      █   █
// █        █  █
// 1. Change cursor when hovering over the bottom-right corner of an image
textspace.addEventListener("mousemove", (event) => {
    if (event.target.tagName === "IMG") {
        const rect = event.target.getBoundingClientRect();
        // Define a 15x15 pixel "hitbox" in the bottom-right corner
        const isBottomRight = (event.clientX >= rect.right - 15 && event.clientY >= rect.bottom - 15);
        
        if (isBottomRight) {
            event.target.style.cursor = "nwse-resize"; // Diagonal resize cursor
        } else {
            event.target.style.cursor = "default";
        }
    }
});

// 2. Handle the Mousedown to start resizing
textspace.addEventListener("mousedown", (event) => {
    if (event.target.tagName === "IMG") {
        const img = event.target;
        const rect = img.getBoundingClientRect();
        
        // Check if they clicked inside our virtual hitbox
        const isBottomRight = (event.clientX >= rect.right - 15 && event.clientY >= rect.bottom - 15);

        if (isBottomRight) {
            event.preventDefault(); // Prevents the browser's default "drag image" behavior

            // Store initial values
            const startX = event.clientX;
            const startWidth = rect.width;
            const startHeight = rect.height;
            
            // Calculate aspect ratio so the image doesn't stretch weirdly
            const aspectRatio = startWidth / startHeight;

            // 3. The function that runs while dragging
            function doDrag(dragEvent) {
                // Calculate how far the mouse has moved horizontally
                const currentX = dragEvent.clientX;
                const newWidth = startWidth + (currentX - startX);
                
                // Apply new width, and calculate height to maintain aspect ratio
                if (newWidth > 20) { // Prevent shrinking it into oblivion
                    img.style.width = newWidth + "px";
                    img.style.height = (newWidth / aspectRatio) + "px";
                }
            }

            // 4. The function that stops the resizing
            function stopDrag() {
                // Remove listeners so they don't fire continuously forever
                document.removeEventListener("mousemove", doDrag);
                document.removeEventListener("mouseup", stopDrag);
            }

            // Attach the drag and drop listeners to the WHOLE document
            // This ensures resizing works even if they drag the mouse outside the textspace
            document.addEventListener("mousemove", doDrag);
            document.addEventListener("mouseup", stopDrag);
        }
    }
});

//collumn resize

// 1. Change cursor when hovering over cell borders
textspace.addEventListener("mousemove", (event) => {
    // Only process if no actively holding down the mouse button
    if (event.buttons !== 0) return; 

    if (event.target.tagName === "TD" || event.target.tagName === "TH") {
        const rect = event.target.getBoundingClientRect();
        
        // Define an 8-pixel invisible grab area on the edges
        const isRightEdge = event.clientX >= rect.right - 8;
        const isBottomEdge = event.clientY >= rect.bottom - 8;

        if (isRightEdge && isBottomEdge) {
            event.target.style.cursor = "nwse-resize"; // Corner resize
        } else if (isRightEdge) {
            event.target.style.cursor = "col-resize";  // Column resize
        } else if (isBottomEdge) {
            event.target.style.cursor = "row-resize";  // Row resize
        } else {
            event.target.style.cursor = "text";        // Back to normal typing
        }
    }
});

// 2. Handle the Mousedown to start resizing tables
textspace.addEventListener("mousedown", (event) => {
    if (event.target.tagName === "TD" || event.target.tagName === "TH") {
        const cell = event.target;
        const rect = cell.getBoundingClientRect();
        
        const isRightEdge = event.clientX >= rect.right - 8;
        const isBottomEdge = event.clientY >= rect.bottom - 8;

        // If they clicked on an edge, start the drag
        if (isRightEdge || isBottomEdge) {
            event.preventDefault(); // Stops text from highlighting while dragging

            const startX = event.clientX;
            const startY = event.clientY;
            const startWidth = rect.width;
            const startHeight = rect.height;
            const row = cell.parentElement; // Get the <tr> element

            // 3. The function that runs while dragging
            function doTableDrag(dragEvent) {
                // Resize Column (Width)
                if (isRightEdge) {
                    const newWidth = startWidth + (dragEvent.clientX - startX);
                    if (newWidth > 20) { // Keep a minimum width of 20px
                        cell.style.width = newWidth + "px";
                    }
                }
                
                // Resize Row (Height)
                if (isBottomEdge) {
                    const newHeight = startHeight + (dragEvent.clientY - startY);
                    if (newHeight > 20) { // Keep a minimum height of 20px
                        row.style.height = newHeight + "px";
                        cell.style.height = newHeight + "px"; 
                    }
                }
            }

            // 4. The function that stops resizing
            function stopTableDrag() {
                document.removeEventListener("mousemove", doTableDrag);
                document.removeEventListener("mouseup", stopTableDrag);
                cell.style.cursor = "text"; // Reset the cursor
            }

            // Attach listeners to the whole document so fast mouse movements don't break it
            document.addEventListener("mousemove", doTableDrag);
            document.addEventListener("mouseup", stopTableDrag);
        }
    }
});