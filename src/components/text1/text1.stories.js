import React from "react";

import Text1 from "./text1";

export default {
  component: Text1,
};

const Template = ({ text, ...args }) => <Text1 {...args}>{text}</Text1>;

export const Default = Template.bind({});
Default.args = {
  text: "some data",
};
