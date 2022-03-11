export type Styles = {
  app: string;
  layout: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
