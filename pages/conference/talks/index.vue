<template>
    <i18n-page-wrapper class="px-8 sm:px-10 md:px-32 lg:px-52" custom-x>
        <core-h1 :title="$t('title')"></core-h1>
        <i18n path="intro" tag="p" class="intro"></i18n>
        <speech-card-collection>
            <speech-card
                v-for="talk in talksData"
                :id="talk.id"
                :key="`talk_${talk.id}`"
                :title="talk.title"
                :category="talk.category"
                :speakers="talk.speakers"
            >
            </speech-card>
        </speech-card-collection>
    </i18n-page-wrapper>
</template>

<script>
import i18n from '@/i18n/conference/speeches.i18n'
import I18nPageWrapper from '@/components/core/i18n/PageWrapper'
import CoreH1 from '@/components/core/titles/H1'
import SpeechCard from '@/components/events/SpeechCard'
import SpeechCardCollection from '@/components/events/SpeechCardCollection'

export default {
    i18n,
    name: 'PageConferenceTalks',
    components: {
        I18nPageWrapper,
        CoreH1,
        SpeechCard,
        SpeechCardCollection,
    },
    data() {
        return {
            talksData: [],
        }
    },
    async mounted() {
        await this.$store.dispatch('$getTalksData')
        this.talksData = this.$store.state.talksData
    },
}
</script>

<style lang="postcss" scoped>
.intro {
    @apply text-xs md:text-sm;
    line-height: 33px;
}
</style>
