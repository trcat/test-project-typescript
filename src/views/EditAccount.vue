<template>
    <div id="container">
        <el-input placeholder="请输入学工号" v-model="searchValue" :disabled="disabled">
            <el-button slot="append" icon="el-icon-search" :disabled="disabled" :loading="loading" @click="searchUser"></el-button>
        </el-input>
        <template v-if="user">
            <el-divider></el-divider>
            <el-card>
                <div slot="header">
                    <span>{{user.id}}</span>
                    <el-button class="card-button" type="danger" icon="el-icon-delete" @click="deleteProfile" :disabled="disabled" :loading="loading" circle></el-button>
                    <el-button class="card-button" type="primary" icon="el-icon-edit" @click="edit" :disabled="disabled" circle></el-button>
                </div>
                <div>姓名: {{user.username}}</div>
                <div>账号类型: {{user.identity}}</div>
            </el-card>
            <el-dialog title="编辑个人信息" :visible.sync="editProfile" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                <el-form label-position="left" label-width="100px" :model="editForm" ref="editForm" :rules="rules" :disabled="disabled" hide-required-asterisk>
                    <el-form-item label="账号类型">
                        <el-radio-group v-model="editForm.identity" disabled>
                            <el-radio label="student">学生</el-radio>
                            <el-radio label="teacher">教师</el-radio>
                            <el-radio label="admin">管理员</el-radio>
                        </el-radio-group> 
                    </el-form-item>
                    <el-form-item v-if="editForm.identity === 'student'" label="所属班级" prop="class">
                        <el-select v-model="editForm.my_class" placeholder="班级">
                            <el-option v-if="editForm.classOptions.length === 0" v-loading="loadingClassOptions" key="empty" value="empty" label="无可选班级"></el-option>
                            <el-option
                                v-for="item in editForm.classOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学工号" prop="id">
                        <el-input v-model="editForm.id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="username">
                        <el-input v-model="editForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-radio-group v-model="editForm.gender">
                            <el-radio label="male">男</el-radio>
                            <el-radio label="female">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="phone">
                        <el-input v-model="editForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="email" v-model="editForm.email"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" :disabled="disabled" :loading="loading" @click="saveEdit('editForm')" >保 存</el-button>
                    <el-button @click="editProfile = false" :disabled="disabled">取 消</el-button>
                </div>
            </el-dialog>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import API from '@/rest/edit-account';
import userProfileAPI from '@/rest/user-profile';
import addAccountAPI from '@/rest/add-account';
import { UserResultData, UserData, ClassListResultData, ResultData, UserIdentity, UserGender } from '@/data';

@Component
export default class EditAccount extends Vue {
    // data
    private searchValue = '';
    private disabled = false;
    private loading = false;
    private user: UserData | null = null;
    private editProfile = false;
    private editForm = {
        identity: 'student' as UserIdentity,
        my_class: null as string | null,
        id: '',
        username: '',
        gender: 'male' as UserGender,
        phone: '',
        email: '',
        classOptions: [] as any[],
    };
    private loadingClassOptions = false;
    private rules = {
        username: [{
            required: true, message: '请填写姓名', trigger: 'blur',
        }],
        phone: [{
            required: true, message: '请填写联系方式', trigger: 'blur',
        }],
        email: [{
            required: true, message: '请填写邮箱地址', trigger: 'blur',
        }],
    };
    // methods
    private searchUser(e: Event) {
        e.stopPropagation();

        if (this.searchValue) {
            const callback = (r: UserResultData) => {
                if (r.state) {
                    // 显示 user card
                    if (r.data) {
                        this.user = Object.assign({}, r.data);
                    } else {
                        this.$message({
                            message: '未找到匹配内容！',
                        });
                    }
                } else {
                    this.$message({
                        message: r.message,
                        type: 'error',
                    });
                }

                this.reset();
            };

            this.onLoading();
            API.searchUser(this.searchValue, callback);

        } else {
            this.$message({
                message: '请填写要搜索的学工号！',
                type: 'error',
            });
        }
    }
    private edit(e: Event) {
        e.stopPropagation();

        this.editProfile = true;
        this.loadingClassOptions = true;
        this.editForm = Object.assign(this.editForm, this.user);

        if (!this.editForm.classOptions) {
            this.editForm.classOptions = [];
        }

        if (this.editForm.identity === 'student' && this.editForm.classOptions.length === 0) {
            const callback = (r: ClassListResultData) => {
                if (r.state) {
                    this.editForm.classOptions = r.data.map((c) => {
                        return {
                            value: c.id,
                            label: c.class_name,
                        };
                    });
                    this.loadingClassOptions = false;
                }
            };
            this.loadingClassOptions = true;
            addAccountAPI.getClassOptions(callback);
        }
    }
    private deleteProfile(e: Event) {
        e.stopPropagation();

        const callback = (r: ResultData) => {
            if (r.state) {
                this.$message({
                    message: '账号已删除！',
                    type: 'success',
                });
                this.user = null;
            } else {
                this.$message({
                    message: r.message,
                    type: 'error',
                });
            }

            this.reset();
        };

        this.onLoading();
        API.deleteProfile((this.user as UserData).id as string, callback);
    }
    private saveEdit(formName: string) {
        (this.$refs[formName] as any).validate((valid: any) => {
            if (valid) {
                const callback = (r: UserResultData) => {
                    this.$message({
                        message: r.message,
                        type: r.state ? 'success' : 'error',
                    });
                    if (r.state) {
                        this.user = Object.assign({}, r.data);
                    }

                    this.reset();
                    this.editProfile = false;
                };

                this.onLoading();
                const userData: UserData = {
                    identity: this.editForm.identity,
                    id: this.editForm.id,
                    username: this.editForm.username,
                    gender: this.editForm.gender,
                    phone: this.editForm.phone,
                    email: this.editForm.email,
                };
                if (this.editForm.my_class) {
                    userData.my_class = this.editForm.my_class;
                }
                userProfileAPI.saveProfile(userData, callback);
            } else {
                this.$message({
                    message: '表单内容有误，请检查并重新填写！',
                    type: 'error',
                });
            }
        });
    }
    private onLoading() {
        this.loading = true;
        this.disabled = true;
    }
    private reset() {
        this.loading = false;
        this.disabled = false;
    }
}
</script>

<style lang="scss" scoped>
    #container {
        width: 60%;
        margin-left: auto;
        margin-right: auto;
    }

    .card-button {
        float: right;
        padding: 8px;
        margin: 2px;
    }
</style>
