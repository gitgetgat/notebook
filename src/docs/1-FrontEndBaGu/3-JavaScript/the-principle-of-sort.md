# sort 的原理

<article-info/>

::: code-group

```js
var arr = [];
arr.sort(); //默认排序
arr.sort(comparefn(a, b)); //自定义排序比较方法
```

:::

当没有参数传入的时候，其排序顺序默认为，将待排序数据转换为字符串，并按照 Unicode 序列排序；当然，比较函数可以自定义，自定义排序函数需要返回值，其返回值为-1，0，1，分别表示 a<b, a=b, a>b.

## sort 的原理

js 提供了 sort 方法，方便对数组进行排序，然而不同引擎对 js 的 sort 方法解析可能存在差异，本文基于 v8 引擎进行分析。

<link-tag :linkList="[{ linkType: 'git', linkText:'V8 引擎排序源码',linkUrl:'https://link.zhihu.com/?target=https%3A//github.com/v8/v8/blob/ad82a40509c5b5b4680d4299c8f08d6c6d31af3c/src/js/array.js'}]" />

之前的版本是：<link-tag :linkList="[{ linkText:'插入排序和快速排序',linkUrl:'https://www.cnblogs.com/Renyi-Fan/p/12515283.html#_label1'}]" />（**V8 引擎 sort 函数只给出了两种排序 InsertionSort 和 QuickSort，数量小于 10 的数组使用 InsertionSort，长度超过 10 使用 QuickSort**），现在是冒泡排序

原理实现链接：<link-tag :linkList="[{ linkType: 'git', linkText:'原理实现',linkUrl:'https://github.com/v8/v8/blob/ad82a40509c5b5b4680d4299c8f08d6c6d31af3c/src/js/array.js'}]" />

### 插入排序：

::: code-group

```js
// v8源码
function InsertionSort(a, from, to) {
  for (var i = from + 1; i < to; i++) {
    var element = a[i];
    for (var j = i - 1; j >= from; j--) {
      var tmp = a[j];
      var order = comparefn(tmp, element);
      if (order > 0) {
        a[j + 1] = tmp;
      } else {
        break;
      }
    }
    a[j + 1] = element;
  }
}

// a表示数组，from表示数组开始排序的位置下标，to表示数组结束位置下标。根据上述代码，var arr=[7,3,5,2,4], 那么arr.sort()排序过程如下：
// 7 3 5 2 4
// 3 7 5 2 4
// 3 5 7 2 4
// 2 3 5 7 4
// 2 3 4 5 7
// 虽然插入排序的复杂度是n^2，但是由于数据量很小，因此是常量的复杂度，效率很高，而且插入排序是一个稳定的排序算法。
```

:::

### 快速排序：

::: code-group

```js
// v8源码
function GetThirdIndex(a, from, to) {
  //获取关键值
  var t_array = new InternalArray();
  // Use both 'from' and 'to' to determine the pivot candidates.
  var increment = 200 + ((to - from) & 15);
  var j = 0;
  from += 1;
  to -= 1;
  for (var i = from; i < to; i += increment) {
    t_array[j] = [i, a[i]];
    j++;
  }
  t_array.sort(function (a, b) {
    return comparefn(a[1], b[1]);
  });
  var third_index = t_array[t_array.length >> 1][0];
  return third_index;
}

function QuickSort(a, from, to) {
  var third_index = 0;
  while (true) {
    // Insertion sort is faster for short arrays.
    if (to - from <= 10) {
      //数组长度小于等于10的时候，插入排序
      InsertionSort(a, from, to);
      return;
    }
    if (to - from > 1000) {
      //数组长度大于1000的时候，获取关键值
      third_index = GetThirdIndex(a, from, to);
    } else {
      //长度大于10小于等于1000的时候，取数组中间的元素作为关键值
      third_index = from + ((to - from) >> 1);
    }
    // Find a pivot as the median of first, last and middle element.
    var v0 = a[from];
    var v1 = a[to - 1];
    var v2 = a[third_index];
    var c01 = comparefn(v0, v1);
    if (c01 > 0) {
      // v1 < v0, so swap them.
      var tmp = v0;
      v0 = v1;
      v1 = tmp;
    } // v0 <= v1.
    var c02 = comparefn(v0, v2);
    if (c02 >= 0) {
      // v2 <= v0 <= v1.
      var tmp = v0;
      v0 = v2;
      v2 = v1;
      v1 = tmp;
    } else {
      // v0 <= v1 && v0 < v2
      var c12 = comparefn(v1, v2);
      if (c12 > 0) {
        // v0 <= v2 < v1
        var tmp = v1;
        v1 = v2;
        v2 = tmp;
      }
    }
    // v0 <= v1 <= v2
    a[from] = v0;
    a[to - 1] = v2;
    var pivot = v1;
    var low_end = from + 1; // Upper bound of elements lower than pivot.
    var high_start = to - 1; // Lower bound of elements greater than pivot.
    a[third_index] = a[low_end];
    a[low_end] = pivot;

    // From low_end to i are elements equal to pivot.
    // From i to high_start are elements that haven't been compared yet.
    partition: for (var i = low_end + 1; i < high_start; i++) {
      var element = a[i];
      var order = comparefn(element, pivot);
      if (order < 0) {
        a[i] = a[low_end];
        a[low_end] = element;
        low_end++;
      } else if (order > 0) {
        do {
          high_start--;
          if (high_start == i) break partition;
          var top_elem = a[high_start];
          order = comparefn(top_elem, pivot);
        } while (order > 0);
        a[i] = a[high_start];
        a[high_start] = element;
        if (order < 0) {
          element = a[i];
          a[i] = a[low_end];
          a[low_end] = element;
          low_end++;
        }
      }
    }
    if (to - high_start < low_end - from) {
      QuickSort(a, high_start, to);
      to = low_end;
    } else {
      QuickSort(a, from, low_end);
      from = high_start;
    }
  }
}
```

:::

可见，v8 的 sort 对于长度大于 1000 的数组，采用的是 **`快排与插入排序混合`** 的方式进行排序的，因为，当数据量很小的时候，插入排序效率优于快排。

快排需要选择一个关键值，并且以关键值作为基准开始排序，比关键值的值大的放在关键值右边，小的放在关键值左边，由此完成一趟排序；然后再对关键值左侧的数据以及右侧的数据分别执行快排。如果每次关键字选择都是一组数据的最小值或者最大值，那么快排的复杂度将会达到 n^2，就跟冒泡没什么区别了。在快排算法中，最优的关键值，是这组数据最中间位置的值，这样才能可以使得排序算法复杂度达到 nlogn， 因此，关键值的选择尤为重要。

### v8 快排`关键值`的获取

- 获取临时`关键值 tmp`：
  1.  对于大于 `10` 小于等于 `1000` 的数据量，`tmp` 为这组数据中间位置的值
  2.  对于大于 `1000` 的数据，根据一定步长从待排序的数组里面获取一组临时数据，对临时数据排序，再获得临时数据中最中间位置的值，作为待排序数组的 `tmp`。步长的计算跟数组的长度有关系，其计算方法如下：<imp-text-warning>_步长 = 200 + 数组长度&15;_</imp-text-warning>
  3.  将数组的长度转换为二进制后，与 `1111` 按位与，其结果与 `200` 相加，作为步长。
- 计算关键值 `key`：获取数组第一个数 `a0`, 最后一个数 `an`；比较 `a0`, `tmp`, `an`, 赋值给 `v0`, `v1`, `v2`, 保证 `v0<=v1<=v2`; 关键值 = `v1`.
  通过对关键值的选取，能最大程度保证快排的复杂度趋近于平均复杂度，即 `nlogn`.

### 排序流程

例如：`var arr=[3,6,2,7,9,23,5,13,12,6,73,34,55,22,34]`，`arr.sort()` 排序流程如下

- 第一趟排序：

  - 数组长度为 `15`，获取临时关键值 `tmp=(15-0)>>1+0=7`；
  - `a0 = arr[0] = 3`, `an = arr[14] = 34`, `tmp = arr[7] = 13`, 因此 `v0 = 3`, `v1 = 13`, `v2 = 34`, 因此 `key = 13`；
  - 排序结果：`3,2,7,9,6,12,5,6,13,23,73,34,55,22,34`，小于 `13` 的都在其左侧，大于 `13` 的都在其右侧；

- 第二趟排序：分别对 `13` 左侧的数据，及 `13` 右侧的数据调用快排方法；由于 `13` 左侧及右侧数据量都小于 `10`，因此会调用插入排序，因此接下来排序结果如下：

  - `13` 左侧：

    ::: code-group

    ```text
    2,3,7,9,6,12,5,6
    2,3,7,9,6,12,5,6
    2,3,7,9,6,12,5,6
    2,3,6,7,9,12,5,6
    2,3,6,7,9,12,5,6
    2,3,5,6,7,9,12,6
    2,3,5,6,6,7,9,12
    ```

    :::

  - 13 右侧:

    ::: code-group

    ```text
    23,73,34,55,22,34
    23,34,73,55,22,34
    23,34,55,73,22,34
    22,23,34,55,73,34
    22,23,34,34,55,73
    ```

    :::

  - 最终结果 `2,3,5,6,6,7,9,12,13,22,23,34,34,55,73`
    快排的 <imp-text-warning>平均时间复杂度</imp-text-warning> 是 `nlogn`，在排序算法中属于效率最高的。快排是一种不稳定的排序算法，但是一般情况下稳定或者不稳定对我们没有特别大的影响，但是对稳定性要求高的排序，就不能使用快排了。
