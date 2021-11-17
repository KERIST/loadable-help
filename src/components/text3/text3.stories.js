import React from "react";

import Text3 from "./text3";

export default {
  component: Text3,
};

const Template = ({ text, ...args }) => <Text3 {...args}>{text}</Text3>;

export const Default = Template.bind({});
Default.args = {
  text: "some data",
};
