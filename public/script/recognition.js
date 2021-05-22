const fs = require("fs");
let speechRecognition =window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.lang = 'ru-RU';
let textbox = $("#textbox")

let instructions = $("#instructions")
let content = ''
recognition.continuous = true

recognition.onstart = function(){
    instructions.text("Start speaking")
}

recognition.onspeechend = function(){
    instructions.text("no activity")
}
recognition.onerror= function(){
    instructions.text("no recognition")
}

recognition.onresult = function(event){
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript
    content+=(transcript+'. '+'\n')
    textbox.val(content)
}

$("#start-btn").click(function(event){
    if(content.length){
        content+=''
    } 
    recognition.start()
})
$("#stop-btn").click(function(event){
    recognition.stop()
})

$("#save-btn").click(function(event){
    let filename = prompt('enter file name')
    filename = filename+".txt"
    const inf = document.getElementById("textbox")

    fs.writeFile(filename, inf.nodeValue, function(error){
        if(error) throw error ;
        console.log("done")
    })

})
