<template>
  <div>
    <h3 class="modal-title">원천징수영수증 다운로드 방법</h3>
<hr class="hr-under-title" />

    <div class="steps">
      1.
      <a
        href="https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/pp/index.xml&tmIdx=0&tm2lIdx=&tm3lIdx="
        target="_blank"
        rel="noopener noreferrer"
        class="emphasis-text"
        >홈택스</a
      >
      로그인
    </div>
    <div class="steps">
      2. 조회/발급 > 기타 조회 > 근로소득 지급명세서 조회
      <img
        :src="downloadGuide"
        alt="downloadGuide"
        class="guide-image"
      />
    </div>
    <div class="steps">
      3. 사업자 번호 클릭
      <img :src="downloadGuide2" alt="downloadGuide2" class="guide-image" />
    </div>
  </div>
</template>

<script>
import downloadGuide from "../assets/downloadGuide.png";
import downloadGuide2 from "../assets/downloadGuide2.png";

export default {
  data() {
    return {
      downloadGuide,
      downloadGuide2,
    };
  },
};
</script>

<style scoped>
.steps {
  padding-bottom: 0.5em;
}

</style>
