<template>
  <div class="p-4">
    <el-card>
      <template #header>
        <div class="flex justify-between items-center">
          <span class="flex-1">
            <el-link :underline="false" type="primary" :href="GITHUB_URL" target="_blank">{{
              name
            }}</el-link
            >是一个基于Vue3.0、Vite、 Element Plus 2.x
            、TypeScript的管理后台解决方案，目标是为中大型项目开发，提供现成的开箱解决方案及丰富的示例，同时开源版本不会限制任何代码用于商用。
          </span>
        </div>
      </template>

      <el-descriptions class="margin-top" title="项目信息" :column="3" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">版本</div>
          </template>
          {{ infoData.version }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">最后编译时间</div>
          </template>
          {{ infoData.lastBuildTime }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">文档地址</div>
          </template>
          <el-link :underline="false" type="primary" :href="infoData.doc" target="_blank"
            >点击访问</el-link
          >
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">预览地址</div>
          </template>
          <el-link :underline="false" type="primary" :href="infoData.preview" target="_blank"
            >点击预览</el-link
          >
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">GitHub</div>
          </template>
          <el-link :underline="false" type="primary" :href="GITHUB_URL" target="_blank"
            >Github</el-link
          >
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>
<script lang="ts">
  import { GITHUB_URL, SITE_URL, DOC_URL } from '@/settings/siteSetting'

  export default defineComponent({
    setup() {
      const { pkg, lastBuildTime } = __APP_INFO__

      const { dependencies, devDependencies, name, version } = pkg
      console.log('🚀 ~ file: index.vue ~ line 25 ~ setup ~ name', name)
      console.log('🚀 ~ file: index.vue ~ line 25 ~ setup ~ devDependencies', devDependencies)
      console.log('🚀 ~ file: index.vue ~ line 25 ~ setup ~ dependencies', dependencies)

      // const schema: DescItem[] = [];
      // const devSchema: DescItem[] = [];

      // const infoSchema: DescItem[] = [
      //   {
      //     label: '版本',
      //     field: 'version'
      //   },
      //   {
      //     label: '最后编译时间',
      //     field: 'lastBuildTime'
      //   },
      //   {
      //     label: '文档地址',
      //     field: 'doc'
      //   },
      //   {
      //     label: '预览地址',
      //     field: 'preview'
      //   },
      //   {
      //     label: 'Github',
      //     field: 'github'
      //   }
      // ];

      const infoData = {
        version,
        lastBuildTime,
        doc: DOC_URL,
        preview: SITE_URL,
        github: GITHUB_URL
      }
      console.log('🚀 ~ file: index.vue ~ line 55 ~ setup ~ infoData', infoData)

      // Object.keys(dependencies).forEach((key) => {
      //   schema.push({ field: key, label: key });
      // });

      // Object.keys(devDependencies).forEach((key) => {
      //   devSchema.push({ field: key, label: key });
      // });
      return {
        name,
        GITHUB_URL,
        infoData
      }
    }
  })
</script>
