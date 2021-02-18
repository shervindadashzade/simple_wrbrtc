const myVideo = document.getElementById('myVideo');
const remoteVideo = document.getElementById('remoteVideo');
const myId = document.getElementById('myId');
const callBtn = document.getElementById('call');
const hangoutBtn = document.getElementById('hangout');
const remoteId = document.getElementById('remoteId');
const peer = new Peer({
    config: {'iceServers': [
      { url: 'stun:stun.l.google.com:19302' },
    ]} /* Sample servers, please use appropriate ones */
  });;
var isCalle = false;
var connection = null;
var call_confirm;
var stream;
const constraints = {
    audio : true,
    video : true
};



async function init(){
    try{
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        myVideo.srcObject = stream;
    }catch(e){
        console.log(e);
    }
}
init();

peer.on('open',(id) =>{
    myId.innerHTML = `your id is : ${id}`;
})

callBtn.addEventListener('click',() => {
    if(remoteId.value){
        console.log('connection is establishing');
        call = peer.call(remoteId.value,stream);
        call.on('stream',function(stream){
            remoteVideo.srcObject = stream;
        })
    }else{
        alert("please enter an id");
    }
})

peer.on('call',function(call){
    call_confirm = confirm('you have a call, do you wanna answer that?');
    isCalle = true;
    callMedia = call;

    call.on('stream',function(stream){
        remoteVideo.srcObject = stream;
    })

    if(call_confirm){
        call.answer(stream);
    }
})

