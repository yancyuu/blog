export namespace Asset {
  export interface Image {
    [index: string | number]: string | number | string[] | undefined;
    width: string | number;
    height: string | number;
    original: string;
    extraFormats?: string[];
    banner: string;
    800?: string;
    1280?: string;
  }
}
