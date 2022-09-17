import { CaretDown, CaretUp, Check } from 'phosphor-react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Dispatch, SelectHTMLAttributes, SetStateAction } from 'react';

interface Option {
  id: string;
  title: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  selected: string;
  onValueChange: Dispatch<SetStateAction<string>>;
}

export function Select({
  options,
  selected,
  className,
  onValueChange,
  ...props
}: SelectProps) {
  return (
    <SelectPrimitive.Root onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        className={`bg-zinc-900 py-3 px-4 rounded text-small flex justify-between ${
          selected ? 'text-white' : 'text-zinc-500'
        } ${className ? className : ''}`}
      >
        <SelectPrimitive.Value {...props} />

        <SelectPrimitive.Icon className="text-zinc-400">
          <CaretDown size={24} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="bg-zinc-900 rounded overflow-hidden">
          <SelectPrimitive.SelectScrollUpButton>
            <CaretUp size={24} />
          </SelectPrimitive.SelectScrollUpButton>

          <SelectPrimitive.Viewport className="py-2 px-1">
            {options.map(({ id, title }) => (
              <SelectPrimitive.Item
                key={id}
                value={id}
                className="flex items-center justify-between py-2 px-3 m-1 bg-zinc-900 text-zinc-500 cursor-pointer rounded hover:bg-zinc-800 hover:text-white"
              >
                <SelectPrimitive.ItemText>{title}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator>
                  <Check size={24} className="text-emerald-500" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>

          <SelectPrimitive.SelectScrollDownButton>
            <CaretDown size={24} />
          </SelectPrimitive.SelectScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
