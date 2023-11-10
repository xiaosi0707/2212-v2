<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-table :data="rolesList" style="width: 100%" border>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <!-- 一级 -->
                            <el-row v-for="item in props.row.children">
                                <el-col :span="3">
                                    <el-tag class="custom-tag" closable>{{ item.authName }}</el-tag>
                                </el-col>
                                <el-col :span="21">
                                    <!-- 二级 -->
                                    <el-row v-for="item1 in item.children">
                                        <el-col :span="6">
                                            <el-tag class="custom-tag" type="warning" closable>{{ item1.authName }}</el-tag>
                                        </el-col>
                                        <!-- 二级 -->
                                        <el-col :span="18">
                                            <el-tag class="custom-tag" type="danger" closable
                                                v-for="item2 in item1.children">{{ item2.authName }}</el-tag>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="#" type="index">
                </el-table-column>
                <el-table-column label="角色名称" prop="roleName">
                </el-table-column>
                <el-table-column label="角色描述" prop="roleDesc">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                        <el-button type="danger" icon="el-icon-share" size="mini">删除</el-button>
                        <el-button type="warning" icon="el-icon-delete" size="mini" @click="showRights(scope.row)">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 分配权限模态框 -->
        <el-dialog title="分配权限" :visible.sync="setRightsdialogFormVisible">
            <el-tree :data="rightsList" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="defKeys"
                :props="defaultProps">
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="setRightsdialogFormVisible = false">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 分配权限模态框 -->
    </div>
</template>
<script lang="ts">
export default {
    data() {
        return {
            rolesList: [],
            setRightsdialogFormVisible: false,
            rightsList: [],
            data: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'authName'
            },
            defKeys: []
        }
    },
    created() {
        this.$http.get('roles').then(res => {
            console.log(res)
            let { data, meta } = res.data
            this.rolesList = data
           
        })
    },
    methods: {
        showRights(role) {
            this.defKeys = []
            this.setRightsdialogFormVisible = true
            // 树形权限数据请求
            this.$http.get('rights/tree').then(res => {
                console.log(res)
                let { data, meta } = res.data
                this.rightsList = data
            })
            this.getTreeItem(role)
            // for(let i = 0; i < role.children.length; i++) {
            //     console.log('当前角色的权限：', role.children[i])
            //     this.defKeys.push(role.children[i].id)
            //     for(let j = 0; j < role.children[i].children.length; j++) {
            //         console.log('当前角色的二级全选', role.children[i].children[j])
            //         this.defKeys.push(role.children[i].children[j].id)
            //         for(let k = 0; k < role.children[i].children[j].children.length; k++) {
            //             this.defKeys.push(role.children[i].children[j].children[k].id)
            //         }
            //     }
            //     console.log(this.defKeys)
            // }
        },
        getTreeItem(obj) {
            obj.children.map(item => {
                // 如果有children继续遍历
                if(item.children) {
                    this.getTreeItem(item)
                } else {
                    this.defKeys.push(item.id)
                }
            })
        }
    }
}
</script>
<style scoped>
.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.box-card {
    margin-top: 12px;
}

.el-input-group {
    width: 32%;
    margin-right: 12px;
}

.custom-tag {
    margin: 10px;
}
</style>