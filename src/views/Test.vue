<template>
    <el-container id="main-container" v-loading="mainLoading">
        <el-aside width="20%">
            <el-card>
                <div id="timer">
                    <div>考试时间还剩（分钟）:</div>
                    <div id="time">{{time}}</div>
                </div>
            </el-card>
        </el-aside>

        <el-container>
            <el-main>
                <div id="main-content" class="default-box">
                    <el-container>
                        <el-main>
                            <div id="container">
                                <el-card v-for="(item, index) in questions" :key="item.id">
                                    <div class="content">
                                        <span id="index">{{index + 1}}.</span>
                                        <span>{{item.content}}</span>
                                        <span>()</span>
                                        <span id="score">[{{item.score}}分]</span>
                                    </div>
                                    <div class="options">
                                        <el-checkbox-group v-model="answer">
                                            <div v-for="(o, i) in item.options" :key="o + '_' + i">
                                                <el-checkbox v-if="o" :label="item.id + '_' +String.fromCharCode(i + 65)">
                                                    <span>{{String.fromCharCode(i + 65)}}</span>
                                                    <span>{{o}}</span>
                                                </el-checkbox>
                                            </div>

                                        </el-checkbox-group>
                                    </div>
                                </el-card>
                                <el-button id="submit-button" type="primary" @click="submitAnswer">提交答案</el-button>
                            </div>
                        </el-main>
                    </el-container>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import API from '@/rest/test';
import AjaxHelper from '@/helper/ajax-helper';
import { QuestionData, TestScoreResultData } from '@/data';

@Component
export default class Test extends Vue {
    // data
    private mainLoading = true;
    private time = 0;
    private questions: QuestionData[] = [];
    private answer = [];
    // lifecycle hooks
    private mounted() {
        if (this.$store.state.currentTest) {
            this.questions = this.$store.state.currentTest.questions;
            this.time = this.$store.state.currentTest.test_time;
            const timer = window.setInterval(() => {
                this.time -= 1;
                if (this.time === 0) {
                    window.clearInterval(timer);
                    this.$alert('时间已经到，禁止答题！', '考试时间到', {
                        confirmButtonText: '确定',
                        callback: () => {
                             this.submitAnswer();
                        },
                    });
                }
            }, 60000);
            this.mainLoading = false;
        } else {
            this.$router.push('/');
        }

        window.onbeforeunload = () => {
            AjaxHelper.ajax({
                url: `/user/loginOut/${this.$store.state.user.id}/`,
                type: 'delete',
                async: false,
                success: () => {
                    this.$store.commit('updateUser', null);
                },
            });
            return  '离开此页面会或清理 cookie，页面部分行为会出错，是否继续?';
        };
    }
    private submitAnswer() {
        const callback = (r: TestScoreResultData) => {
            if (r.state) {
                this.$alert(`考试得分: ${r.data.get_score}`, '考试结束', {
                    confirmButtonText: '确定',
                    callback: () => {
                        this.$store.commit('updateCurrentTest', null);
                        this.$router.push('/user/result-test');
                    },
                });
            }
        };

        const userAnswer: {[key: string]: string[]} = {};
        this.answer.forEach((a: string) => {
            const questionId = a.split('_')[0];
            const answer = a.split('_')[1];
            if (userAnswer[questionId]) {
                userAnswer[questionId].push(answer);
            } else {
                userAnswer[questionId] = [answer];
            }
        });

        this.mainLoading = true;
        API.submitAnswer(this.$store.state.user.id, this.$store.state.currentTest.id, userAnswer, callback);
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

    #timer {
        text-align: center;
        #time {
            color: gray;
            font-size: 50px;
        }
    }

    #container {
        width: 60%;
        margin-left: auto;
        margin-right: auto;
    }
    
    .el-card {
        margin-bottom: 1em;
    }

    .options {
        margin-top: 1em;
    }

    
</style>
