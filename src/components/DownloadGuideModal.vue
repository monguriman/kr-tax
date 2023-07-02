<template>
  <div class="download-guide">
    [다운로드 가이드]
    <br />
    1.
    <a
      href="https://www.hometax.go.kr/websquare/websquare.wq?w2xPath=/ui/pp/index.xml&tmIdx=0&tm2lIdx=&tm3lIdx="
      target="_blank"
      rel="noopener noreferrer"
      >홈택스</a
    >
    로그인 <br />
    <img :src="downloadGuide" alt="downloadGuide" /> <br />2. 조회/발급 > 기타
    조회 >근로소득 지급명세서 조회 > 사업자 번호 클릭
  </div>
</template>

<script>
import downloadGuide from "../assets/downloadGuide.png";

export default {
  data() {
    return {
      downloadGuide,
    };
  },
};
</script>

<style scoped>
.download-guide {
  background-color: white;
}
</style>
