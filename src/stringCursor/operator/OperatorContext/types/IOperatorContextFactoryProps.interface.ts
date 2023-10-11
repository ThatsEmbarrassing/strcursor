export interface IOperatorContextFactoryProps {
  /**
   * Source text
   */
  text: string;
  /**
   * Start position of string cursor
   * @defaultValue 0
   */
  startWith?: number;
}
