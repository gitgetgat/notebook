<template>
  <div
    class="svg-main"
    v-if="type === 'rect'"
  >
    <svg
      width="220"
      height="220"
    >
      <!-- x:水平坐标轴 -->
      <!-- y：垂直坐标轴 -->
      <!-- rx：矩形圆角是以r为半径画圆 -->
      <!-- fill="nono"：无填充颜色 -->
      <rect
        x="5"
        y="5"
        width="200"
        height="200"
        fill="none"
        stroke="green"
        stroke-width="5"
        rx="5"
      ></rect>
    </svg>
  </div>
  <div
    class="svg-main"
    v-if="type === 'circle'"
  >
    <svg
      width="500"
      height="340"
    >
      <!-- 绘制圆形：使用circle  还可以使用rect标签结合圆角的值实现圆形或椭圆形的绘制 -->
      <!-- cx:圆形的中心点x轴坐标 -->
      <!-- cy:圆形的中心点y轴坐标 -->
      <!-- r:圆的半径 -->
      <!-- fill-opacity设置填充的透明度 -->
      <!-- stroke-opacity设置线条得透明度 -->
      <!-- 绘制圆形circle -->
      <circle
        cx="380"
        cy="200"
        r="100"
        fill="red"
        stroke="green"
        stroke-width="10"
        stroke-opacity="0.3"
      ></circle>
      <!-- 绘制椭圆ellipse -->
      <ellipse
        cx="200"
        cy="100"
        rx="108"
        ry="50"
      ></ellipse>
    </svg>
  </div>
  <div
    class="svg-main"
    v-if="type === 'line'"
  >
    <svg
      width="200"
      height="200"
    >
      <!-- 绘制折线 polyline 多段线-->
      <polyline
        points="20,0,20,120,70,120"
        stroke="green"
        stroke-width="5"
        fill="none"
      ></polyline>
    </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <!-- x1 属性在 x 轴定义线条的开始-->
      <!-- y1 属性在 y 轴定义线条的开始-->
      <!-- x2 属性在 x 轴定义线条的结束-->
      <!-- y2 属性在 y 轴定义线条的结束-->
      <line
        x1="0"
        y1="0"
        x2="200"
        y2="200"
        style="stroke:rgb(255,0,0);stroke-width:5"
      />
    </svg>
  </div>
  <div
    class="svg-main"
    v-if="type === 'animate1'"
  >
    <svg
      width="200"
      height="200"
    >
      <circle
        cx="100"
        cy="100"
        r="5"
      >
        <animate
          attributeName="r"
          repeatCount="indefinite"
          attributeType="XML"
          from="0"
          to="100"
          dur="5"
          fill="freeze"
        ></animate>
        <animate
          attributeName="fill"
          attributeType="XML"
          from="red"
          to="green"
          dur="5"
          fill="freeze"
        />
      </circle>
    </svg>
  </div>
  <div
    class="svg-main"
    v-if="type === 'animate2'"
  >
    <svg
      width="800"
      height="300"
    >
      <circle
        cx="150"
        cy="150"
        r="50"
      >
        <!-- 点击后动画开始执行 -->
        <animate
          attributeName="r"
          repeatCount="indefinite"
          attributeType="XML"
          from="0"
          to="100"
          begin="click"
          dur="5"
          fill="freeze"
        ></animate>
        <animate
          attributeName="fill"
          attributeType="XML"
          from="red"
          to="green"
          begin="3"
          dur="5"
          fill="freeze"
        ></animate>
        <animate
          id="to"
          attributeName="cx"
          attributeType="XML"
          from="100"
          to="500"
          begin="click"
          dur="5"
          fill="freeze"
        ></animate>
        <animate
          id="toLeft"
          attributeName="cx"
          attributeType="XML"
          from="500"
          to="100"
          begin="to.end"
          dur="5"
          fill="freeze"
        ></animate>
      </circle>
    </svg>
  </div>
  <div
    class="svg-main"
    v-if="type === 'animate3'"
  >
    <svg
      width="500"
      height="350"
      viewBox="-100 -100 500 350"
    >
      <path
        d="M0 0 c0 300 300 300 300 0"
        stroke="red"
        stroke-width="2"
        fill="none"
      ></path>
      <rect
        x="0"
        y="0"
        width="40"
        height="40"
        fill="lightgreen"
      >
        <animateMotion
          path="M0 0 c0 300 300 300 300 0"
          dur="5s"
          begin="click"
          fill="freeze"
          rotate="auto"
        />
      </rect>
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  type: String,
})
</script>

<style scoped>
.svg-main {
  margin: 0 auto;
}
.svg-main svg {
  margin: 0 auto;
}
</style>