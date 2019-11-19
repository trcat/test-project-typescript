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
import {Component, VueDecorator} from "vue-class-component";

@Component
export default class centerContainer extends Vue {}
</script>

