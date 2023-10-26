/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx, html}',
    './index.html',
    './src/App.scss',
  ],
  theme: {
    fontFamily: {
      normal: ['Gilroy-Regular', 'sans-serif'],
      medium: ['Gilroy-Medium', 'sans-serif'],
      bold: ['Gilroy-Bold', 'sans-serif'],
      extraBold: ['Gilroy-ExtraBold', 'sans-serif'],
      // serif: ['inter', 'serif'],
    },
    borderWidth: {
      0: '0px',
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
    },
    fontSize: {
      10: [
        '10px',
        {
          lineHeight: '1',
          fontWeight: '400',
        },
      ],
      11: [
        '11px',
        {
          lineHeight: '1',
          fontWeight: '400',
        },
      ],
      12: [
        '12px',
        {
          lineHeight: '1',
          fontWeight: '400',
        },
      ],
      13: [
        '13px',
        {
          lineHeight: '1',
          fontWeight: '400',
        },
      ],
      14: [
        '14px',
        {
          lineHeight: '19.5px',
          fontWeight: '400',
        },
      ],
      16: [
        '16px',
        {
          lineHeight: '19.5px',
          fontWeight: '600',
        },
      ],
      18: [
        '18px',
        {
          lineHeight: '19.5px',
          fontWeight: '400',
        },
      ],
      20: [
        '20px',
        {
          lineHeight: '25px',
          fontWeight: '500',
        },
      ],
      22: [
        '22px',
        {
          lineHeight: '40px',
          fontWeight: '400',
        },
      ],
      24: [
        '24px',
        {
          lineHeight: '40px',
          fontWeight: '400',
        },
      ],
      26: [
        '26px',
        {
          lineHeight: '40px',
          fontWeight: '400',
        },
      ],
      28: [
        '28px',
        {
          lineHeight: '40px',
          fontWeight: '400',
        },
      ],
      30: [
        '30px',
        {
          lineHeight: '1.233',
          fontWeight: '900',
        },
      ],
      40: [
        '40px',
        {
          lineHeight: '1.2',
          fontWeight: '900',
        },
      ],
      44: [
        '44px',
        {
          lineHeight: '1.2',
          fontWeight: '900',
        },
      ],
      50: [
        '50px',
        {
          lineHeight: '1.2',
          fontWeight: '900',
        },
      ],
      70: '70px',
    },
    gradientColorStops: {
      //       theme => ({
      // ...theme('colors'),
    },
    variants: {
      extend: {
        backgroundColor: ['current'],
        textColor: ['current'],
        boxShadow: ['current'],
      },
    },
    extend: {
      colors: {
        current: 'currentColor',
        mainBg: 'var(--color-main-bg)',
      },
      textColor: {
        gray: 'var(--color-text-gray)',
        grayHover: 'var(--color-text-gray-hover)',
        main: 'var(--color-main)',
        menu: 'var(--menu-text)',
        task: 'var(--task-text)',
        checkboxIcon: 'var(--checkbox--icon-active)',
        inputFocus: 'var(--input-focus-text)',
        placeholder: 'var(--input-placeholder)',
        redTag: 'var(--color-text-red-tag)',
        greenTag: 'var(--color-text-green-tag)',
        yellowTag: 'var(--color-text-yellow-tag)',
        blueTag: 'var(--color-text-blue-tag)',
        purpleTag: 'var(--color-text-purple-tag)',
        grayTag: 'var(--color-text-gray-tag)',
        seaTag: 'var(--color-text-sea-tag)',
        pinkTag: 'var(--color-text-pink-tag)',
        redTagSecond: 'var(--color-text-red-second-tag)',
        greenTagSecond: 'var(--color-text-green-second-tag)',
        yellowTagSecond: 'var(--color-text-yellow-second-tag)',
        blueTagSecond: 'var(--color-text-blue-second-tag)',
        purpleTagSecond: 'var(--color-text-purple-second-tag)',
        grayTagSecond: 'var(--color-text-gray-second-tag)',
        seaTagSecond: 'var(--color-text-sea-second-tag)',
        pinkTagSecond: 'var(--color-text-pink-second-tag)',
        imageColor: 'var(--image-color)',
        tagDelete: 'var(--tag-delete)',
        expired: 'var(--expired)',
      },
      backgroundColor: {
        main: 'var(--color-main)',
        mainBg: 'var(--color-main-bg)',
        gray: 'var(--color-bg-gray)',
        grayHover: 'var(--color-bg-gray-hover)',
        menu: 'var(--menu-button-hover)',
        nav: 'var(--nav-bg)',
        navButtonHover: 'var(--navbutton-bg-hover)',
        checkmark: "url('/src/assets/Checkmark.svg')",
        checkboxActive: 'var(--checkbox-active)',
        devider: 'var(--stroke)',
        inputFocus: 'var(--input-focus-bg)',
        redTag: 'var(--color-red)',
        greenTag: 'var(--color-green)',
        yellowTag: 'var(--color-yellow)',
        blueTag: 'var(--color-blue)',
        purpleTag: 'var(--color-purple)',
        grayTag: 'var(--color-gray)',
        seaTag: 'var(--color-sea)',
        pinkTag: 'var(--color-pink)',
        scroll: 'var(--bg-scroll)',
      },
      borderColor: {
        header: 'var(--border-header)',
        search: 'var(--menu-text)',
        checkbox: 'var(--checkbox)',
        stroke: 'var(--stroke)',
        checkboxActive: 'var(--checkbox-active)',
        input: 'var(--color-main-bg)',
        warning: 'var(--expired)',
        borderHover: 'var(--border-hover)',
        borderMain: 'var(--color-main-bg)',
        blueBorder: 'var(--input-focus-bg)',
        currentDate: 'var(--border-active-day)',
      },
      placeholderColor: {
        search: 'var(--menu-text)',
      },
      gradientColorStops: {
        main: 'var(--color-main-bg)',
        green: '#339523',
        mainBg: 'var(--color-main-bg)',
      },
      screens: {
        '3xl': '1600px',
        'widescreen': { raw: '(min-aspect-ratio: 3/2)' },
        'tallscreen': { raw: '(max-aspect-ratio: 13/20)' },
      },
      // backgroundImage: {
      //   checkmark: "url('/src/assets/Checkmark.svg')",
      // },
      boxShadow: {
        button: '0 0 15px rgba(0, 0, 0, 0.25)',
        card: '0 0 15px rgba(0, 0, 0, 0.25)',
      },
      // keyframes: {
      //   'open-menu': {
      //     '0%': { transform: 'scaleY(0)' },
      //     '80%': { transform: 'scaleY(1.2)' },
      //     '100%': { transform: 'scaleY(1)' },
      //   },
      // },
      // animation: {
      //   'open-menu': 'open-menu 0.5s ease-in-out forwards',
      // },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        200: '200',
        201: '201',
      },
    },
    opacity: {
      0: '0',
      20: '0.2',
      40: '0.4',
      60: '0.6',
      80: '0.8',
      85: '0.85',
      90: '0.9',
      100: '1',
    },
    lineHeight: {
      0: '0',
      1: '1',
      1.2: '1.2',
      1.233: '1.233',
      1.5: '1.5',
      1.6: '1.6',
      1.8: '1.8',
      2: '2',
      2.5: '2.5',
      3: '3',
      3.5: '3.5',
      4: '4',
      4.5: '4.5',
      5: '5',
    },
  },
}
