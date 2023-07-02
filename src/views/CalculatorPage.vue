<template>
    <div>
        서식 자동작성 페이지입니다.
        <TaxCalculator />
    </div>
</template>

<script>
import TaxCalculator from '@/components/TaxCalculator.vue';
export default {
    components: { TaxCalculator }
}
</script>