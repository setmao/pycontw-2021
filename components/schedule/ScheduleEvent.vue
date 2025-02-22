<template>
    <schedule-block
        :class="classes"
        :style="styles"
        :text-align-center="textAlignCenter"
        :primary="!isCustomEvent"
        :secondary="isCustomEvent"
        :to="eventPagePath"
        active
    >
        <div v-if="$slots.prepend" class="scheduleEvent__prepend flex">
            <slot name="prepend"></slot>
        </div>
        <div class="scheduleEvent__context sticky">
            <div class="font-bold">{{ getValueByLocale(value.title) }}</div>
            <br v-if="!isCustomEvent" />
            <div v-if="byLine" class="font-medium text-sm">by {{ byLine }}</div>
            <div class="scheduleEvent__icon">
                <img :src="icon.level[value.python_level]" />
                <img :src="icon.lang[value.language]" />
            </div>
            <div v-if="duration" class="font-medium text-sm">
                {{ duration }}
            </div>
        </div>
    </schedule-block>
</template>

<script>
import ScheduleBlock from '@/components/schedule/ScheduleBlock'

export default {
    name: 'ScheduleEvent',
    components: {
        ScheduleBlock,
    },
    props: {
        value: {
            type: undefined,
            default: () => ({
                room: '',
                event_id: 0,
                event_type: 'Type',
                title: 'Title',
                speakers: [],
                is_remote: false,
                recording_policy: false,
                break_event: false,
                language: '',
                python_level: '',
                begin_time: '',
                end_time: '',
            }),
        },
        timelineBegin: { type: String, default: '08:30' },
        inList: { type: Boolean, default: false },
    },
    data() {
        const format = 'HH:mm'
        return {
            format,
            options: { outputFormat: format },
            startPoint: this.$parseDate(this.$padTimezone(this.timelineBegin)),
            icon: {
                lang: {
                    ENEN: require('~/static/img/icons/lang/ENEN.svg'),
                    ZHEN: require('~/static/img/icons/lang/ZHEN.svg'),
                    ZHZH: require('~/static/img/icons/lang/ZHZH.svg'),
                },
                level: {
                    NOVICE: require('~/static/img/icons/level/novice.svg'),
                    INTERMEDIATE: require('~/static/img/icons/level/intermediate.svg'),
                    EXPERIENCED: require('~/static/img/icons/level/experienced.svg'),
                },
            },
        }
    },
    computed: {
        isCustomEvent() {
            return this.value.event_type === 'custom'
        },
        textAlignCenter() {
            return ['custom', 'keynote'].includes(this.value.event_type)
        },
        byLine() {
            return this.value.speakers
                .map((speaker) => this.getValueByLocale(speaker))
                .join(', ')
        },
        duration() {
            const startTime = this.$datetimeToString(
                this.$padTimezone(this.value.begin_time),
                this.options,
            )
            const endTime = this.$datetimeToString(
                this.$padTimezone(this.value.end_time),
                this.options,
            )
            return `${startTime} ~ ${endTime}`
        },
        roomClass() {
            return `room-${this.value.room}`
        },
        classes() {
            return ['scheduleEvent', 'p-0', this.roomClass]
        },
        styles() {
            if (this.inList) {
                return
            }
            return {
                gridRowStart: this.getGridRow(this.value.begin_time),
                gridRowEnd: this.getGridRow(this.value.end_time),
            }
        },
        eventPagePath() {
            const {
                event_type: eventType,
                event_id: eventId,
                speakers,
            } = this.value
            if (eventType === 'keynote') {
                const keynoteSpeakerId = speakers[0].en_us.split(' ').join('_')
                return `/conference/keynotes#${keynoteSpeakerId}`
            } else if (['talk', 'tutorial', 'sponsored'].includes(eventType)) {
                return `/conference/${eventType}/${eventId}/`
            }
            return ''
        },
    },
    methods: {
        getGridRow(t) {
            const time = this.$padTimezone(t)
            const diff = this.$parseDate(time).diff(this.startPoint, 'minute')
            const unit = 5
            return parseInt(`${diff / unit}`, 10) + 1
        },
        getValueByLocale(data) {
            // Get value from the data with i18n based on current locale setting.
            // Note that the value of `title` and each item of `speakers` for keynote
            // data is an object. Each object has two keys: 'en_us' & 'zh_hant'.
            if (typeof data === 'object') {
                const localeMap = { 'en-us': 'en_us', 'zh-hant': 'zh_hant' }
                return data[localeMap[this.$i18n.locale]]
            }
            return data
        },
    },
}
</script>

<style lang="postcss" scoped>
.scheduleEvent__context {
    top: 132px;
}

.scheduleEvent__icon > img {
    @apply inline transition;
    filter: brightness(0) invert(1);
}
.scheduleEvent__context:hover > .scheduleEvent__icon > img {
    filter: brightness(0%);
}
</style>
