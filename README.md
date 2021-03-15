#### 权限指令使用方式

main.js引入

```

// 自定义指令
import perdirjs from 'perdirjs'

// 添加默认判断方法
// 判断是否无读权限
perdirjs.isNoRead = (id) => {
  return ![15].includes(id)
}
// 判断是否无写权限
perdirjs.isNoSet = (id) => {
  return ![1, 2, 3, 4].includes(id)
}
Vue.directive("perdir", perdirjs.directive)
```

#### 组件内使用

此指令接收一个数组传参 第一个传参是判断类型(read-读、set-写) 第二个传参是当前模块的权限id

添加custom后缀时，第一个参数不变，第二个传参接受一个boolean值(无权限时传true)

home.vue

```
<template>
  <div class="test jk-style" @click.stop>
    <div v-perdir.custom="['set',perTestFun(1111)]">1111</div><br>
    <div v-perdir="['read',perid]">222</div><br>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      perid: 15,
      showHtml: false // 展示页面 因为权限使用自定义指令做的配置 接口还没返回结果页面就进行了渲染 就调用了       inserted函数 首次判断就不正确 所以当数据返回时再进行渲染
    }
  },
  methods: {
    // 自定义指令方法 有权限返回false 无权限返回true
    perTestFun (id) {
      return id > 5
    }
  },
}
</script>


```

## 注意事项

1. 此权限指令 inserted函数只在被绑定元素插入父节点时调用。（父节点存在即可调用，不必存在于 document 中）。 所以当在查询完权限接口之后再渲染页面。
2. 一定要配置默认的读写判断函数，函数内 判断为无权限时返回true
