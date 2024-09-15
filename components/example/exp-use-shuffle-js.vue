<template>
  <div id="shuffle-page">
    <div class="container">
      <div>
        <el-select
          v-model="value"
          placeholder="Select"
          size="small"
          style="width: 240px"
          @change="changeSorting"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="js-grid my-shuffle">
        <figure
          v-for="image in images"
          :key="image.src"
          class="js-item column"
          :class="image.variant || ''"
          :data-title="image.alt"
        >
          <div
            class="aspect"
            :class="`aspect--${ratio(image.variant)}`"
          >
            <div class="aspect__inner">
              <img
                :src="image.src"
                :alt="image.alt"
              >
            </div>
          </div>
        </figure>
      </div>
    </div>
  </div>
</template>

<script setup>
import Shuffle from 'shufflejs'
import { onMounted, ref } from 'vue'

let shuffle = null

const value = ref('default')

const options = [
  {
    value: 'default',
    label: '默认排序',
  },
  {
    value: 'title',
    label: '标题排序',
  },
  {
    value: 'reverse',
    label: '反转排序',
  },
  {
    value: 'randomize',
    label: '随机排序',
  }
]

const images = [
  {
    alt: 'Mount Bromo, Indonesia',
    src: 'https://images.unsplash.com/uploads/141310026617203b5980d/c86b8baa?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=882e851a008e83b7a80d05bdc96aa817',
  },
  {
    alt: 'Transmission towers in fog, Bled, Slovenia',
    src: 'https://images.unsplash.com/photo-1484402628941-0bb40fc029e7?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=6237e62a10fa079d99b088b0db0144ac',
  },
  {
    alt: 'Tourists on the Canadian coast',
    src: 'https://images.unsplash.com/uploads/1413142095961484763cf/d141726c?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=86dc2dcb74588b338dfbb15d959c5037',
  },
  {
    alt: 'Burj Khalifa, Dubai, United Arab Emirates',
    src: 'https://images.unsplash.com/photo-1465414829459-d228b58caf6e?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=7ab1744fe016fb39feb2972244246359',
  },
  {
    variant: 'row-span',
    alt: 'A foggy Golden Gate Bridge',
    src: 'https://images.unsplash.com/photo-1416184008836-5486f3e2cf58?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=169&fit=crop&s=5f1f1ffba05979d4248cc16d8eb82f0a',
  },
  {
    alt: 'A car crossing a wood bridge in Big Sur',
    src: 'https://images.unsplash.com/photo-1478033394151-c931d5a4bdd6?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=57a00aabcfaa1b04fd268ea3ad4a4cbb',
  },
  {
    variant: 'col-span',
    alt: 'A large sand dune overshadows grasslands',
    src: 'https://images.unsplash.com/photo-1473175494278-d83ed8459089?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=300&h=85&fit=crop&s=fd1cf1e8eddf88ef87015314f85ce3fb',
  },
  {
    alt: 'Epcot center Spaceship Earth',
    src: 'https://images.unsplash.com/photo-1434144893279-2a9fc14e9337?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=d2f930bbb91de7e19e6436f5b03897b0',
  },
  {
    alt: 'Fresh strawberries in outstreched hands',
    src: 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=eda14f45e94e9024f854b1e06708c629',
  },
  {
    alt: 'Fog rushing through the trees in Yosemite Valley',
    src: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=70dabb0dcc604c558245b72f3109bbbb',
  },
  {
    alt: 'The surface of the moon',
    src: 'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=4e19022724205e38e491961f50e47d32',
  },
  {
    alt: 'Austere rhinoceros',
    src: 'https://images.unsplash.com/photo-1430026996702-608b84ce9281?ixlib=rb-0.3.5&q=80&auto=format&crop=entropy&cs=tinysrgb&w=150&h=85&fit=crop&s=363a88755a7b87635641969a8d66f7aa',
  },
]

const ratio = (variant) => {
  if (variant == 'col-span') return '32x9'
  if (variant == 'row-span') return '9x80'
  return '16x9'
}


function sortByTitle(element) {
  return element.dataset.title.toLowerCase();
}

function changeSorting(val) {
  let options = {};
  if (val === 'title') {
    options = {
      by: sortByTitle,
    };
  } else if (val === 'reverse') {
    options = {
      reverse: true
    }
  } else if (val === 'randomize') {
    options = {
      randomize: true
    }
  }

  shuffle.sort(options);
}

onMounted(() => {
  // 创建Shuffle实例并配置选项
  shuffle = new Shuffle(document.querySelector('.my-shuffle'), {
    itemSelector: '.js-item',
    sizer: '.js-sizer',
    buffer: 1,
  })

})

</script>
<style scoped>
/* quick grid */
.container {
  margin: auto;
}

/* Bootstrap-style v3 columns */
.column {
  position: relative;
  float: left;
  min-height: 1px;
  width: 25%;
  padding-left: 4px;
  padding-right: 4px;

  /* Space between tiles */
  margin-top: 8px;
}

.col-span {
  width: 50%;
}

.my-sizer-element {
  width: 8.33333%;
}

/* default styles so shuffle doesn't have to set them (it will if they're missing) */
.my-shuffle {
  position: relative;
  overflow: hidden;
}

/* Ensure images take up the same space when they load */
/* https://vestride.github.io/Shuffle/images */
.aspect {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
}

.aspect__inner {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.aspect--16x9 {
  padding-bottom: 56.25%;
}

.aspect--9x80 {
  padding-bottom: calc(112.5% + 8px);
}

.aspect--32x9 {
  padding-bottom: calc(28.125% - 3px);
}

img {
  display: block;
  width: 100%;

  max-width: none;
  height: 100%;
  object-fit: cover;
}

figure {
  margin: 0;
  padding: 0;
}
</style>
