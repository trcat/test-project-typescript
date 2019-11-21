<template>
    <div id="container" v-loading="containerLoading">
        <el-card v-if="papers.length === 0">
            <h1>无任何试卷！</h1>
        </el-card>
        <el-card v-for="(item, i) in papers" :key="item.id + '_' + i">
            <div slot="header">
                <span>{{item.paperLib.name}}</span>
                <el-button class="card-button" type="text" @click="viewTest(item)" circle>查看考试结果 >></el-button>
            </div>
            <div>考试时间: {{new Date(item.start_time).getFullYear()}}-{{new Date(item.start_time).getMonth() + 1}}-{{new Date(item.start_time).getDate()}}</div>
            <div>总分: {{item.paperLib.total}}</div>
            <div>题目数量: {{item.paperLib.question_number}}</div>
        </el-card>
        <el-pagination 
            v-if="user && user.identity === 'teacher'"
            layout="prev, pager, next" 
            :page-count="total" 
            :page-size.sync="limit" 
            :current-page.sync="currentPage" 
            :disabled="disabled" 
            @current-change="getTestList"
            @prev-click="getTestList"
            @next-click="getTestList"
            hide-on-single-page/>
        <el-dialog
            :title="dialogTitle"
            :visible.sync="showTableDialog">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="user"
                    label="学工号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="user_name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="get_score"
                    label="得分">
                </el-table-column>
                <el-table-column
                    prop="class"
                    label="所在班级"
                    width="180">
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog
            :title="dialogTitle"
            :visible.sync="showTestDialog">
            <el-table
                :data="tableData"
                style="width: 100%"
                border>
                <el-table-column
                    prop="score"
                    label="考试最终成绩"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="total"
                    label="试卷总分"
                    width="180">
                </el-table-column>
            </el-table>
            <el-divider>试题</el-divider>
            <el-card v-for="(item, index) in questions" :key="item.id">
                <div slot="header">
                    <span>题目{{index + 1}}</span>
                </div>
                <div class="content">
                    <span>{{item.content}}</span>
                    <span>()</span>
                    <span id="score">[{{item.score}}分]</span>
                </div>
                <div class="options">
                    <div v-for="(o, i) in item.options" :key="o + '_' + i">
                        <el-checkbox v-if="o">
                            <span>{{String.fromCharCode(i + 65)}}</span>
                            <span>{{o}}</span>
                        </el-checkbox>
                    </div>
                </div>
                <el-form label-position="left" label-width="100px">
                    <el-form-item label="所选答案:">
                        <span>{{userAnswer[item.id] ? userAnswer[item.id].join(" ") : ""}}</span>
                    </el-form-item>
                    <el-form-item label="正确答案:">
                        <span>{{item.answer ? item.answer.join(" ") : ""}}</span>
                    </el-form-item>
                    <el-form-item label="题目详解:">
                        <span>{{item.description}}</span>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import API from '@/rest/result-test';
import {
    TestData,
    ClassListResultData,
    TestProfileData,
    TestListResultData,
    ClassScorePageListResultData,
    ClassMemberScoreData,
StudentScoreResultData,
StudentScoreData,
QuestionData} from '@/data';

@Component
export default class ResultTest extends Vue {
    // data
    private papers: TestProfileData[] = [];
    private total = 0;
    private limit = 10;
    private containerLoading = false;
    private disabled = false;
    private currentPage = 1;
    private dialogTitle = '';
    private tableData: ClassMemberScoreData[] | Array<{score: number; total: number}> | null = null;
    private questions: QuestionData[] = [];
    private showTableDialog = false;
    private showTestDialog = false;
    private userAnswer = {};
    // computed
    get user() {
        if (this.$store.state.user) {
            return this.$store.state.user;
        }

        return null;
    }
    // lifecycle hooks
    private mounted() {
        if (this.user) {
            this.getTestList(1);
        }
    }
    // methods
    private getTestList(currentPage: number) {
        const callback = (r: TestListResultData) => {
            if (r.state) {
                this.papers = r.data.data;
                this.total = r.data.totalPage;
            } else {
                this.$message({
                    message: r.message,
                    type: 'error',
                });
            }

            this.containerLoading = false;
        };
        this.containerLoading = true;
        API.getTestList(this.user, callback, 10, currentPage);
    }
    private viewTest(testData: TestProfileData) {
        if (this.user.identity === 'teacher') {
            this.viewTestByTeacher(testData);
        } else if (this.user.identity === 'student') {
            this.viewTestByStudent(testData);
        }
    }
    private viewTestByTeacher(testData: TestProfileData) {
        const callback = (r: ClassScorePageListResultData | StudentScoreResultData) => {
            if (r.state) {
                this.tableData = (r as ClassScorePageListResultData).data.data;
                this.dialogTitle = `查看试卷 ${testData.id} 结果`;
                this.showTableDialog = true;
            }

            this.reset();
        };
        this.loading();
        API.getTestResult(this.user, testData.id, callback);
    }
    private viewTestByStudent(testData: TestProfileData) {
        const callback = (r: ClassScorePageListResultData | StudentScoreResultData) => {
            if (r.state) {
                this.dialogTitle = `查看试卷 ${testData.id} 结果`;
                const d: StudentScoreData = (r as StudentScoreResultData).data;
                this.tableData = [{
                    score: d.score,
                    total: d.paperLib.total,
                }];
                this.questions = d.paperLib.questions;
                this.userAnswer = d.user_answer;
                this.showTestDialog = true;
                this.reset();
            }
        };
        this.loading();
        API.getTestResult(this.user, testData.id, callback);
    }
    private loading() {
        this.disabled = true;
    }
    private reset() {
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

    .el-card {
        margin-bottom: 1em;
        #content {
            font-size: 14px;
            #score {
                color: gray
            }
            #index {
                margin-right: 20px;
            }
            .options {
                margin-top: 1em;
                div {
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>
