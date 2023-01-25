'use strict';

var digits = [];
const digitDict = {};

function getEpoch() {
  return Date.now().toString();
}

function createDigit(i) {
  var anim = [10, 11, 12].includes(i) ? 30 : (10-i) * 300;
  var anim2 = Math.floor(anim/2)
  var digit = document.createElement('digit');
  digit.innerHTML = `\
  <flap-top>          <n></n>   </flap-top>\
  <flap-top-flip style="--anim: ${anim}ms;">     <n></n>   </flap-top-flip>\
  <flap-bottom>       <n></n>   </flap-bottom>\
  <flap-bottom-flip style="--anim: ${anim2}ms;">  <n></n>   </flap-bottom-flip>`;
  return digit;
}

function flipDigitTo(digit, currentVal, updatedVal, i) {
  var topFlapNum        = digit.querySelector('flap-top > n'),
      topFlapFlip       = digit.querySelector('flap-top-flip'),
      topFlapFlipNum    = topFlapFlip.querySelector('n'),
      bottomFlapNum     = digit.querySelector('flap-bottom > n'),
      bottomFlapFlip    = digit.querySelector('flap-bottom-flip'),
      bottomFlapFlipNum = bottomFlapFlip.querySelector('n');

  topFlapNum.innerHTML = updatedVal;
  bottomFlapNum.innerHTML = currentVal;

  topFlapFlipNum.innerHTML = currentVal;
  topFlapFlip.style.display = 'block';

  setTimeout(function() {
    topFlapFlip.style.display = 'none';
  }, [10, 11, 12].includes(i) ? 30 : (10-i) * 300);

  setTimeout(function() {
    bottomFlapFlipNum.innerHTML = updatedVal;
    bottomFlapFlip.style.display = 'block';
  }, [10, 11, 12].includes(i) ? 30 : (10-i) * 300);

  setTimeout(function() {
    bottomFlapNum.innerHTML = updatedVal;
    bottomFlapFlip.style.display = 'none';
  }, [10, 11, 12].includes(i) ? 45 : (10-i) * 425);

  digit.setAttribute('current-val', updatedVal);
}

function updateClock() {
  var epoch = getEpoch(),
      currentVal,
      updatedVal,
      i;

  for (i = 0; i < epoch.length; i+=1) {
    currentVal = digits[i].getAttribute('current-val');
    updatedVal = epoch[i];
    if(currentVal !== updatedVal) {
      setTimeout(flipDigitTo, 0, digits[i], currentVal, updatedVal, i);
    }
  }
}

function setupClock() {
  var epoch = getEpoch(),
      digit,
      i;

  for (i = 0; i < epoch.length; i+=1) {
    digit = createDigit(i);
    document.body.appendChild(digit);
    setTimeout(flipDigitTo, 0, digit, null, epoch[i], i);
  }
  digits = document.querySelectorAll('digit');
}

setupClock();
setInterval(updateClock, 1);
