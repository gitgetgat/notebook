# Vue 中如何做样式穿透

<article-info/>

1. 让 CSS 只在当前组件生效 `<style scoped>`
2. scss
   - 下载：`npm install sass-loader node-sass —save`
   - `<style lang=’scss’ scoped>`
   - scss 样式穿透：`父元素 /deep/ 子元素`
3. stylus
   - 下载：`npm install sass-loader node-sass —save`
   - `<style lang=’stylus’ scoped>`
   - stylus 样式穿透：`父元素 /deep/ 子元素` 或者 `父元素 >>> 子元素`
