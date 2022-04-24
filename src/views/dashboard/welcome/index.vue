<script lang="ts" setup>
import { request } from '@/hooks/useRequest/axios';
import { useRequest } from '@/hooks/useRequest/useRequest';

interface IUser {
  id: number;
  username: string;
  email: string;
  phone: string;
}

function getUserInfo(id: number) {
  return request<IUser>({
    url: '/getUserInfo',
    method: 'get',
    params: {
      id
    }
  })
}

const { run, queries } = useRequest<IUser, [number]>(getUserInfo, {
  manual: true,
  queryKey:(id) => String(id)
})

const { run: debounceRun, loading: debounceLoading, cancel: debounceCancel } = useRequest<IUser, [number]>(getUserInfo, {
  manual: true,
  debounceWait: 1500,
  defaultParams: [10000]
})

const { run: throttleRun, loading: throttleLoading, cancel: throttleCancel } = useRequest<IUser, [number]>(getUserInfo, {
  manual: true,
  throttleWait: 1500,
  defaultParams: [10000]
})


const userList = [
  { id: 10000, username: '张三', email: 'zhangsan@qq.com', phone: 1311111111 },
  { id: 10001, username: '李四', email: 'lisi@qq.com', phone: 1311111111 },
  { id: 10002, username: '王五', email: 'wangwu@qq.com', phone: 1311111111 }
]


</script>
<template>
  <div>
    <div class="text-red-500">
      queryKey示例
    </div>
    <ul class="p-[24px]">
      <li
        v-for="user in userList"
        :key="user.id"
      >
        <div class="flex justify-between">
          <div>{{user.username}}</div>
          {{ queries[user.id]?.data }}
          <div>
            <el-button :loading="queries[user.id]?.loading" @click="run(user.id)">请求</el-button>
            <el-button @click="queries[user.id]?.cancel()">取消</el-button>
          </div>
        </div>
      </li>
    </ul>
    <div>
      queries: {{ queries }}
    </div>

    <div class="text-red-500">
      debounce: 取消了也会防抖
      <el-button :loading="debounceLoading" @click="debounceRun(1)">请求</el-button>
      <el-button @click="debounceCancel?.()">取消</el-button>
    </div>

    <div class="text-red-500">
      throttle
      <el-button  @click="throttleRun(1)">请求</el-button>
      <el-button @click="throttleCancel?.()">取消</el-button>
    </div>
  </div>
</template>

