export default (Vue) => {
  Vue.directive('getThis', (el) => {
    el.onclick = function () {
      alert('OK')
    }
  })
  Vue.directive('fileUpload', (el, binding, vnode, oldVnode) => {
    // el代表当前指令所在位置的节点对象  button
    var data = binding.value// 拿到了组件传过来的参数
    // 1.创建input file 文件上传表单
    createNode(data) 
    function createNode (data) {
      // 创建节点
      // <input type="file" multiple/> 
      var node = document.createElement('input')
      node.type = 'file'
      // 限制上传类型必会
      node.accept = ' image/jpeg, image/png, image/jpg'
      // 设置是否多张上传 false
      node.multiple = data.multiple ? 'multiple' : ''
      node.style.display = 'none'
      // 把当前创建file input节点对象 放入 指令节点之间
      el.prepend(node)
      // 调用 button节点下面 input_file的onclick方法,自动弹出文件上传框
      el.onclick = function () {
        el.children[0].click()
      }
    }
    // 告一段落
    // 当file文件表单内容发生变化
    // 选中 button>input_file表单
    var inputFile = el.children[0]
  
    inputFile.onchange = function (event) {
      // 当用户上传图片了,拿到事件对象
      var event = event || window.event
      // 在事件对象下面去求  file文件对象
      var file = event.target.files[0]
         
      // 去调用当前组件组件里面 
      var fn = data.fn // fileUpload
      // vnode.context.fileUpload(window.URL.createObjectURL(file))
      vnode.context[fn](window.URL.createObjectURL(file))
    }
  })
//   验证手机号码
//   验证规则：11位数字，以1开头。
// function
// checkMobile(str) {
//   var re = /^1\d{10}$/
//   if (re.test(str)) {
//     alert("正确");
//   } else {
//     alert("错误");
//   }
// }
// 账号不能少于6-15位
// function checkUser (str) {
//   var re = /^[a-zA-z]\w{6,15}$/
//   if (re.test(str)) {
//     // alert('正确')
//   } else {
//     // alert('错误')
//   }
// }
//   验证电话号码
//   验证规则：区号+号码，区号以0开头，3位或4位
//   号码由7位或8位数字组成
//   区号与号码之间可以无连接符，也可以“-”连接
//   如01088888888,010-88888888,0955-7777777
//
//   function
//   checkPhone(str){
//     var re = /^0\d{2,3}-?\d{7,8}$/;
//     if(re.test(str)){
//       alert("正确");
//     }else{
//       alert("错误");
//     }
//   }
//   验证邮箱
//   验证规则：姑且把邮箱地址分成“第一部分@第二部分”这样
//   第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
// 第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
// 而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位
//   function
//   checkEmail(str){
//     var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
//     if(re.test(str)){
//       alert("正确");
//     }else{
//       alert("错误");
//     }
//   }
//   验证用户密码:/^[a-zA-Z]\w{5,17}$/ 正确格式为：以字母开头，长度在6-18之间，只能包含字符、数字和下划线。
//   ^([\u4e00-\u9fa5\]{1,20}|[a-zA-Z\\s]{1,20})$  姓名只能由汉字（包括中文的·）或英文组成（包括英文的.和空格）!
}
