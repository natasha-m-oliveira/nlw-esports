import { forwardRef, InputHTMLAttributes } from 'react';
import {
  FieldValues,
  UseFormRegister,
  // useForm, // don't need this import
} from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<FieldValues>;
}

type Ref = HTMLInputElement;

export const Input = forwardRef<Ref, InputProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <input
      ref={ref}
      className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 box-border ${
        className ? className : ''
      }`}
      {...rest}
    />
  );
});
