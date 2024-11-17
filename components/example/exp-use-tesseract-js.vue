<template>
  <el-upload
    class="upload-demo"
    drag
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    multiple
    :http-request="handleUpload"
    :auto-upload="true"
    :limit="1"
    :on-remove="handleRemove"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <!--  -->
  </el-upload>
  <div>
    <img
      ref="img"
      alt=""
    >
  </div>
  <div class="tesseractBtn">
    <el-button
      :disabled="tesseractLoading"
      type="success"
      @click="tesseractImg"
    >
      识别文字
    </el-button>
  </div>
  <div id="result"></div>
</template>

<script setup>
// 从 Tesseract 库中解构出 createWorker 函数
import { createWorker } from "tesseract.js";
import { UploadFilled } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue';

const tesseractLoading = ref(true)
const img = ref(null)

function handleRemove() {
  if (img && img.value) {
    img.value.src = ''
    document.querySelector('#result').innerHTML = ''
    tesseractLoading.value = true
  }
}
function displayBase64(base64String) {
  if (img && img.value) {
    img.value.src = base64String
    tesseractLoading.value = false
  }
}

async function tesseractImg() {
  if (!(img && img.value && img.value.src)) return
  tesseractLoading.value = true
  const worker = await createWorker('chi_sim')
  const result = await worker.recognize(img.value)
  console.log(result.data.text)
  document.querySelector('#result').innerHTML = result.data.text
  worker.terminate()
  tesseractLoading.value = false
}
async function handleUpload(fileObj) {
  if (!(fileObj && fileObj.file)) return
  const reader = new FileReader();
  reader.onload = function (e) {
    const base64String = e.target.result;
    displayBase64(base64String);
  };
  reader.readAsDataURL(fileObj.file);
}
onMounted(() => {

});
</script>

<style>
.tesseractBtn {
  text-align: center;
  margin: 10px 0 15px;
}
</style>