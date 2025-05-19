"use client";

import React from 'react';
import { Checkbox as AntdCheckbox } from 'antd';
import type { CheckboxProps } from 'antd';

const Checkbox: React.FC<CheckboxProps> = ({ children, ...rest }) => {
  return <AntdCheckbox {...rest}>{children}</AntdCheckbox>;
};

export default Checkbox;
