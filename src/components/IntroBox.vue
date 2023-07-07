<template>
  <h2>외국납부세액공제 간이 계산기</h2>
<hr class="hr-under-title">
  <div style="margin-top: 2em">
    <h4><v-icon icon="mdi-help-circle" class="icon" size="1.1em"/>외국납부세액공제란?</h4>
    아래 사항에 모두 해당한다면,
    외국납부세액공제를 통해 <span>세금 환급을 받을 수 있어요.</span>
    <ul style="padding-left: 2em; margin: 1em 0 1em 0">
      <li>한국과 외국에서 동일 소득에 대해 세금을 중복으로 냈어요.</li>
      <li>
        외국에서 일하고 받은 소득을 한국에서 신고했어요. <br /><span
          style="font-size: 0.8em"
          >(예를 들어, 내가 외국에서 일하는 동안 한국회사에서 세금을
          원천징수하고 연말정산했어요.)</span
        >
      </li>
    </ul>
  </div>

  <div style="margin-top: 2em">
    <h4><v-icon icon="mdi-text-box-multiple" class="icon" size="1.1em"/>준비물</h4>
    원천징수영수증
    <span @click="showDownloadGuideModal = true" class="modal-guide-text"
      >어디서 다운받나요?</span
    >
  </div>

  <div style="margin-top: 2em">
    <h4><v-icon icon="mdi-alert-circle" class="icon" size="1.1em"/>유의사항</h4>
    <ul style="padding-left: 2em">
      <li>
        모든 급여가 원천징수영수증에 포함되어 있지 않다면 실제 공제액은
        달라져요.
      </li>
      <li>
        원천징수영수증에 없는 근로소득(해외지급액 등)은 종합소득세 신고를 통해
        신고해야 할 수 있어요.
      </li>
    </ul>
  </div>

  <v-dialog v-model="showDownloadGuideModal">
    
    <div class="modal">
      <v-icon icon="mdi-close" class="close-button" @click="showDownloadGuideModal = false"/>
      <DownloadGuideModal />
      <v-btn
      @click="showDownloadGuideModal = false"
      flat
      color="deep-purple-accent-3"
      class="d-flex align-center justify-center mx-auto"
      >닫기</v-btn
    >
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
