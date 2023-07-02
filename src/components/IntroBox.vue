<template>
    <h2>외납세 간이 계산기</h2>
      <div>
        <h4>준비물</h4>
        원천징수영수증
        <span
          @click="showModalDownloadGuide = true"
          style="color: blue; cursor: pointer; font-size: 0.7em"
          >어디서 다운받나요?</span
        >
      </div>
      <div>
        <h4>유의사항</h4>
        <ul>
          <li>
            모든 급여가 원천징수영수증에 포함되어 있지 않다면 실제 공제액은
            달라질 수 있음.
          </li>
          <li>
            원천징수영수증에 없는 근로소득(해외지급액)은 별도의 종합소득세
            신고를 통해 신고하여야 할 수 있음.
          </li>
        </ul>
      </div>

      <v-dialog v-model="showModalDownloadGuide" width="500">
        <DownloadGuideModal />
      </v-dialog>
</template>

<script>
import DownloadGuideModal from '@/components/DownloadGuideModal.vue';
export default {
    components: { DownloadGuideModal },
    data () {
        return {
            showModalDownloadGuide: false,
        }
    }
}
</script>