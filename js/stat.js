'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;

var FONT_GAP = 20;

var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var BAR_GAP = 50;

var BORDER_SIZE = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var normalizeTimes = function (times) {

  var maxResult = times[0];
  for (var j = 0; j < times.length; j++) {
    if (times[j] > maxResult) {
      maxResult = times[j];
    }
  }

  var normTimes = [];
  for (j = 0; j < times.length; j++) {
    normTimes[j] = times[j] * BAR_MAX_HEIGHT / maxResult;
  }

  return normTimes;
};

var renderBar = function (ctx, x, name, time, normTime) {

  // write player name
  ctx.fillStyle = '#000';
  var yName = CLOUD_Y + CLOUD_HEIGHT - BORDER_SIZE + FONT_GAP;
  ctx.fillText(name, x, yName);

  // render player bar
  if (name === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
  }

  var yBar = CLOUD_Y + CLOUD_HEIGHT - BORDER_SIZE - normTime;
  ctx.fillRect(x, yBar, BAR_WIDTH, normTime);

  // write player score above bar
  ctx.fillStyle = '#000';
  var yScore = yBar - GAP;
  ctx.fillText(Math.round(time), x, yScore);
};

window.renderStatistics = function (ctx, names, times) {

  // render shadow of cloud
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');

  // render white cloud
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  // write congratulations
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + BORDER_SIZE, CLOUD_Y + BORDER_SIZE - FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + BORDER_SIZE, CLOUD_Y + BORDER_SIZE);

  // render graph
  var normTimes = normalizeTimes(times);
  for (var i = 0; i < names.length; i++) {
    renderBar(ctx, CLOUD_X + BORDER_SIZE + (BAR_GAP + BAR_WIDTH) * i, names[i], times[i], normTimes[i]);
  }
};
