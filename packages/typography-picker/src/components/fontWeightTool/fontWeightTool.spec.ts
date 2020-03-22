import Typography from 'typography';
// @ts-ignore
import githubTheme from 'typography-theme-alton';
import fontList from '../../fontList.json';
import { prepareFamilyWeights } from './fontWeightTool';

describe('fontWeightTool Fns', () => {
  test('prepareFamilyWeights transform', () => {
    const newTheme = new Typography(githubTheme);
    let newHeaderFamilyFont = fontList.find(
      font => font.family === newTheme?.options?.bodyFontFamily?.[0],
    );
    const preparedWeights = prepareFamilyWeights({
      weights: newHeaderFamilyFont!.weights,
    });

    expect(
      prepareFamilyWeights({ weights: newHeaderFamilyFont!.weights }),
    ).toEqual(preparedWeights);
  });
});
