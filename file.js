console.log("file.js loaded");

//#####################################################################3
// tabs

// Function to add a new tab
function addTab (TabNumber) {
    const newTab = document.createElement("div");
    newTab.className = "tab";

    const tablabel = document.createElement("span");
    tablabel.textContent = `Tab ${TabNumber}`;
    newTab.appendChild(tablabel);

    const closeBtn = document.createElement("span");
    //closeBtn.className = "tab-close-btn";
    closeBtn.textContent = "×"; // Close button symbol
    closeBtn.style.margin = "0 0 0 5%";
    newTab.appendChild(closeBtn);

    newTab.dataset.tabNumber = TabNumber; // Store the tab number in a data attribute

    newTab.addEventListener("click", () => {
        // Save the current tab's content before switching
        tabList[currentTab] = textspace.innerHTML;
        // Switch to the clicked tab
        currentTab = TabNumber;
        textspace.innerHTML = tabList[currentTab]; // Load the content of the new tab, or empty if it doesn't exist
        console.log(`Switched to Tab ${currentTab}`);
    });

    closeBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        newTab.remove(); // Remove the tab from the DOM
        tabList.splice(TabNumber, 1); // Remove the tab's content from the list
        console.log(`Closed Tab ${TabNumber}`);
        // Update the indices of the remaining tabs
        //syncTabs();
        saveToLocalStorage();
    });

    const tabar = document.getElementById("tabar");
    tabar.appendChild(newTab);
};

// Function to synchronize tab indices and labels after a tab is closed
function syncTabs() {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab, index) => {
        tab.dataset.tabIndex = index;
        // Update the visual label (the first span inside the tab)
        tab.querySelector("span").textContent = `Tab ${index + 1}`; 
    });
}

//#########################################################################################
//local storage

//save tabs to local storage
function saveToLocalStorage() {
    let tabsData = {
        currentTab: currentTab,
        tabList: tabList
    };
    localStorage.setItem("tabsData", JSON.stringify(tabsData));
    console.log("Tabs saved to local storage");
}

//load tabs from local storage
function loadFromLocalStorage() {
    const savedData = localStorage.getItem("tabsData");
    if (savedData) {
        const { currentTab: savedCurrentTab, tabList: savedTabList } = JSON.parse(savedData);
        currentTab = savedCurrentTab;
        tabList = savedTabList;
        textspace.innerHTML = tabList[currentTab] || ""; // Load the content of the current tab, or empty if it doesn't exist
        // Recreate the tabs in the UI
        tabList.forEach((content, index) => {
            addTab(index);
        });
        console.log("Tabs loaded from local storage", currentTab, tabList);
    } else {
        console.log("cannot load, no data existing data");
    }
}

//--------------------------------
//load up sequence
loadFromLocalStorage();
if (tabList.length <= 1) {
    console.log("No saved tabs found, creating a new tab");
    addTab(0);
    currentTab = 0;
}

//###################################################################################
//file buttons

//refrence all buttons
const newBtn = document.getElementById("new");
const openBtn = document.getElementById("open");
const saveBtn = document.getElementById("save");
const loadBtn = document.getElementById("load");

const downloadNameInput = document.getElementById("downloadName");
const fileInput = document.getElementById('fileInput');

// New button click event
newBtn.addEventListener("mousedown", (event) => {
    tabList[currentTab] = textspace.innerHTML;
    addTab(tabList.length);
    currentTab = tabList.length;
    tabList[currentTab] = "";
    textspace.innerHTML = tabList[currentTab];
    console.log("new button clicked");
});

// Open button click event
openBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();
    fileInput.click();
});

// event listener for file input change:
fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (!file) return;

    try {
      // Turn the file content into a text string
        const textString = await file.text(); 
        textspace.innerHTML = textString;
        event.target.value = '';//Clear the input so the exact same file can be opened again
    } catch (error) {
        console.error("Error reading file:", error);
    }
});

// Save button click event
saveBtn.addEventListener("mousedown", (event) => {
    event.preventDefault();

    //make the submenu visible
    event.stopPropagation(); // Prevent the click from propagating to the document
    saveMenu.classList.toggle("active");
    
    // position the submenu near the button
    const rect = saveBtn.getBoundingClientRect();
    saveMenu.style.top = `${rect.bottom + window.scrollY}px`;
    saveMenu.style.left = `${rect.left + window.scrollX}px`;

    //remove all other submenus, get them by class
    console.log("save menu opened");
    closeOtherSubmenus(saveMenu);
});

//remove menu if clicked outside of it
    window.addEventListener('mousedown', (event) => {
        if (!saveMenu.contains(event.target)) {
            saveMenu.classList.remove('active');
        }
    });



//AI
const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", async () => {
    const filenameInput = document.getElementById("downloadName").value.trim();
    const suggestedName = filenameInput ? `${filenameInput}.html` : "note.html";
    const content = textspace.innerHTML;

    // Option 1: Use File System Access API (Opens 'Save As' window)
    if ("showSaveFilePicker" in window) {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: suggestedName,
                types: [{
                    description: "HTML Document",
                    accept: { "text/html": [".html"] },
                }],
            });
            
            // Create a writable stream and write the textspace content
            const writable = await handle.createWritable();
            await writable.write(content);
            await writable.close();
            
            // Close the save menu after saving
            saveMenu.classList.remove("active");
            return;
        } catch (err) {
            // If the user clicks "Cancel" in the file picker, do nothing
            if (err.name === "AbortError") {
                return;
            }
            console.error("Save File Picker error:", err);
        }
    }

    // Option 2: Fallback for unsupported browsers (Firefox / older devices)
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = suggestedName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    saveMenu.classList.remove("active");
});
