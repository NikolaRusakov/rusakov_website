/** @jsx jsx */
import React, { useReducer, useEffect, useRef } from 'react';
import Typography from 'typography';
import { Lens } from 'monocle-ts';
import fontList from '../../fontList.json';
import Select from '../select/select';
import SectionTool from '../sectionTool/sectionTool';
import NumberEditor from '../numberEditor/numberEditor';
import { parseUnit } from '../..';
import ModularScaleTool from '../modularScaleTool/modularScaleTool';
import FontSelectTool from '../fontSelectTool/fontSelectTool';
import FontWeightTool from '../fontWeightTool/fontWeightTool';
import { Global, jsx } from '@emotion/core';
import { desaturate, readableColor, transparentize } from 'polished';
import namingDefault from '../../naming.json';
import {
  TypographyState,
  FontList,
  TypographyOptions,
} from '@saltit/typography-picker';

export interface DesignToolProps {
  defaultTheme: TypographyOptions;
  themeNames: string[];
  themes: { name: string; title: string; requireTheme: () => Promise<any> }[];
  onChange: (options: TypographyOptions) => void;
  trigger: string;
  naming?: typeof namingDefault;
}

type ActionThemeType = {
  action: 'changeState';
  payload: Partial<TypographyState>;
};

type ActionFontType = {
  action: 'changeFont';
  payload: {
    options: Typography;
    headerFamily?: FontList;
    bodyFamily?: FontList;
  };
};

type ActionOptionsType = {
  action: 'modifyOptions';
  payload: { [P in keyof TypographyOptions]: TypographyOptions[P] };
};

function reducer(
  state: TypographyState,
  action: ActionThemeType | ActionOptionsType | ActionFontType,
): TypographyState {
  switch (action.action) {
    case 'changeState':
      return { ...state, ...action.payload };
    case 'changeFont':
      return {
        ...state,
        ...(action.payload.headerFamily && {
          headerFamily: action.payload.headerFamily,
        }),
        ...(action.payload.bodyFamily && {
          bodyFamily: action.payload.bodyFamily,
        }),
        typography: action.payload.options,
      };
    case 'modifyOptions':
      return Lens.fromPath<TypographyState>()(['typography', 'options']).modify(
        s => ({
          ...s,
          ...action.payload,
        }),
      )(state);
    default:
      throw new Error();
  }
}

const Section: React.FC = ({ children, ...props }) => (
  <div
    style={{
      clear: 'both',
      paddingBottom: 3.75,
      paddingLeft: 7.5,
      paddingRight: 7.5,
      flexDirection: 'column',
    }}
    {...props}>
    {children}
  </div>
);
const SectionRow: React.FC = ({ children }) => (
  <div
    style={{
      marginBottom: 3.75,
      overflow: 'hidden',
    }}>
    {children}
  </div>
);

const SectionHeader: React.FC = ({ children }) => (
  <div
    css={theme => ({
      borderBottom: `2px solid ${theme.colors.secondary}`,
      color: readableColor(theme.colors.primary),
      fontSize: 20,
      paddingLeft: 7.5,
      marginLeft: -7.5,
      marginRight: -7.5,
      marginBottom: 3.75,
    })}>
    {children}
  </div>
);

export const DesignTool: React.FC<DesignToolProps> = ({
  defaultTheme,
  themeNames,
  themes,
  onChange,
  trigger,
  naming = namingDefault,
}) => {
  const typography = new Typography(defaultTheme);
  const [state, dispatch] = useReducer(reducer, {
    typography,
    theme: 0,
    bodyFamily: fontList[0],
    headerFamily: fontList[0],
  });

  const prevTrigger = useRef(trigger);

  useEffect(() => {
    onChange(state.typography.options);
  }, [state.typography.options]);

  useEffect(() => {
    if (trigger !== prevTrigger.current && trigger !== 'default') {
      prevTrigger.current = trigger;
      onChange(state.typography.options);
    }
  }, [trigger]);
  // details[open] summary {

  return (
    <React.Fragment>
      <Global
        styles={{
          '.designToolToggle:checked + .designTool': {
            display: 'none !important',
          },
          '.designToolToggle': {
            display: 'block',
            height: '24px',
            width: '24px',
          },
        }}
      />
      <input className="designToolToggle" type="checkbox" />
      <div
        className="designTool"
        css={theme => ({
          backgroundColor: transparentize(
            0.2,
            desaturate(0.3, theme.colors.primary),
          ),
          color: readableColor(theme.colors.text),
          fontFamily: state.typography?.options?.headerFontFamily?.toString(),
          fontSize: 20,
          lineHeight: 1.5,
          letterSpacing: 0,
          position: 'fixed',
          width: 'auto',
          minHeight: '100px',
          top: 0,
          right: 0,
          // @ts-ignore
          WebkitFontSmoothing: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
        })}>
        <Section css={{ display: 'flex', maxWidth: '15ch' }}>
          <h2
            css={theme => ({
              color: readableColor(theme.colors.text),
              fontFamily: state.typography?.options?.headerFontFamily?.toString(),
              fontSize: 20,
              fontWeight: 300,
              marginBottom: 0,
              marginTop: 10,
              borderBottom: `2px solid ${theme.colors.secondary}`,
            })}>
            <em>{naming.typographyPicker}</em>
          </h2>
          <SectionRow>
            <div
              css={{
                display: 'flex',
                maxWidth: '15ch',
                fontSize: 16,
              }}>
              {naming.pickTheme}
            </div>
            <Select
              options={themeNames}
              value={state.theme}
              style={{
                height: '6ch',
                width: '100%',
                overflow: 'hidden',
                wordWrap: 'normal',
                whiteSpace: 'normal',
              }}
              onChange={async value => {
                const createTheme = await themes[+value].requireTheme();
                const changeState = new Typography(createTheme.default);
                let newBodyFamily: FontList =
                  fontList.find(font => font.family === value) || fontList[0];

                let newHeaderFamily: FontList =
                  fontList.find(font => font.family === value) || fontList[0];
                dispatch({
                  action: 'changeState',
                  payload: {
                    theme: parseInt(value, 10),
                    typography: changeState,
                    bodyFamily: newBodyFamily,
                    headerFamily: newHeaderFamily,
                  },
                });
              }}
            />
          </SectionRow>
        </Section>
        <Section css={{ display: 'flex', width: '16em' }}>
          <SectionHeader>{naming.baseSizes}</SectionHeader>
          <SectionRow>
            <SectionTool title={naming.fontSize}>
              <NumberEditor
                unit="px"
                value={
                  parseUnit(state.typography.options.baseFontSize || '')[0]
                }
                min={9}
                max={100}
                step={0.25}
                decimals={2}
                onValueChange={baseFontSize =>
                  setTimeout(() => {
                    dispatch({
                      action: 'modifyOptions',
                      payload: {
                        baseFontSize,
                      },
                    });
                  })
                }
              />
            </SectionTool>
            <SectionTool title={naming.lineHeight}>
              <NumberEditor
                unit={naming.number}
                value={state.typography.options.baseLineHeight ?? 1}
                min={1}
                max={2.5}
                step={0.01}
                decimals={2}
                onValueChange={value => {
                  dispatch({
                    action: 'modifyOptions',
                    payload: {
                      baseLineHeight: value,
                    },
                  });
                }}
              />
            </SectionTool>
          </SectionRow>
          <SectionRow>
            <SectionTool title={naming.paragraphSpacing}>
              <NumberEditor
                unit={naming.rhythm}
                value={state.typography.options.blockMarginBottom ?? 0}
                min={0.25}
                max={3}
                step={0.1}
                decimals={2}
                onValueChange={value =>
                  dispatch({
                    action: 'modifyOptions',
                    payload: {
                      blockMarginBottom: parseFloat(value),
                    },
                  })
                }
              />
            </SectionTool>
            <ModularScaleTool
              key="scale"
              naming={naming}
              scaleRatio={state.typography.options.scaleRatio || ''}
              onChange={newScale =>
                dispatch({
                  action: 'modifyOptions',
                  payload: {
                    scaleRatio: newScale,
                  },
                })
              }
            />
          </SectionRow>
        </Section>

        <Section css={{ display: 'flex' }}>
          <SectionHeader>{naming.headers}</SectionHeader>
          <SectionRow>
            <div>{naming.typeface}</div>
            <FontSelectTool
              type="header"
              options={state.typography.options}
              onSelectChange={(options, headerFamily) =>
                dispatch({
                  action: 'changeFont',
                  payload: {
                    options: new Typography(options),
                    headerFamily,
                  },
                })
              }
            />
          </SectionRow>
          <SectionRow>
            <SectionTool title={naming.weight}>
              <FontWeightTool
                type="header"
                family={state.headerFamily}
                weight={state.typography.options.headerWeight ?? 400}
                options={state.typography.options}
                onChange={newOptions =>
                  dispatch({ action: 'modifyOptions', payload: newOptions })
                }
              />
            </SectionTool>
          </SectionRow>
        </Section>

        <Section css={{ display: 'flex' }}>
          <SectionHeader>{naming.body}</SectionHeader>
          <SectionRow>
            <div>{naming.typeface}</div>
            <FontSelectTool
              type="body"
              options={state.typography.options}
              onSelectChange={(options, bodyFamily) =>
                dispatch({
                  action: 'changeFont',
                  payload: {
                    options: new Typography(options),
                    bodyFamily,
                  },
                })
              }
            />
          </SectionRow>
          <SectionRow>
            <SectionTool title={naming.bodyWeight}>
              <FontWeightTool
                type="body"
                family={state.bodyFamily}
                weight={state.typography.options.bodyWeight || 0}
                options={state.typography.options}
                onChange={newOptions =>
                  dispatch({ action: 'modifyOptions', payload: newOptions })
                }
              />
            </SectionTool>
            <SectionTool title={naming.boldWeight}>
              <FontWeightTool
                type="bold"
                family={state.bodyFamily || fontList[0]}
                weight={state.typography.options.boldWeight || 0}
                options={state.typography.options}
                onChange={newOptions =>
                  dispatch({ action: 'modifyOptions', payload: newOptions })
                }
              />
            </SectionTool>
          </SectionRow>
        </Section>
      </div>
    </React.Fragment>
  );
};

export default DesignTool;
