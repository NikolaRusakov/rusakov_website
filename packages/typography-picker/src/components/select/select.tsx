/** @jsx jsx */
import { jsx } from '@emotion/core';
import { grayscale, saturate, readableColor } from 'polished';

const Select = ({
  options = [],
  style = {},
  value = 0,
  onChange,
}: {
  options: string[];
  value: number | string;
  style: { [key: string]: string };
  onChange: (e: string) => void;
}) => {
  const optionsEls = options.map((text, i) => (
    <option key={i} value={i}>
      {text}
    </option>
  ));
  return (
    <select
      css={theme => ({
        background:
          "url(\"data:image/svg+xml;utf8,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='18' height='18' viewBox='0 0 24 24'><path fill='rgb(153, 153, 153)' d='M7.406 7.828l4.594 4.594 4.594-4.594 1.406 1.406-6 6-6-6z'></path></svg>\")",
        backgroundColor: theme.colors.primary,
        backgroundPosition: '100% 50%',
        backgroundRepeat: 'no-repeat',
        border: '1px solid',
        borderColor: theme.colors.secondary,
        borderRadius: 6,
        color: readableColor(theme.colors.text),
        fontSize: 12,
        width: '100%',
        padding: '2px 8px',
        height: 24,
        outline: 'none',
        // apperance: 'none',
        // mozAppearance: 'none',
        // webkitAppearance: 'none',
        '&:active': {
          borderColor: grayscale('#00E'),
        },
        '&:hover': {
          borderColor: saturate('100', grayscale('#00F')),
        },
        '&:focus': {
          borderColor: saturate('200', grayscale('#00F')),
        },
        ...style,
      })}
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={e => {
        const valueInt = +value;
        let change = false;
        let newValue = 0;
        if (e.which === 40 || e.which === 38) {
          e.preventDefault();
        }
        if (e.which === 40) {
          // arrow down
          change = true;
          // At end?
          if (valueInt === options.length - 1) {
            newValue = 0;
          } else {
            newValue = valueInt + 1;
          }
        }
        if (e.which === 38) {
          // arrow up
          change = true;
          // At beginning?
          if (valueInt === 0) {
            newValue = options.length - 1;
          } else {
            newValue = valueInt - 1;
          }
        }

        // If keyboard press was up or down then change.
        if (change) {
          onChange(newValue.toString());
        }

        return false;
      }}>
      {optionsEls}
    </select>
  );
};

export default Select;
