<template>
    <div class="flex flex-col px-4 py-8 bg-gray-900 text-golden">
        <div class="flex justify-center">
            <div class="flex flex-col">
                <locale-link to="/about/code-of-conduct">
                    {{ $t('codeOfConduct') }}
                </locale-link>
                <!-- 
                <locale-link to="/about/staff">{{ $t('staff') }}</locale-link>
                <locale-link to="/about/community">
                    {{ $t('community') }}
                </locale-link>
                <locale-link to="/about/privacy-policy">
                    {{ $t('privacyPolicy') }}
                </locale-link>
                -->
            </div>
        </div>
        <div class="flex justify-center mt-10">
            <div class="">
                <ext-link class="m-8" href="https://pycontw.blogspot.tw/">
                    Blogspot
                </ext-link>
                <ext-link class="m-8" href="https://www.facebook.com/pycontw">
                    Facebook
                </ext-link>
                <ext-link class="m-8" href="https://twitter.com/pycontw">
                    Twitter
                </ext-link>
                <a
                    href="mailto:organizers@pycon.tw"
                    target="_blank"
                    class="outline-none m-8"
                >
                    Email
                </a>
            </div>
        </div>
        <div class="flex justify-center mt-16 text-2xl cursor-default">
            PyCon Taiwan
        </div>
    </div>
</template>

<script>
import i18n from './Footer.i18n'
import { ExtLink, LocaleLink } from '~/components/core/links'

export default {
    i18n,
    name: 'CoreFooter',
    components: {
        ExtLink,
        LocaleLink,
    },
}
</script>

<style scoped></style>
