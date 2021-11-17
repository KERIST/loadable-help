import GlobalDecorator from "../src/storybook/decorators/global.decorator";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <GlobalDecorator>
      <Story />
    </GlobalDecorator>
  ),
];
