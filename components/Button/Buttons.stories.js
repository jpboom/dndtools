import React from 'react';

import Button from './Button';

export default {
    title: 'Component/Button',
    component: Button,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Button {...args} />;

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = {
    children: 'Test button text',
    color: 'blue',
};

export const Green = Template.bind({});
Green.args = {
    children: 'Test button text',
    color: 'green',
};

export const Red = Template.bind({});
Red.args = {
    children: 'Test button text',
    color: 'red',
};

export const Yellow = Template.bind({});
Yellow.args = {
    children: 'Test button text',
    color: 'yellow',
};

export const Purple = Template.bind({});
Purple.args = {
    children: 'Test button text',
    color: 'purple',
};

export const TextDefault = Template.bind({});
TextDefault.args = {
    children: 'Test button text',
    color: 'blue',
    variant: 'text',
};

export const TextGreen = Template.bind({});
TextGreen.args = {
    children: 'Test button text',
    color: 'green',
    variant: 'text',
};

export const TextRed = Template.bind({});
TextRed.args = {
    children: 'Test button text',
    color: 'red',
    variant: 'text',
};

export const TextYellow = Template.bind({});
TextYellow.args = {
    children: 'Test button text',
    color: 'yellow',
    variant: 'text',
};

export const TextPurple = Template.bind({});
TextPurple.args = {
    children: 'Test button text',
    color: 'purple',
    variant: 'text',
};

export const OutlineDefault = Template.bind({});
OutlineDefault.args = {
    children: 'Test button text',
    color: 'blue',
    variant: 'outline',
};

export const OutlineGreen = Template.bind({});
OutlineGreen.args = {
    children: 'Test button text',
    color: 'green',
    variant: 'outline',
};

export const OutlineRed = Template.bind({});
OutlineRed.args = {
    children: 'Test button text',
    color: 'red',
    variant: 'outline',
};

export const OutlineYellow = Template.bind({});
OutlineYellow.args = {
    children: 'Test button text',
    color: 'yellow',
    variant: 'outline',
};

export const OutlinePurple = Template.bind({});
OutlinePurple.args = {
    children: 'Test button text',
    color: 'purple',
    variant: 'outline',
};
