"use client"

import { ChangeEvent } from "react";
import { Input } from "antd";
import { escapeHtmlEntities } from "@/utils/escapeHtml";
import type { TextAreaProps } from "antd/es/input";

export default function InputTextArea({ onChange, ...rest }: TextAreaProps) {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const escapeValue = escapeHtmlEntities(event.target.value);

    if (onChange) {
      const newEvent: ChangeEvent<HTMLTextAreaElement> = {
        ...event,
        target: {
          ...event.target,
          value: escapeValue,
        },
      };

      onChange(newEvent);
    }
  };

  return <Input.TextArea onChange={handleChange} {...rest} />;
}
