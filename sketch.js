let capture;
let mode = "1";
let txt = "一二三四五田雷電龕龘";

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕
  capture = createCapture(VIDEO, function() {
    console.log("攝影機已就緒");
  });
  capture.size(windowWidth, windowHeight); // 配合全螢幕
  capture.hide();
  textAlign(CENTER, CENTER);
}

// 視窗大小改變時自動調整
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth, windowHeight);
}

function keyPressed() {
  mode = key;
}

function draw() {
  background(0);

  // 攝影機還沒準備好就跳過，避免全黑
  if (capture.width === 0) return;

  capture.loadPixels();

  let span = int(map(mouseX, 0, width, 4, 30));

  push();
  translate(width, 0);
  scale(-1, 1);

  for (let y = 0; y < height; y += span) {
    for (let x = 0; x < width; x += span) {
      let index = (y * capture.width + x) * 4; // 用 capture.width 避免尺寸不一致
      if (index >= capture.pixels.length) continue;

      let r = capture.pixels[index];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];
      let bk = (r + g + b) / 3;

      noStroke();

      if (mode == "1") {
        let s = map(bk, 0, 255, 0, span);
        fill(r, g, b);
        rect(x, y, s * 0.9, s * 0.9);

      } else if (mode == "2") {
        let s = map(bk, 0, 255, 0, span);
        fill(bk);
        ellipse(x + span / 2, y + span / 2, s, s);

      } else if (mode == "3") {
        let bkId = int(map(bk, 0, 255, 9, 0));
        fill(r, g, b);
        textSize(span);
        text(txt[bkId], x + span / 2, y + span / 2);
      }
    }
  }
  pop();
}