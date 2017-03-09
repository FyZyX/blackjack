var masteryProgressBar, splitHandsProgressBar, softHandsProgressBar, hardHandsProgressBar;

var CircularProgressBar = function (id, outerRadius, offset, color) {
    this.ctx = $('#' + id)[0].getContext('2d');
    this.ctx.canvas.setAttribute('width', (2 * outerRadius + 20).toString());
    this.ctx.canvas.setAttribute('height', (2 * outerRadius + 20).toString());
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
    this.startPosition = -Math.PI/2;
    this.currentValue = 0;
    this.maxValue = 100;
    this.outerRadius = outerRadius;
    this.offset = offset;
    this.color = color;
};

CircularProgressBar.prototype.updateProgress = function (stat) {
    var progressBar = this.ctx, cw = this.width, ch = this.height, start = this.startPosition, color = this.color;
    var newValue = stat;
    this.currentValue = newValue;
    var outerRadius = this.outerRadius, offset = this.offset;
    progressBar.clearRect(0, 0, cw, ch);
    progressBar.save();

    // Outer Circle
    progressBar.beginPath();
    progressBar.fillStyle = '#8c8c8c';
    progressBar.arc(cw/2, ch/2, outerRadius, 0, 2 * Math.PI);
    progressBar.fill();

    progressBar.beginPath();
    progressBar.arc(cw/2, ch/2, outerRadius, 0, 2 * Math.PI);
    progressBar.clip();

    // Outer shadow
    progressBar.beginPath();
    progressBar.strokeStyle = 'black';
    progressBar.lineWidth = 5;
    progressBar.shadowBlur = 25;
    progressBar.shadowColor = 'black';
    progressBar.shadowOffsetX = 0;
    progressBar.shadowOffsetY = 0;
    progressBar.arc(cw/2, ch/2, outerRadius + 3, 0, 2 * Math.PI);
    progressBar.stroke();

    // Progress amount
    progressBar.beginPath();
    progressBar.lineCap = 'round';
    progressBar.strokeStyle = color;
    progressBar.arc(cw/2, ch/2, outerRadius - offset, start, start + newValue/50 * Math.PI);
    progressBar.stroke();

    // Inner Circle
    progressBar.beginPath();
    progressBar.shadowBlur = 0;
    progressBar.fillStyle = '#737373';
    progressBar.arc(cw/2, ch/2, outerRadius - 2*offset, 0, 2 * Math.PI);
    progressBar.closePath();
    progressBar.fill();

    progressBar.beginPath();
    progressBar.arc(cw/2, ch/2, outerRadius - 2*offset, 0, 2 * Math.PI);
    progressBar.clip();

    // Inner shadow
    progressBar.beginPath();
    progressBar.strokeStyle = 'black';
    progressBar.shadowBlur = 15;
    progressBar.shadowColor = 'black';
    progressBar.shadowOffsetX = 0;
    progressBar.shadowOffsetY = 0;
    progressBar.arc(cw/2, ch/2, outerRadius - 2*offset + 5, 0, 2 * Math.PI);
    progressBar.stroke();

    progressBar.textAlign = 'center';
    progressBar.font = (outerRadius*0.4).toString() + 'px verdana';
    progressBar.fillStyle = color;
    progressBar.fillText(round(newValue,1) + '%', cw/2, ch/2 + outerRadius*0.15, cw);

    progressBar.restore()
};

function updateProgressBars() {
    masteryProgressBar.updateProgress(playerStats.mastery);
    splitHandsProgressBar.updateProgress(playerStats.masteryPoints[0]);
    softHandsProgressBar.updateProgress(playerStats.masteryPoints[1]);
    hardHandsProgressBar.updateProgress(playerStats.masteryPoints[2]);
}