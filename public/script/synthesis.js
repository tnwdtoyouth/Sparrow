const synth = window.speechSynthesis;

const inputForm = document.querySelector('form');
const inputTxt = document.querySelector('.text');
const voicesList = document.querySelector('select');

const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('.value--pitch-value');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('.value--rate-value');

let voices = [];

window.onbeforeunload = function() {
  synth.cancel();
};

function populateVoiceList() {
  voices = synth.getVoices();
  const selectedIndex =
    voicesList.selectedIndex < 0 ? 0 : voicesList.selectedIndex;
  voicesList.innerHTML = '';
  for (i = 0; i < voices.length; i++) {
    const option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
   
    if (voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voicesList.appendChild(option);
  }
  voicesList.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak() {
  if (synth.speaking) {
    console.error('speechSynthesis.speaking');
    synth.cancel();
    setTimeout(speak, 300);
  } else if (inputTxt.value !== '') {
    const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    utterThis.onend = function(event) {
      console.log('SpeechSynthesisUtterance.onend');
    };
    utterThis.onerror = function(event) {
      console.error('SpeechSynthesisUtterance.onerror');
    };
    const selectedOption = voicesList.selectedOptions[0].getAttribute(
      'data-name'
    );
    for (i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }

    utterThis.onpause = function(event) {
      const char = event.utterance.text.charAt(event.charIndex);
      console.log(
        'Speech paused at character ' +
          event.charIndex +
          ' of "' +
          event.utterance.text +
          '", which is "' +
          char +
          '".'
      );
    };

    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}

inputForm.onsubmit = function(event) {
  event.preventDefault();

  speak();

  inputTxt.blur();
};

pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
};

rate.onchange = function() {
  rateValue.textContent = rate.value;
};

voicesList.onchange = function() {
  speak();
};