let local_gesinnung = 0;
let gesinnung;

// Sets the local_gesinnung to 1 (evil).
// Consider enhancing this to provide immediate user feedback or trigger a content update.
function evil() {
    local_gesinnung = 1;
}

let contentQueue = [];
let isPrinting = false;

function processQueue(data) {
    console.log("start processing");
    console.log("Data:");
    console.log(data);

    document.getElementById('headline').innerText = data.headline;
    document.getElementById('text').innerText = data.text;
    document.getElementById('image').src = data.imageUrl;
    gesinnung = data.gesinnung; // This was in the original script, assuming it's still needed.
    console.log("start data processing");
    // Assuming generateLayout was part of the original script and is available globally or in another linked file.
    // If generateLayout was part of the extracted script, it should be included here.
    // For now, I'll call it as it was in the provided html snippet.
    generateLayout(data.text); 

    document.getElementById('image').onload = function() {
        // Triggers browser's print dialog.
        // The isPrinting flag attempts to prevent overlapping print attempts.
        console.log("Printing...");
        window.print();
        
        // Timeout to reset isPrinting flag. This might not be perfectly reliable
        // if the print dialog is open for longer or closed prematurely.
        setTimeout(() => {
            console.log("stopped printing")
            isPrinting = false;
        }, 5000);
    };
}

function updateContent() {
    if (!isPrinting) {
        var path;
        if (local_gesinnung == 0) {
            path = '/getGood';
        } else {
            path = '/getEvil';
        }

        fetch(path)
            .then(response => response.json())
            .then(data => {
                if (data !== "") {
                    isPrinting = true;
                    console.log("start printing");
                    processQueue(data);
                }
            })
            .catch(error => console.error('Error:', error));
    }
}

setInterval(updateContent, 5000);

// Check 4 neuen content (Original comment, kept for context)
