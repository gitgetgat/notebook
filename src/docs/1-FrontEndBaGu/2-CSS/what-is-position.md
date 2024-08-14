# position 有哪些值？分别是根据什么定位？

<article-info/>

|   取值   |                     作用                     |
| :------: | :------------------------------------------: |
|  static  |               [默认] 没有定位                |
|  fixed   |      固定定位，相对于浏览器窗口进行定位      |
| relative |         相对于自身定位，不脱离文档流         |
| absolute | 相对于第一个有 relative 的父元素，脱离文档流 |

relative 和 absolute 区别：

|     |                   relative                    |                           absolute                           |
| :-: | :-------------------------------------------: | :----------------------------------------------------------: |
|  1  |                 不脱离文档流                  |                          脱离文档流                          |
|  2  |                  相对于自身                   |               相对于第一个有 relative 的父元素               |
|  3  | 如果有 left、right、top、bottom ==》left、top | 如果有 left、right、top、bottom ==》left、right、top、bottom |
