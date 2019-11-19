<template>
    <el-container>
        <el-main>
            <el-col :span="8" :offset="8">
                <slot></slot>
            </el-col>
        </el-main>
    </el-container>
</template>

<script>
import {Component, VueDecorator} from 'vue-property-decorator';

@Component
export default class CenterContainer extends Vue {}
</script>

