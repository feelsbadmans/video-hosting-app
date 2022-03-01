export type Styles = {
  'app': string;
  'appHeader': string;
  'appLink': string;
  'appLogo': string;
  'appLogoFloat': string;
  'biba': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
