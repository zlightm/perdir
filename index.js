
const directiveObj = {
  // 判断是否无写权限
  // isNoSet: (id) => {
  //   return ![1, 2, 3].includes(id)
  // },
  // // 判断是否无读权限
  // isNoRead: (id) => {
  //   return ![1, 2, 3, 4, 5].includes(id)
  // },
  directive: {
    inserted: (el, bind) => {
      if (typeof directiveObj.isNoSet !== "function" || typeof directiveObj.isNoRead !== "function") {
        console.error("请先配置权限判断函数！")
        return
      }
      if (bind.modifiers.custom ) {
        if(bind.value[1]){
          if (bind.value[0] === "set") {
            el.style = "pointer-events:none!important;opacity:0.4!important;"
          }
          if (bind.value[0] === "read") {
            el.parentNode.removeChild(el)
          }
        }
      } else {
        if (bind.value[0] === "set" && directiveObj.isNoSet(bind.value[1])) {
          el.style = "pointer-events:none!important;opacity:0.4!important;"
        }
        if (bind.value[0] === "read" && directiveObj.isNoRead(bind.value[1])) {
          el.parentNode.removeChild(el)
        }
      }
    }
  }
}
export default directiveObj