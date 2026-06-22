import '../src/styles.css'
import '../src/typography.css'

/** @type {import('@storybook/react').Preview} */
const preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    // Render Docs stories in an iframe, not inline. Many components here are
    // full-screen overlays (`position: fixed; inset-0` modals/drawers); Storybook's
    // inline Docs canvas wraps the story in a `transform: scale()` zoom container,
    // and a transformed ancestor makes `position: fixed` resolve against that tiny
    // box instead of the viewport — clipping the modal to a sliver. An iframe has
    // its own viewport, so fixed overlays fill it correctly.
    docs: {
      story: { inline: false, height: '640px' },
    },
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
