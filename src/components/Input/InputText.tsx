"use client"

import { ChangeEvent } from "react";
import { Input, type InputProps } from "antd";
import { escapeHtmlEntities } from "@/utils/escapeHtml";

export default function InputText({ onChange, ...rest }: InputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const escapeValue = escapeHtmlEntities(event.target.value)

    if (onChange) {
      const newEvent: ChangeEvent<HTMLInputElement> = {
        ...event,
        target: {
          ...event.target,
          value: escapeValue
        }
      }

      onChange(newEvent)
    }
  }

  return <Input {...rest} onChange={handleChange} />;
}
