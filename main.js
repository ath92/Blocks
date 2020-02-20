function setup() {
	createCanvas(windowWidth, windowHeight);
	// colorMode(HSL, 255);
}

function draw() {
	background(255);
    fill(255, 255, 255);
    strokeWeight(5);
    const rx = mouseX / windowWidth; // 0. - 1.
    const ry = mouseY / windowHeight; // 0. - 1.

    const adjacentRectangles = splitRect([0, 0, windowWidth, windowHeight], rx, ry);
    adjacentRectangles.forEach(([ x1, y1, x2, y2 ]) => {
        rect(x1, y1, x2, y2);
    });

    for (let i = 0; i < 20; i++) {
        // stroke(Math.random() * 255, Math.random() * 255, Math.random() * 255)
        let max = 0;
        let index;
        adjacentRectangles.forEach((rectangle, i) => {
            const [x1, y1, x2, y2] = rectangle;
            const size = (x2 - x1) * (y2 - y1);
            if (size >= max) {
                max = size;
                index = i;
            }
        });
        const largest = adjacentRectangles[index];
        const newRects = splitRect(largest, 0.5, 0.5);
        adjacentRectangles[index] = newRects[3 - index];
        newRects.forEach(([ x1, y1, x2, y2 ]) => {
            rect(x1, y1, x2 - x1, y2 - y1);
        });
    }
}

function splitRect(rect, rx, ry) {
    const [x1, y1, x2, y2] = rect;
    const w = x2 - x1;
    const h = y2 - y1;
    const newMiddleX = x1 + rx * w;
    const newMiddleY = y1 + ry * h;
    const topLeft     = [x1         , y1,
                         newMiddleX , newMiddleY];

    const topRight    = [newMiddleX, y1,
                         x2        , newMiddleY];

    const bottomLeft  = [x1        , newMiddleY,
                         newMiddleX, y2];

    const bottomRight = [newMiddleX, newMiddleY,
                         x2        , y2];
    // console.log(...topLeft, '\n', ...topRight, '\n', ...bottomLeft, '\n', ...bottomRight);
    return [topLeft, topRight, bottomLeft, bottomRight];
}

function recursiveBlocks(rx, ry, maxDepth, currentDepth = 0) {
    if (currentDepth > maxDepth) return;
    return recursiveBlocks(rx, ry, maxDepth, currentDepth + 1);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}