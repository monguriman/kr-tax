<template>
  <h2>외국납부세액공제 간이 계산기</h2>
  <div>
    <h4>준비물</h4>
    원천징수영수증
    <span @click="showDownloadGuideModal = true" class="modal-guide-text"
      >어디서 다운받나요?</span
    >
  </div>
  <div>
    <h4>유의사항</h4>
    <ul style="padding-left: 2em;">
      <li>
        모든 급여가 원천징수영수증에 포함되어 있지 않다면 실제 공제액은 달라질
        수 있음.
      </li>
      <li>
        원천징수영수증에 없는 근로소득(해외지급액)은 별도의 종합소득세 신고를
        통해 신고하여야 할 수 있음.
      </li>
    </ul>
  </div>

  <v-dialog v-model="showDownloadGuideModal">
    <div class="modal">
      <DownloadGuideModal />
      <v-btn @click="showDownloadGuideModal=false" color="primary">닫기</v-btn>
    </div>
  </v-dialog>
</template>

<script>
import DownloadGuideModal from "@/components/DownloadGuideModal.vue";
export default {
  components: { DownloadGuideModal },
  data() {
    return {
      showDownloadGuideModal: false,
    };
  },
};
</script>

<style scoped></style>
