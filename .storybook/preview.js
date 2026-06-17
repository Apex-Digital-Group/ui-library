import '../src/styles.css'
import '../src/typography.css'

/** @type {import('@storybook/react').Preview} */
const preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: {
      default: 'app',
      values: [
        { name: 'app', value: 'hsl(0 0% 100%)' },
        { name: 'dark', value: 'hsl(0 0% 3.9%)' },
      ],
    },
    layout: 'centered',
  },
  globalTypes: {
    theme: {
      description: 'Color scheme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, ctx) => {
      const theme = ctx.globals.theme || 'light'
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', theme === 'dark')
      }
      return Story()
    },
  ],
}

export default preview
