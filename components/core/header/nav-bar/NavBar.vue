<template>
    <nav class="h-full flex justify-evenly items-center">
        <nav-bar-item-dropdown
            :label="$t('about')"
            :items="aboutItems"
            :class="getPageClassesByPath('about')"
        >
        </nav-bar-item-dropdown>
        <!-- <locale-link
            to="/conference/schedule"
            :class="getPageClassesByPath('schedule', true)"
            customized
            >{{ $t('schedule') }}</locale-link
        > -->
        <nav-bar-item-dropdown
            :label="$t('speaking')"
            :items="speakingItems"
            :class="getPageClassesByPath('speaking')"
        >
        </nav-bar-item-dropdown>
        <nav-bar-item-dropdown
            :label="$t('conference')"
            :items="conferenceItems"
            :class="getPageClassesByPath('conference')"
        >
        </nav-bar-item-dropdown>
        <!-- <locale-link
            to="/sponsor"
            :class="getPageClassesByPath('sponsor', true)"
            customized
        >
            {{ $t('sponsor') }}
        </locale-link> -->
        <!-- <nav-bar-item-dropdown
            :label="$t('speaking')"
            :items="speakingItems"
            :class="getPageClassesByPath('speaking')"
        >
        </nav-bar-item-dropdown> -->
        <!-- <locale-link
            to="/registration/tickets"
            :class="getPageClassesByPath('tickets', true)"
            customized
        >
            {{ $t('registration') }}
        </locale-link> -->
        <!--
        <locale-link to="/venue" :class="getPageClassesByPath('venue', true)">
            {{ $t('venue') }}
        </locale-link> -->
        <ext-link
            :href="signInUrl"
            :class="getPageClassesByPath('signIn', true)"
        >
            {{ $t('signIn') }}
        </ext-link>
    </nav>
</template>

<script>
import navBarItems from '@/components/core/header/nav-bar/nav-bar-items'
import NavBarItemDropdown from './NavBarItemDropdown'
import i18n from './NavBar.i18n'
import { ExtLink } from '~/components/core/links'
// import { ExtLink, LocaleLink } from '~/components/core/links'

export default {
    i18n,
    name: 'CoreHeaderNavBar',
    components: {
        NavBarItemDropdown,
        ExtLink,
        // LocaleLink,
    },
    computed: {
        conferenceItems() {
            return this.generateI18nItems(navBarItems.conference)
        },
        speakingItems() {
            return this.generateI18nItems(navBarItems.speaking)
        },
        aboutItems() {
            return this.generateI18nItems(navBarItems.about)
        },
        signInUrl() {
            return `https://tw.pycon.org/prs/${this.$i18n.locale}/dashboard/`
        },
    },
    methods: {
        generateI18nItems(items) {
            return items.map(({ i18nKey, value }) => ({
                label: this.$i18n.t(i18nKey),
                value,
            }))
        },
        getPageClassesByPath(category, isLink = false) {
            const items = navBarItems[category]

            const nameRegex = RegExp(
                String.raw`${category}-[\w-]+___${this.$i18n.locale}`,
                'g',
            )
            let isOnCurrentPath = !!this.$route.name.match(nameRegex)

            if (items && !isLink) {
                const paths = items.map(
                    (item) => `/${this.$i18n.locale}${item.value}`,
                )
                isOnCurrentPath =
                    isOnCurrentPath || paths.includes(this.$route.path)
            }
            if (isLink) {
                const re = RegExp(
                    String.raw`\w+-${category}___${this.$i18n.locale}`,
                    'g',
                )
                isOnCurrentPath =
                    isOnCurrentPath || !!this.$route.name.match(re)
            }
            return {
                'core-navBarItem': true,
                flex: isLink,
                'h-full': isLink,
                'justify-center': isLink,
                'items-center': isLink,
                'px-8': isLink,
                'py-2': isLink,
                'bg-transparent': !isOnCurrentPath,
                '--active': isOnCurrentPath,
            }
        },
    },
}
</script>

<style scoped>
.core-navBarItem {
    color: #c7c7c7;
    font-weight: 700;
}

.core-navBarItem:hover {
    color: #c386ae;
}

.core-navBarItem.--active,
.core-navBarItem.--active .options-menu {
    color: #c386ae;
}
</style>
