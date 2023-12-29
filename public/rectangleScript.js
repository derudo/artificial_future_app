function generateLayout(textContent) {
    const container = document.getElementById('rectangleContainer');
    container.innerHTML = ''; // Clear previous rectangles

    const textContainer = document.getElementById('textContainer');
    textContainer.innerHTML = ''; // Clear previous text

    const numRects = 25; // Number of rectangles
    const rectWidth = 100;
    const rectHeight = 1;
    let rects = []; // Array to store rectangle data

    // Generate rectangle data
    for (let i = 0; i < numRects; i++) {
        rects.push({ width: rectWidth, height: rectHeight });
    }

    // Split the text content into words
    const words = textContent.split(" ");

    // Call positionTextSegments with the words and rectangles
    positionTextSegments(words, rects, textContainer, container.offsetWidth);
}

function positionTextSegments(words, rects, textContainer, containerWidth) {
    let currentX = 0;
    let currentY = 0;
    let lineHeight = 2; // Example line height
    let rectIndex = 0; // To keep track of which rectangle to insert next

    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let textSegment = document.createElement('span');
        textSegment.textContent = word + ' ';
        textSegment.style.position = 'relative';
        //textSegment.style.left = `${currentX}px`;
        textSegment.style.top = `${currentY}px`;
        if (Math.random() < 0.5) {
            textSegment.style.top = `${currentY+getRandomInt(10)}px`;
        }
        textContainer.appendChild(textSegment);

        currentX += textSegment.offsetWidth + 10; // Move to the right for the next word

        // Randomly decide to insert a rectangle
        if (Math.random() < 0.1 && rectIndex < rects.length) { // 10% chance to insert a rectangle
            let rect = rects[rectIndex++];
            let rectDiv = document.createElement('div');
            rectDiv.classList.add('rectangle');
            rectDiv.style.width = `${rect.width-getRandomInt(90)}px`;
            rectDiv.style.height = `${rect.height*1.8}ex`;
            rectDiv.style.position = 'relative';
            // rectDiv.style.left = `${currentX}px`;
            rectDiv.style.top = `${currentY+getRandomInt(5)}px`;
            textContainer.appendChild(rectDiv);

            currentX += rect.width; // Move to the right past the rectangle
        }

        // Check if we need to move to the next line
        if (currentX > containerWidth) {
            currentX = 0; // Reset to start of the next line
            currentY += lineHeight;
        }
    }
}

function getRandomInt(max) {

    if (Math.random() >= 0.9) {

        return Math.floor(Math.random() * max);
    } else {
        return Math.floor(Math.random() * max * -1);

    }
}