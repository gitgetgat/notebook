<template>
  <div class="tone-container">
    <div class="piano-container">
      <h2>优雅钢琴</h2>
      <div id="piano">
        <template
          v-for="note,index in notes"
          :key="note"
        >
          <div
            class="key"
            :data-note="note + octave"
          >
            <span>{{note}}{{octave}}</span>
          </div>
          <div
            v-if="index < 5 && blackKeys.includes(notes[index]+'#')"
            class="key black"
            :data-note="notes[index] + '#' + octave"
          >
            <span>{{notes[index]}}#{{octave}}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as Tone from "tone";
import { onMounted, ref } from 'vue'

// 创建一个 PolySynth，允许同时播放多个音符
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
// 定义音符
const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const octave = 4;
const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];

// 添加事件监听器
function playNote(note) {
  synth.triggerAttack(note);
  document.querySelector(`[data-note="${note}"]`).classList.add('active');
}

function stopNote(note) {
  synth.triggerRelease(note);
  document.querySelector(`[data-note="${note}"]`).classList.remove('active');
}
onMounted(() => {
  const pianoElement = document.getElementById('piano');
  pianoElement.addEventListener('mousedown', async (e) => {
    if (e.target.classList.contains('key')) {
      await Tone.start();
      playNote(e.target.dataset.note);
    }
  });

  pianoElement.addEventListener('mouseup', (e) => {
    if (e.target.classList.contains('key')) {
      stopNote(e.target.dataset.note);
    }
  });

  pianoElement.addEventListener('mouseleave', (e) => {
    if (e.target.classList.contains('key')) {
      stopNote(e.target.dataset.note);
    }
  });

  // 添加触摸事件支持
  pianoElement.addEventListener('touchstart', async (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const key = document.elementFromPoint(touch.clientX, touch.clientY);
    if (key && key.classList.contains('key')) {
      await Tone.start();
      playNote(key.dataset.note);
    }
  }, { passive: false });

  pianoElement.addEventListener('touchend', (e) => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    const key = document.elementFromPoint(touch.clientX, touch.clientY);
    if (key && key.classList.contains('key')) {
      stopNote(key.dataset.note);
    }
  }, { passive: false });
})

</script>
<style scoped>
.tone-container {
  font-family: "Arial", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  color: #333;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
.piano-container {
  background-color: #2c3e50;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}
#piano {
  display: flex;
  justify-content: center;
  background-color: #34495e;
  padding: 10px;
  border-radius: 5px;
}
.key {
  width: 40px;
  height: 150px;
  border: 1px solid #2c3e50;
  margin: 1px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
  background-color: #ecf0f1;
  border-radius: 0 0 5px 5px;
  transition: all 0.1s ease;
}
.key.black {
  background-color: #2c3e50;
  color: #ecf0f1;
  height: 90px;
  width: 25px;
  margin-left: -13px;
  margin-right: -13px;
  z-index: 1;
}
.key:active,
.key.active {
  background-color: #3498db;
  transform: translateY(2px);
}
.key.black:active,
.key.black.active {
  background-color: #2980b9;
}
.key span {
  font-size: 12px;
  padding-bottom: 5px;
  pointer-events: none;
}
h2 {
  text-align: center;
  color: #ecf0f1;
  margin-bottom: 20px;
}
@media (max-width: 600px) {
  .key {
    width: 30px;
    height: 120px;
  }
  .key.black {
    height: 70px;
    width: 20px;
    margin-left: -10px;
    margin-right: -10px;
  }
}
</style>
