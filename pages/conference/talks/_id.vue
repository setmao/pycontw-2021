<template>
    <i18n-page-wrapper class="px-8 sm:px-10 md:px-32 lg:px-60" custom-x>
        <core-h1 :title="talkData.title" center></core-h1>
        <div class="talk__speakers">
            <div
                v-for="(speaker, index) in talkData.speakers"
                :key="`talk_details_speaker_${index}`"
                class="talk_speakerContainer"
            >
                <div class="talk__speakerThumbnail">
                    <img :src="speaker.thumbnail_url" :alt="speaker.name" />
                </div>
                <p class="talk__speakerName">{{ speaker.name }}</p>
            </div>
        </div>

        <div class="talk__infoSection">
            <div class="talk__infos">
                <div class="talk__info">
                    <img :src="icons.location" class="mx-2" />
                    {{ locationMapping[talkData.location] }}
                </div>
                <div class="talk__info">
                    <img :src="icons.language" class="mx-2" />
                    {{ $t(`languages.${talkData.language}`) }}
                </div>
                <div class="talk__info">
                    <img :src="icons.datetime" class="mx-2" />
                    {{ $t(`terms.${getDateTag(talkData.begin_time)}`) }} •
                    {{ getTime(talkData.begin_time) }}-{{
                        getTime(talkData.end_time)
                    }}
                </div>
                <div class="talk__info">
                    <img :src="icons.level" class="mx-2" />
                    {{ $t(`levels.${talkData.python_level}`) }}
                </div>
                <div class="talk__info">
                    <img :src="icons.category" class="mx-2" />
                    {{ $t(`categories.${talkData.category}`) }}
                </div>
            </div>
        </div>

        <tabs class="talk__tabs">
            <tab :title="$t('terms.speech')">
                <span class="whitespace-pre-line">
                    <p class="talk__tabParagraphTitle">
                        {{ $t('terms.abstract') }}
                    </p>
                    <p class="talk__tabParagraph">{{ talkData.abstract }}</p>
                </span>
                <span class="whitespace-pre-line">
                    <p class="talk__tabParagraphTitle">
                        {{ $t('terms.description') }}
                    </p>
                    <p class="talk__tabParagraph">
                        {{ talkData.detailed_description }}
                    </p>
                </span>
                <div v-show="!!talkData.slide_link" class="talk__extLink mt-4">
                    <ext-link :href="talkData.slide_link">
                        <fa
                            :icon="['fa', 'link']"
                            aria-hidden="true"
                            class="mr-2"
                        ></fa
                        >Slides
                    </ext-link>
                </div>
                <youtube
                    v-show="!!talkData.youtube_id"
                    :video-id="talkData.youtube_id"
                    class="mt-4"
                >
                </youtube>
            </tab>
            <tab :title="$t('terms.bio')">
                <div
                    v-for="(speaker, index) in talkData.speakers"
                    :key="`talk_details_tab_speaker_${index}`"
                    class="mb-4 whitespace-pre-line"
                >
                    <span class="whitespace-pre-line">
                        <p class="talk__tabParagraphTitle">
                            {{ speaker.name }}
                        </p>
                        <p class="talk__tabParagraph">{{ speaker.bio }}</p>
                    </span>

                    <div class="flex">
                        <div class="talk__extLink">
                            <ext-link
                                v-if="!!speaker.github_profile_url"
                                :href="speaker.github_profile_url"
                            >
                                <fa
                                    :icon="['fab', 'github-square']"
                                    aria-hidden="true"
                                    class="mr-2"
                                ></fa>
                            </ext-link>
                        </div>
                        <div class="talk__extLink">
                            <ext-link
                                v-if="!!speaker.twitter_profile_url"
                                :href="speaker.twitter_profile_url"
                            >
                                <fa
                                    :icon="['fab', 'twitter-square']"
                                    aria-hidden="true"
                                    class="mr-2"
                                ></fa>
                            </ext-link>
                        </div>
                        <div class="talk__extLink">
                            <ext-link
                                v-if="!!speaker.facebook_profile_url"
                                :href="speaker.facebook_profile_url"
                            >
                                <fa
                                    :icon="['fab', 'linkedin']"
                                    aria-hidden="true"
                                    class="mr-2"
                                ></fa>
                            </ext-link>
                        </div>
                    </div>
                </div>
            </tab>
            <tab v-if="!!talkData.slido_embed_link.length" title="Slido">
                <iframe
                    class="talk__slido"
                    :src="talkData.slido_embed_link"
                ></iframe>
            </tab>
        </tabs>
    </i18n-page-wrapper>
</template>

<script>
import i18n from '@/i18n/conference/speeches.i18n'
import I18nPageWrapper from '@/components/core/i18n/PageWrapper'
import CoreH1 from '@/components/core/titles/H1'
import Tab from '@/components/core/tabs/Tab.vue'
import Tabs from '@/components/core/tabs/Tabs.vue'
import ExtLink from '@/components/core/links/ExtLink.vue'
import Youtube from '@/components/core/embed/Youtube.vue'

export default {
    i18n,
    name: 'PageConferenceTalksDetail',
    components: {
        I18nPageWrapper,
        CoreH1,
        Tab,
        Tabs,
        ExtLink,
        Youtube,
    },
    async fetch() {
        const talkId = this.$route.params.id
        const isSponsored = this.$route.query.isSponsored
        await this.$store.dispatch('$getTalkDetailData', talkId, isSponsored)
    },
    data() {
        return {
            talkData: {
                title: '',
                slido_embed_link: '',
                youtube_id: '',
                begin_time: new Date(),
                end_time: new Date(),
            },
            icons: {
                location: require('~/static/img/speech/icons/location.svg'),
                language: require('~/static/img/speech/icons/language.svg'),
                datetime: require('~/static/img/speech/icons/datetime.svg'),
                level: require('~/static/img/speech/icons/level.svg'),
                category: require('~/static/img/speech/icons/category.svg'),
            },
            locationMapping: {
                '4-r0': 'R0',
                '5-r1': 'R1',
                '6-r2': 'R2',
                '1-r3': 'R3',
            },
        }
    },
    mounted() {
        const talkData = this.$store.state.talkData
        this.talkData = {
            ...talkData,
            begin_time: this.getDatetimeFromString(talkData.begin_time),
            end_time: this.getDatetimeFromString(talkData.end_time),
        }
    },
    methods: {
        getDatetimeFromString: (datetimeString) => {
            const datetimeUtc = new Date(datetimeString)
            const offset = new Date().getTimezoneOffset()
            const datetime = new Date(datetimeUtc - offset)
            return datetime
        },
        getDateTag: (datetime) => {
            const month = datetime.getMonth() + 1
            const date = datetime.getDate()
            if (month === 10 && date === 2) {
                return 'day1'
            }
            if (month === 10 && date === 3) {
                return 'day2'
            }
            return ''
        },
        getTime: (datetime) => {
            const hour = ('0' + datetime.getHours()).slice(-2)
            const minute = ('0' + datetime.getMinutes()).slice(-2)
            return `${hour}:${minute}`
        },
    },
}
</script>

<style lang="postcss" scoped>
.talk__speakers {
    @apply flex justify-center mt-6 mb-16;
}
.talk_speakerContainer {
    @apply flex flex-col;
}
.talk__speakerThumbnail {
    @apply h-32 w-32 mx-12;
}
.talk__speakerThumbnail img {
    @apply object-cover rounded-full;
    height: 100%;
}
.talk__speakerName {
    @apply font-serif text-center;
    color: #f3cc39;
}

.talk__infoSection {
    @apply inline-block text-xs md:text-sm mb-28;
    @apply rounded-2xl min-w-full border-2 bg-opacity-0;
    line-height: 29px;
    color: #c7c7c7;
    border-color: #c2a53a;
    box-shadow: 6px 6px 0 #c2a53a;
    padding: 30px;
}
.talk__infos {
    @apply grid grid-cols-2 gap-y-10 gap-x-6;
}
.talk__info {
    @apply flex items-center font-serif mr-auto ml-12;
    color: #e6ba17;
}

.talk__tabs {
    @apply mb-8;
}
.talk__tabParagraphTitle {
    @apply font-serif font-bold mb-2;
    color: #e6ba17;
}
.talk__tabParagraph {
    @apply font-serif mb-2;
}

.talk__extLink {
    @apply font-bold;
    color: #e6ba17;
}
.talk__extLink:hover {
    color: #9387ff;
}

.talk__slido {
    @apply w-full h-96;
}
</style>
