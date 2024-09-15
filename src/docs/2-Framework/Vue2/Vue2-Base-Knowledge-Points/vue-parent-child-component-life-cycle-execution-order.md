# Vue 父子组件生命周期执行顺序

<article-info/>

## 执行顺序

`父 beforeCreate`

        ⬇️

`父 created`

        ⬇️

`父 beforeMount`

        ⬇️

`子 beforeCreate`

        ⬇️

`子 created`

        ⬇️

`子 beforeMount`

        ⬇️

`子 mounted`

        ⬇️

`父 mounted`
