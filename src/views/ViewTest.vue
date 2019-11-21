<template>
    <div id="container"  v-loading="containerLoading">
        <el-card v-if="papers.length === 0">
            <h1>无任何试卷！</h1>
        </el-card>
        <el-card v-for="item in papers" :key="item.id">
            <div slot="header">
                <span>{{item.paperLib.name}}</span>
                <el-button class="card-button" type="text" @click="test(item)" circle>开始考试 >></el-button>
            </div>
            <div>总分: {{item.paperLib.total}}</div>
            <div>题目数量: {{item.paperLib.question_number}}</div>
        </el-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import API from '@/rest/view-test';
import { ViewData, ViewResultData } from '@/data';

@Component
export default class ViewTest extends Vue {
    // data
    private papers: ViewData[] = [];
    private containerLoading = false;
    // lifecycle hooks
    private mounted() {
        const callback = (r: ViewResultData) => {
            if (r.state) {
                this.papers = r.data;
                this.containerLoading = false;
            }
        };
        this.containerLoading = true;
        API.getTestList(callback);
    }
    // methods
    private test(testData: ViewData) {
        this.$store.commit('updateCurrentTest', testData);
        this.$router.push('/test');
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
