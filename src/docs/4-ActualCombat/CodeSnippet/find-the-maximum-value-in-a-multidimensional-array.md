# 找出多维数组最大值？

<article-info/>

1. 找出二维数组，每一项的最大值

   ```jsx
   function fnArr(arr) {
     let newArr = [];
     arr.forEach((item, index) => {
       newArr.push(Math.max(...item));
     });
     return newArr;
   }
   console.log(
     fnArr([
       [4, 5, 1, 3],
       [14, 25, 31, 23],
       [34, 56, 41, 39],
       [1034, 156, 4111, 329]
     ])
   );
   ```

2. 找出多维数组所有元素中的最大值和最小值

   ```jsx
   let arr = [12, 5, [10, 11, 14, [15, 17, 18, [19, 20, 30, 4]], 13], 6, 9];
   //调用flat方法，数组扁平化
   let newArr = arr.flat(Infinity); // 如果不确定数组有多少层，也可以给一个无穷大Infinity，则全部扁平化，变成一维数组。
   //求最大值和下标。
   let max = Math.max(...newArr);
   let maxindex = newArr.indexOf(max);
   console.log(max, maxindex); //最大值30,下标10
   //求最小值和下标。
   let min = Math.min(...newArr);
   let minindex = newArr.indexOf(min);
   console.log(min, minindex); //最小值4,下标11
   ```
