// components/PageInitializer.tsx
import React, { useEffect } from "react";
import { useAuth } from "@/app/_assets/_components/contexts/AuthContext";

import { compileAndRenderJSX } from "@/app/_assets/_utils/lib";
import { InlineReactPageData } from "@/app/_assets/_api/_types/ITemplateTypes";
import {
  GetAllComponentsByFilter,
  GetComponentsByProjectApiHandler,
  GetDirectoriesByFilterApiHandler,
  GetProjectsByFilter,
} from "@/app/_assets/_api/_handlers/InlineReactHandler";
import useComponentStore from "./stores/componentSlice";
import usePageDataStore from "./stores/pageDataSlice";
import useTabsStore from "./stores/tabSlice";
import FetchPageData from "./utils";
import { useQueryState } from "nuqs";
import useDirectoryStore from "./stores/directoriesSlice";

interface PageInitializerProps {
  reactId?: number;
  username: string;
  isPreview?: boolean;
}

const PageInitializer: React.FC<PageInitializerProps> = ({
  reactId,
  username,
  isPreview,
}) => {
  const { user } = useAuth();
  const { setComponents } = useComponentStore();
  const { setPageData } = usePageDataStore();
  const { createTab } = useTabsStore();
  const { setDirectories } = useDirectoryStore();
  const [projectId, setProjectId] = useQueryState("project");

  const PageDataInit = (data: InlineReactPageData, userId?: number) => {
    if (data.components) {
      data.components.forEach((component) => {
        const componentName = component.ChildTitle.split(".")[0];
        const compiledComponent = compileAndRenderJSX(component.ChildScript);
        if (compiledComponent && componentName) {
          (window as any)[componentName] = compiledComponent;
        }
      });
    }

    if (userId && projectId) {
      setComponents([]);
      GetDirectoriesByFilterApiHandler({
        ProjectId: parseInt(projectId),
      }).then((res) => {
        if (res.data.IsSuccess) setDirectories(res.data.Data);
      });
      GetComponentsByProjectApiHandler(parseInt(projectId)).then((res) => {
        //  GetAllComponentsByFilter({ CreatedByUserId: userId, }).then((res) => {
        if (res.data.IsSuccess) {
          const fetchedComponents = res.data.Data;
          const updatedComponents = fetchedComponents.map((component) => {
            const isImported = fetchedComponents.some((r) =>
              r.RelatedTemplates.some(
                (related) => related.ChildId === component.Id
              )
            );
            return { ...component, isImported };
          });
          setComponents(updatedComponents);
          /* createTab({
            code: data.code,
            name: data.name,
            id: data.componentId,
          });
         */
          createTab({
            code: 'render(<h1 className="w-full text-center text-white">Hello World!</h1>)',
            name: "Sample.jsx",
          });
        } else {
          createTab({
            code: "render(<h1>Hello World!</h1>)",
            name: "Sample.jsx",
          });
        }
      });
    }
  };

  useEffect(() => {
    if (isPreview) {
      FetchPageData(username).then((res) => {
        const result = res as InlineReactPageData;
        setPageData(result);
        PageDataInit(result);
      });
    } else {
      if (reactId)
        FetchPageData(reactId)
          .then((res) => {
            const result = res as InlineReactPageData;
            setPageData(result);
            PageDataInit(result, user?.Id);
          })
          .catch(() => {
            createTab({
              code: "render(<h1>Hello World!</h1>)",
              name: "Sample.jsx",
            });
          });
      else if (user)
        FetchPageData(user?.UserName)
          .then((res) => {
            const result = res as InlineReactPageData;
            setPageData(result);
            PageDataInit(result, user?.Id);
          })
          .catch(() => {
            createTab({
              code: "render(<h1>Hello World!</h1>)",
              name: "Sample.jsx",
            });
          });
    }
  }, [projectId]);

  return null;
};

export default PageInitializer;
