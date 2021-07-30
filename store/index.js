import { set } from '~/utils/store.utils'

export const state = () => ({
    sponsorsData: [],
    jobsData: [],
    keynotesData: [],
    talksData: [],
    talkData: {},
    // tutorialsData: [],
})

export const mutations = {
    setSponsorsData: set('sponsorsData'),
    setJobsData: set('jobsData'),
    setKeynotesData: set('keynotesData'),
    setTalksData: set('talksData'),
    setTalkDetailData: set('talkData'),
    // setTutorialsData: set('tutorialsData'),
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
    async $getTalksData({ commit }) {
        const talkList = await this.$http.$get('/api/events/talks/')
        commit('setTalksData', talkList)
    },
    async $getTalkDetailData({ commit }, id = 0, isSponsored = false) {
        let endpoint = `/api/events/talk/${id}/`
        if (isSponsored) {
            endpoint = `${endpoint}?isSponsored=true`
        }
        const talkData = await this.$http.$get(endpoint)
        commit('setTalkDetailData', talkData)
    },
    // async $getTutorialsData({ commit }) {
    //     const tutorialList = await this.$http.$get('/api/events/tutorials/')
    //     commit('setTutorialsData', tutorialList)
    // },
}
