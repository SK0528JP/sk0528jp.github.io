document.getElementById('logo').addEventListener('click', function() {
  console.log("Logo clicked"); // クリックされたことをコンソールに表示
  var audio = document.getElementById('audio');
  audio.play(); // 音声を再生
});
