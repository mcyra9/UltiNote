console.log('menus.js loaded');

// Hide the submenu when clicking outside of it
window.addEventListener('mousedown', (event) => {

  if (!bgColourMenu.contains(event.target)) {
    bgColourMenu.classList.remove('active');
  } else if (bgColourMenu.contains(event.target)) {
    if (event.target.tagName === 'P') {
        let checkbox = document.getElementById("bgColourCheckbox");
        if (event.target.id === "bgColourLabel") {
            // Handle checkbox click
            checkbox.click();
        }
        const color = event.target.style.color;
        if (checkbox.checked) {
          event.preventDefault();
          textspace.focus();
          const selection = window.getSelection();
          if (selection.rangeCount > 0) {
            //find the parent element of the selection and set its background color
            const range = selection.getRangeAt(0);
            const parentElement = range.commonAncestorContainer.parentElement;
            parentElement.style.backgroundColor = color;
          }
        } else {
          event.preventDefault();
          document.execCommand("hiliteColor", false, color);
          textspace.focus();
        }
      }
    }

  if (!fontColourMenu.contains(event.target)) {
    fontColourMenu.classList.remove('active');
  } else if (fontColourMenu.contains(event.target)) {
    event.preventDefault();
    if (event.target.tagName === 'P') {
      const color = event.target.style.color;
      document.execCommand("foreColor", false, color);
      textspace.focus();
    }
    closeOtherSubmenus(fontColourMenu);
  }

  if (!fontSizeMenu.contains(event.target)) {
    fontSizeMenu.classList.remove('active');
  } else if (fontSizeMenu.contains(event.target)) {
    event.preventDefault();
    if (event.target.tagName === 'P') {
      const size = event.target.getAttribute("data-size");
      document.execCommand("fontSize", false, size);
      textspace.focus();
    }
    closeOtherSubmenus(fontSizeMenu);
  }

  if (!alignMenu.contains(event.target)) {
    alignMenu.classList.remove('active');
    } else if (alignMenu.contains(event.target)) {
          event.preventDefault();
          if (event.target.tagName === 'P') {
          const id = event.target.id;
              switch(id) {
                  case "alignLeftOption":
                      document.execCommand("justifyLeft", false, null);
                      break;
                  case "alignCenterOption":
                      document.execCommand("justifyCenter", false, null);
                      break;
                  case "alignRightOption":
                      document.execCommand("justifyRight", false, null);
                      break;
                  case "alignJustifyOption":
                      document.execCommand("justifyFull", false, null);
                      break;
              }
          textspace.focus();
          }
      closeOtherSubmenus(alignMenu);
    }

    if (!symbolsMenu.contains(event.target)) {
        symbolsMenu.classList.remove('active');
    } else if (symbolsMenu.contains(event.target)) {
        event.preventDefault();
        if (event.target.tagName === 'P') {
        const text = event.target.textContent;
        
        document.execCommand("insertText", false, text);
        textspace.focus();
        }
      closeOtherSubmenus(symbolsMenu);
    }

  if (!tableMenu.contains(event.target)) {
        tableMenu.classList.remove('active');
    } else if (tableMenu.contains(event.target)) {
        if (event.target.tagName === 'BUTTON') {
        event.preventDefault();

        const rows = document.getElementById("tableRows").value;
        const cols = document.getElementById("tableCols").value;
        let startHTML = `<table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;" border="1">
            <tbody>`;
        let bodyHTML = "";
        for (let i = 0; i < rows; i++) {
          bodyHTML += `<tr>`;
          for (let j = 0; j < cols; j++) {
            bodyHTML += `<td style="padding: 8px; border: 1px solid #ccc;">Row ${i + 1}, Col ${j + 1}</td>`;
          }
          bodyHTML += `</tr>`;
        }
        let endHTML = `</tbody>
        </table>
        `;
        let finalHTML = startHTML + bodyHTML + endHTML;

        // Restore the cursor position before inserting
        const selection = window.getSelection();
        textspace.focus();
        if (savedRange) {
                selection.removeAllRanges();
                selection.addRange(savedRange);
        }
        document.execCommand("insertHTML", false, finalHTML);
        tableMenu.classList.remove('active'); // Close menu after inserting
        }
    closeOtherSubmenus(tableMenu);
    }
});