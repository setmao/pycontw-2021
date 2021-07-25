import { set } from '~/utils/store.utils'

export const state = () => ({
    sponsorsData: [],
    jobsData: [],
    keynotesData: [],
    talksData: [],
    // tutorialsData: [],
})

export const mutations = {
    setSponsorsData: set('sponsorsData'),
    setJobsData: set('jobsData'),
    setKeynotesData: set('keynotesData'),
    setTalksData: set('talksData'),
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
    // async $getTutorialsData({ commit }) {
    //     const tutorialList = await this.$http.$get('/api/events/tutorials/')
    //     commit('setTutorialsData', tutorialList)
    // },
}
