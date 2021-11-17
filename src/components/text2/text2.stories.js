import React from "react";

import Text2 from "./text2";

export default {
  component: Text2,
};

const Template = ({ text, ...args }) => <Text2 {...args}>{text}</Text2>;

export const Default = Template.bind({});
Default.args = {
  text: "some data",
};
