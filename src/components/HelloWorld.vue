<template>
  <!-- 使用Element UI框架进行界面布局 -->
  <div>
    <!-- 页面上方的标题 -->
    <h1>{{ titletext }}</h1>
    
    <!-- 搜索框：用于输入姓名模糊搜索联系人，@keyup监听键盘事件，实时回传搜索结果 -->
    <el-input @keyup.native="searchPerson()" style="width: 50%" placeholder="输入姓名进行查找" v-model="search"></el-input>
    
    <!-- 联系人列表表格 -->
    <el-table
      :data="Bookdata"
      style="width: 100%"
      :header-cell-style="{textAlign: 'center'}"
      :cell-style="{textAlign: 'center'}">

      <!-- 第一列：联系人姓名 -->
      <el-table-column label="姓名" width="250">
        <template slot-scope="scope">
          <i class="el-icon-user"></i>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <!-- 第二列：联系方式 -->
      <el-table-column label="联系方式" width="1050">
        <template slot-scope="scope">
          <i class="el-icon-phone"></i>
          <span style="margin-left: 10px">{{ scope.row.phone_number }}</span>
        </template>
      </el-table-column>

      <!-- 第三列：操作区，包括编辑和删除操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">

          <!-- 编辑按钮：点击打开编辑对话框，将选中的联系人信息传入 -->
          <el-button size="mini" @click="dialogFormEdit = true,editshow(scope.row.id,scope.row.name,scope.row.phone_number)">编辑</el-button>
          <el-dialog title="编辑联系人" :visible.sync="dialogFormEdit">
            <el-form :model="formLabelEdit" :rules="rules" ref="formLabelEdit" label-width="100px" label-position="right">
              <!-- 姓名输入框 -->
              <el-form-item label="姓　　名：" prop="name">
                    <el-input v-model="formLabelEdit.name" autocomplete="off" clearable></el-input>
                </el-form-item> 
                <!-- 联系方式输入框 -->
                <el-form-item label="联系方式：" prop="phone_number">
                    <el-input v-model="formLabelEdit.phone_number" autocomplete="off" clearable></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <!-- 取消按钮：关闭对话框 -->
              <el-button @click="dialogFormEdit = false">取 消</el-button>
              <!-- 确定按钮：执行更新函数 -->
              <el-button type="primary" @click="editPerson('formLabelEdit')">确 定</el-button>
            </div>
          </el-dialog>

          <!-- 删除按钮：点击弹出确认框，再次确认是否删除 -->
          <el-popover placement="top" :ref="`popover-` + scope.row.id" width="160">
            <p>确定删除该联系人吗</p>
            <div style="text-align: right; margin: 0">
              <!-- 取消删除：关闭弹出框 -->
              <el-button size="mini" type="text" @click=Close_popover(scope.row.id)>取消</el-button>
              <!-- 确认删除：执行删除操作并关闭弹出框 -->
              <el-button type="primary" size="mini" @click=delPerson(scope.row.id)>确定</el-button>
            </div>
            <el-button slot="reference" size="mini" type="danger">删除</el-button>
          </el-popover>

        </template>
      </el-table-column>
    </el-table>

    <!-- 添加联系人按钮，点击打开添加对话框，并清空输入框 -->
    <el-button class="addbutton" size="small" @click="dialogFormAdd = true,resetForm()">添加联系人</el-button>
    <el-dialog title="添加联系人" :visible.sync="dialogFormAdd">
      <el-form :model="formLabelAdd" :rules="rules" ref="formLabelAdd" label-width="100px" label-position="right">
        <!-- 姓名输入框 -->
        <el-form-item label="姓　　名：" prop="name">
          <el-input v-model="formLabelAdd.name" placeholder="请输入联系人姓名" autocomplete="off" clearable></el-input>
        </el-form-item>
        <!-- 联系方式输入框 -->
        <el-form-item label="联系方式：" prop="phone_number">
          <el-input v-model="formLabelAdd.phone_number" placeholder="请输入联系方式" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- 取消按钮：关闭对话框 -->
        <el-button @click="dialogFormAdd = false">取 消</el-button>
        <!-- 确定按钮：执行添加函数 -->
        <el-button type="primary" @click="addPerson('formLabelAdd')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  
  data () {
    return {
      titletext: '通讯录', // 页面标题
      search: '', // 搜索框内容
      Bookdata: [], // 联系人列表数据
      dialogFormEdit: false, // 控制更新模态框的显示
      dialogFormAdd: false, // 控制添加模态框的显示
      formLabelEdit: {
        id: '',
        name: '',
        phone_number: ''
      }, // 更新模态框中的数据
      formLabelAdd: {
        id: '',
        name: '',
        phone_number: ''
      }, // 添加模态框中的数据
      
      // 表单验证规则：姓名和联系方式不能为空，电话需符合格式
      rules: {
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        phone_number: [{ required: true, message: '联系方式不能为空', trigger: 'blur' }, {
          validator: function(rule, value, callback) {
            if (/^((13[0-9])|(14(0|[5-7]|9))|(15([0-3]|[5-9]))|(16(2|[5-7]))|(17[0-8])|(18[0-9])|(19([0-3]|[5-9])))\d{8}$/.test(value) == false) {
              callback(new Error("号码不符合中国大陆手机号段，请检查"));
            } else {
              callback(); // 校验通过
            }
          },
          trigger: "blur"
        }]
      }
    }
  },

  // 页面加载时获取所有联系人数据
  created(){
    const _this = this
    axios.get('/select?Name=').then(function(resp){
      _this.Bookdata = resp.data         
    }) 
  },

  methods: {
    // 查询联系人，支持模糊搜索
    searchPerson() {
      const _this = this
      axios.get('/select?Name=' + _this.search).then(function(resp){
        _this.Bookdata = resp.data
      }).catch(function(error){
        alert("查询失败，请检查远端数据库")
      })
    },

    // 更新联系人信息
    editPerson(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        // 验证通过后发送更新请求
        if (valid) {
          axios.post('/update?ID=' + _this.formLabelEdit.id + '&Name=' + _this.formLabelEdit.name + '&Phone_number=' + _this.formLabelEdit.phone_number)
          .then(function(resp){
            // 更新成功后重新获取联系人数据
            axios.get('/select?Name=' + _this.search).then(function(resp){
              _this.Bookdata = resp.data
            })
            _this.dialogFormEdit = false // 关闭更新模态框
          }).catch(function(error){
            alert("请求失败，请检查远端数据库")
          })         
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    // 删除联系人
    delPerson(id) {
      const _this = this
      this.Close_popover(id) // 关闭弹出框
      axios.post('/del?ID=' + id).then(function(resp){
        alert("已删除");
        axios.get('/select?Name=' + _this.search).then(function(resp){
          _this.Bookdata = resp.data
        })
      }).catch(function(error){
        alert("请求失败，请检查远端数据库")
      })
    },

    // 添加联系人
    addPerson(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        // 验证通过后发送添加请求
        if (valid) {
          axios.post('/add?Name=' + _this.formLabelAdd.name + '&Phone_number=' + _this.formLabelAdd.phone_number)
          .then(function(resp){
            // 添加成功后重新获取联系人数据
            axios.get('/select?Name=' + _this.search).then(function(resp){
              _this.Bookdata = resp.data
            })
            _this.dialogFormAdd = false // 关闭添加模态框
          }).catch(function(error){
            alert("请求失败，请检查远端数据库")
          })         
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    // 关闭弹出框
    Close_popover(id) {
      this.$refs[`popover-` + id].doClose()
    },

    // 显示更新模态框中的原始数据
    editshow(id, name, phone_number) {
      const _this = this
      _this.formLabelEdit.id = id
      _this.formLabelEdit.name = name
      _this.formLabelEdit.phone_number = phone_number
    },

    // 重置添加模态框中的数据
    resetForm() {
      const _this = this
      _this.formLabelAdd.name = ''
      _this.formLabelAdd.phone_number = ''
    }
  }
}
</script>
