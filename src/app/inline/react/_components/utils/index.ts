import {
  GetAllComponentsByFilter,
  GetDirectoryByIdApiHandler,
  GetReactTemplateById,
  mainComponentFilter,
} from "@/app/_assets/_api/_handlers/InlineReactHandler";
import { GetUserByUsername } from "@/app/_assets/_api/_handlers/UserHandlers";
import { ReactTemplateDisplayDTO } from "@/app/_assets/_api/_types/_dtos/InlineReactDtos";
import TemplateType, {
  InlineReactPageData,
} from "@/app/_assets/_api/_types/ITemplateTypes";

async function FetchPageData(
  username: string
): Promise<InlineReactPageData | Error>;
async function FetchPageData(
  reactId: number,
  userId?: number
): Promise<InlineReactPageData | Error>;
async function FetchPageData(): Promise<InlineReactPageData | Error>;

// Implementation
async function FetchPageData(
  reactId?: string | number,
  userId?: number
): Promise<InlineReactPageData | Error> {
  try {
    let response;
    if (!reactId) {
    }
    if (typeof reactId === "string") {
      console.log(reactId);
      const User = await GetUserByUsername(reactId);
      response = await GetAllComponentsByFilter({
        //...mainComponentFilter,
        CreatedByUserId: User.data.Data.Id,
      });
    } else if (typeof reactId === "number") {
      response = await GetReactTemplateById(reactId);
    } else {
      response = await GetAllComponentsByFilter({
        ...mainComponentFilter,
        CreatedByUserId: userId,
      });
    }

    if (response.status !== 200) {
      return new Error(response.data.Data as string);
    }

    if (!response.data.IsSuccess) {
      throw new Error(
        !response.data.IsSuccess
          ? response.data.Message
          : "کامپوننت مورد نظر وجود ندارد!"
      );
    }

    const { Id, Script, Title, IsMain, RelatedTemplates, DirectoryId } =
      response.data.Data as ReactTemplateDisplayDTO;
    let projectId = undefined;
    if (DirectoryId) {
      const projectId = (await GetDirectoryByIdApiHandler(DirectoryId)).data
        .Data.ProjectId;
    }
    const data: InlineReactPageData = {
      componentId: Id,
      isMain: IsMain,
      name: Title,
      code: Script,
      isTutorial: typeof reactId === "string",
      components: RelatedTemplates,
      procedures: [],
      projectId: projectId,
    };
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default FetchPageData;
