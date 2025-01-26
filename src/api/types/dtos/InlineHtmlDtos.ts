import { Content } from "../../../../../frontend-techa/app/_assets/_api/_types/IContent";
import BaseDto from "../../../../../frontend-techa/app/_assets/_api/_types/_dtos/BaseDto";
export interface HtmlSnippetDisplayDTO extends BaseDto {
  Title: string;
  Script: string;
  Description: string;
  Content: Content;
}

export interface HtmlSnippetCreateDTO {
  Id?: number;
  Title: string;
  Script: string;
  Description: string;
}
