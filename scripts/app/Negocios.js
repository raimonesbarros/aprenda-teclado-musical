export { showContent, playAudio, grau, notas, dedos1, dedos2, cifras };

const grau = ['1°', '2°', '3°', '4°', '5°', '6°', '7°'];
const notas = ['DÓ', 'DÓ+ ou RÉ-', 'RÉ', 'RÉ+ ou MÍ-', 'MÍ', 'FÁ', 'FÁ+ ou SOL-', 'SOL', 'SOL+ ou LÁ-', 'LÁ', 'LÁ+ ou SÍ-', 'SÍ'];
const dedos1 = ['1-E', '2-E', '3-E', '4-E', '5-E'];
const dedos2 = ['1-D', '2-D', '3-D', '4-D', '5-D'];
const cifras = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C# ou Db', 'D# ou Eb', 'F# ou Gb', 'G# ou Ab', 'A# ou Bb'];

function showContent(local, content, dataAudio, octave){
  const H1 = document.querySelector(`${local} h1`);
  H1.innerHTML = content;
  playAudio(dataAudio, octave)
}



//Audio Piano
function playAudio(dataAudio, octave){
  let audio = new Audio(`audio/piano-mp3/${dataAudio}${octave}.mp3`);
  audio.play()
}
