<template>
    <el-container id="main-container" v-loading="mainLoading">
        <el-aside width="20%">
            <el-menu
                :default-active="activeMenu"
                @select="select">
                <el-menu-item index="/user">
                    <i class="el-icon-user"></i>
                    <span>欢迎，{{userName}} !</span>
                </el-menu-item>
                <!-- admin menu -->
                <template v-if="userIdentity === 'admin'">
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>管理账号</template>
                        <el-menu-item index="/user/add-account">添加账号</el-menu-item>
                        <el-menu-item index="/user/edit-account">编辑账号</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-menu"></i>管理班级</template>
                        <el-menu-item index="/user/add-class">添加班级</el-menu-item>
                        <el-menu-item index="/user/edit-class">编辑班级</el-menu-item>
                    </el-submenu>
                </template>
                <!-- teacher menu -->
                <template v-if="userIdentity === 'teacher'">
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>管理试卷</template>
                        <el-menu-item index="/user/add-test">添加试卷</el-menu-item>
                        <el-menu-item index="/user/edit-test">编辑试卷</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/user/result-test"><i class="el-icon-s-marketing"/>查看考试结果</el-menu-item>                    
                </template>
                <!-- student menu -->
                <template v-if="userIdentity === 'student'">
                    <el-menu-item index="/user/view-test">考试</el-menu-item>
                    <el-menu-item index="/user/result-test">查看考试结果</el-menu-item>                    
                </template>
            </el-menu>
            <el-button id="out" type="danger" @click="cancel">登出</el-button>
        </el-aside>
        
        <el-container>
            <el-main>
                <div id="main-content" class="default-box">
                    <el-container>
                        <el-main>
                            <router-view></router-view>
                        </el-main>
                    </el-container>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import API from '@/rest/user';

@Component
export default class User extends Vue {
    // data
    private isAdmin = false;
    private isTecher = false;
    private isStudent = false;
    private mainLoading = true;
    // lifecycle hook
    private mounted() {
        if (this.userName) {
            // 消除页面整体的 loading 状态
            this.mainLoading = false;
        } else {
            this.$router.push('/');
        }

        window.onbeforeunload = () => {
            this.cancel();
            return  '离开此页面会或清理 cookie，页面部分行为会出错，是否继续?';
        };
    }
    // computed
    private get userName() {
        if (this.$store.state.user) {
            return this.$store.state.user.username;
        }
        return null;
    }
    private get userIdentity() {
        if (this.$store.state.user) {
            return this.$store.state.user.identity;
        }
        return null;
    }
    private get activeMenu() {
        const route = this.$route;
        const { meta, path } = route;
        if (meta.subActiveMenu) {
            return meta.subActiveMenu;
        }
        return path;
    }
    // methods
    private select(index: string) {
        if (index !== this.activeMenu) {
            this.$router.push(index);
        }
    }
    private cancel() {
        this.mainLoading = true;
        API.loginOut(this.$store.state.user.id, (r) => {
            if (r.state) {
                this.$store.commit('updateUser', null);
                this.$router.push('/');
            } else {
                this.$message({
                    message: r.message,
                    type: 'error',
                });
            }
            this.mainLoading = false;
        });
    }
}

</script>

<style lang="scss" scoped>
    #main-container {
        width: 100%;
        .el-main {
            #main-content {
                background-color: white;
                padding: 3%;
            }
        }
    }

    #out {
        width: 100%;
        margin-top: 10%;
    }
</style>

