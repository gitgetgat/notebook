# element-ui 怎么做表单验证？

<article-info/>

- `data` 中书写 `rules` 规则，是一个数组，传递到 `el-form` 的 `rules` 属性里，规则里的名字是 `el-form-item` 的 `prop` 属性值。

  ::: code-group

  ```html
  <el-form
    class="apply-form first-form"
    :model="formData"
    :rules="rule"
    ref="form"
  >
    <el-form-item label="姓名" prop="visitorName">
      <el-input
        v-model="formData.visitorName"
        placeholder="请输入姓名"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="cardCode">
      <el-input
        v-model="formData.cardCode"
        :maxlength="18"
        placeholder="请输入身份证号"
        clearable
      ></el-input>
    </el-form-item>
  </el-form>
  ```

  :::

  ::: code-group

  ```js
  data() {
     return {
         formData: {
             visitorName: '',
             cardType: 1,
             cardCode: ''
         },
         rule: {
             visitorName: [
                 {  required: true, message: '请输入姓名', trigger: 'blur' },
                 {  min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
                 {
                          required: true,
                          pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
                          message: '姓名不支持特殊字符',
                          trigger: 'blur'
                 }
            ],
            cardCode: [
                {  required: true, message: '请输入身份证号', trigger: 'blur' },
                {  min: 15, max: 18, message: '请如实填写18位号码，以供学校保卫科核对', trigger: 'blur' },
                {
                     required: true,
                     pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                     message: '请输入正确的身份证号码',
                     trigger: 'blur'
                }
            ]
        }
     }
  }
  ```

  :::

- 在 `el-form-item` 单个添加
  ::: code-group
  ```vue
  <el-form-item
    label="电话号码"
    :prop="phoneNum"
    :rules="[
      { required: true, message: '请输入电话号码', trigger: 'blur' },
      {
        required: true,
        pattern:
          /^((13|14|15|16|17|18)[0-9]{1}\d{8})|((166|199|198)[0-9]{1}\d{7})$/,
        message: '请输入正确的电话号码',
        trigger: 'blur'
      }
    ]"
  >
      <el-input v-model="v.phoneNum" :maxlength="11" placeholder clearable></el-input>
  </el-form-item>
  ```
  :::
- `data` 里自定义校验规则

  ::: code-group

  ```js
  data() {
      let reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,12}$/
      var validateNewPwd = (rule, value, callback) => {
          if (!reg.test(value)) {
              callback(new Error('密码应是6-12位数字、字母或字符！'))
          } else if (this.form.oldPasswd === value) {
              callback(new Error('新密码与旧密码不可一致！'))
          } else {
              callback()
          }
      }
      var validateComfirmPwd = (rule, value, callback) => {
          if (!reg.test(value)) {
              callback(new Error('密码应是6-12位数字、字母或字符！'))
          } else if (this.form.newPasswd !== value) {
              callback(new Error('确认密码与新密码不一致！'))
          } else {
              callback()
          }
      }
      return {
          form: {
              newPasswd: '',
              comfirmPwd: ''
          },
          rules: {
              newPasswd: [
                  {  required: true, message: '请输入新密码', trigger: 'blur' },
                  {  validator: validateNewPwd, trigger: 'blur' }
              ],
              comfirmPwd: [
                  {  required: true, message: '请输入确认密码', trigger: 'blur' },
                  {  validator: validateComfirmPwd, trigger: 'blur' }
              ]
          }
      }
  }
  ```

  :::

  或者 `methods` 里自定义校验规则

  ::: code-group

  ```js
  data() {
      let reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,12}$/
      return {
          form: {
              newPasswd: '',
              comfirmPwd: ''
          },
          rules: {
              newPasswd: [
                  {  required: true, message: '请输入新密码', trigger: 'blur' },
                  {  validator: this.validateNewPwd, trigger: 'blur' }
              ],
              comfirmPwd: [
                  {  required: true, message: '请输入确认密码', trigger: 'blur' },
                  {  validator: this.validateComfirmPwd, trigger: 'blur' }
              ]
          }
      }
  }，
  methods: {
  		validateNewPwd(rule, value, callback) => {
          if (!reg.test(value)) {
              callback(new Error('密码应是6-12位数字、字母或字符！'))
          } else if (this.form.oldPasswd === value) {
              callback(new Error('新密码与旧密码不可一致！'))
          } else {
              callback()
          }
      },
  		validateComfirmPwd(rule, value, callback) => {
          if (!reg.test(value)) {
              callback(new Error('密码应是6-12位数字、字母或字符！'))
          } else if (this.form.newPasswd !== value) {
              callback(new Error('确认密码与新密码不一致！'))
          } else {
              callback()
          }
      }
  }
  ```

  :::
