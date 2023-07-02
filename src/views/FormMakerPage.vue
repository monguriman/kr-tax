<template>
    <div>
        폼메이커 페이지입니다.
        <LayoutForm>
            <FormMaker />
        </LayoutForm>

    </div>
</template>

<script>
import LayoutForm from '@/components/LayoutForm.vue';
import FormMaker from '@/components/FormMaker.vue';
export default {
    components: { LayoutForm, FormMaker }
}
</script>