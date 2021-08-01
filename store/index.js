import { set } from '~/utils/store.utils'

export const state = () => ({
    sponsorsData: [],
    jobsData: [],
    keynotesData: [],
    speechesData: [],
    speechData: {},
})

export const mutations = {
    setSponsorsData: set('sponsorsData'),
    setJobsData: set('jobsData'),
    setKeynotesData: set('keynotesData'),
    setSpeechesData: set('speechesData'),
    setSpeechDetailData: set('speechData'),
}

export const actions = {
    async $getSponsorsData({ commit }) {
        const { data } = await this.$http.$get('/api/sponsors/')
        commit('setSponsorsData', data)
    },
    async $getJobsData({ commit }) {
        const { data } = await this.$http.$get('/api/sponsors/jobs/')
        commit('setJobsData', data)
    },
    async $getKeynotesData({ commit }) {
        const keynoteList = await this.$http.$get('/api/events/keynotes/')
        commit('setKeynotesData', keynoteList)
    },
    async $getSpeechesData({ commit }, eventType) {
        let endpoint = '/api/events/speeches/'
        if (eventType === 'talks') {
            endpoint = `${endpoint}?event_types=talk,sponsored`
        } else if (eventType === 'tutorials') {
            endpoint = `${endpoint}?event_types=tutorial`
        }
        const speechList = await this.$http.$get(endpoint)
        commit('setSpeechesData', speechList)
    },
    async $getSpeechDetailData({ commit }, { eventType, eventId }) {
        const endpoint = `/api/events/speeches/${eventType}/${eventId}/`
        const SpeechDetail = await this.$http.$get(endpoint)
        commit('setSpeechDetailData', SpeechDetail)
    },
}
