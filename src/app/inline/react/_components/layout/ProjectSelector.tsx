"use client";
import { useState, useEffect } from "react";
import {
  GetProjectsByFilter,
  SaveProjectApiHandler,
} from "@/app/_assets/_api/_handlers/InlineReactHandler";
import { useAuth } from "@/app/_assets/_components/contexts/AuthContext";
import { ProjectDisplayDTO } from "@/app/_assets/_api/_types/_dtos/InlineReactDtos";
import { useQueryState } from "nuqs";
import usePageDataStore from "../stores/pageDataSlice";
import useTabsStore from "../stores/tabSlice";
import { BsDatabaseCheck } from "react-icons/bs";
import useModalStore from "../stores/modalSlice";

const ProjectSelector = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const {
    addedProperties,
    setAddedProperties,
    setCdnLinks,
    projects,
    setProjects,
  } = usePageDataStore();
  const { wipe: wipeTabs } = useTabsStore();
  const [projectId, setProjectId] = useQueryState("project");
  const [selectedItem, setSelectedItem] = useState("----");
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const { setModalVisibility } = useModalStore();
  // Fetch projects when user or dropdown opens
  useEffect(() => {
    if (user && projects.length === 0) {
      GetProjectsByFilter({ StudentId: user?.Id, GetAllItems: false }).then(
        (res) => {
          if (res.data.IsSuccess) {
            const data: ProjectDisplayDTO[] = res.data.Data;
            setProjects(data);
          }
        }
      );
    }
  }, [user, projects.length]);

  // Update dropdown default based on query state
  useEffect(() => {
    const selectedProject = projects.find(
      (project) => project.Id.toString() === projectId
    );
    if (selectedProject) {
      handleItemClick(selectedProject);
    }
  }, [projectId, projects]);
  const handleItemClick = (project: ProjectDisplayDTO) => {
    // Remove existing CDN links
    addedProperties.forEach((prop) => {
      // Check if the property exists on the window object and delete it
      if (window.hasOwnProperty(prop)) {
        delete (window as any)[prop];
      }
      // Select the existing script with the matching data-key
      const existingScript = document.querySelector(
        `script[data-key="${prop}"]`
      );

      if (existingScript) {
        console.log(
          `Removing script with key: ${prop} (src: ${existingScript})`
        ); // Log for debugging
        document.body.removeChild(existingScript);
      } else {
        console.log(`No script found with key: ${prop}`); // Log if no script is found
      }
    });

    // Add new project's CDN links to the window
    const newAddedProperties: string[] = [];
    setCdnLinks(project.CdnLinks);
    project.CdnLinks.forEach((link) => {
      const script = document.createElement("script");
      script.src = link.Url;
      script.async = true; // Ensures non-blocking load
      script.dataset.key = `cdn_${link.Url}`; // Store a key for easy removal later
      script.onload = () => {
        console.log(`Loaded: ${link.Url}`);
      };
      document.body.appendChild(script);

      newAddedProperties.push(`cdn_${link.Url}`);
    });

    // Update the state with the new properties and project details
    setSelectedItem(project.Title);
    setProjectId(project.Id.toString());
    setAddedProperties(newAddedProperties);
    wipeTabs();
    setIsOpen(false);
  };

  const handleAddProject = async () => {
    if (newProjectName.trim()) {
      const response = await SaveProjectApiHandler({
        Title: newProjectName,
        Description: "New project",
        StudentId: user?.Id as number,
      });
      if (response.data.IsSuccess) {
        const newProject = response.data.Data;
        setProjects([...projects, newProject]);
        setNewProjectName("");
        setIsAddingProject(false);
        setSelectedItem(newProject.Title);
        setProjectId(newProject.Id.toString());
      }
    }
    setIsAddingProject(false);
  };

  return (
    <div className="relative flex items-center">
      <button
        className="text-lg p-[0.3rem] mx-1.5 bg-gray-600/20 hover:bg-gray-600 text-white rounded"
        onClick={() => {
          setModalVisibility("isChooseDatabaseModalVisible", true);
        }}
      >
        <BsDatabaseCheck />
      </button>

      <button
        className="text-lg px-2 bg-gray-600/20 hover:bg-gray-600 text-white rounded"
        onClick={() => {
          setIsAddingProject(true);
          setIsOpen(true);
        }}
      >
        +
      </button>
      {/* Project Dropdown */}
      <div className="relative w-72 ml-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between p-4 bg-gray-800 rounded-md cursor-pointer list-none"
        >
          {selectedItem}
          <span className="inline-block w-2 h-2 border-b border-l border-gray-700 rotate-45" />
        </button>
        {isOpen && (
          <ul className="absolute left-0 w-full bg-gray-700 px-4 mt-2 rounded-md max-h-52 overflow-y-auto z-50">
            {projects.map((project) => (
              <li
                key={project.Id}
                className="py-4 border-b border-gray-300 last:border-b-0 hover:text-accent"
              >
                <label
                  className="flex justify-between cursor-pointer"
                  onClick={() => handleItemClick(project)}
                >
                  {project.Title}
                  <span className="w-4 h-4 border border-gray-600 rounded-sm text-center flex justify-center items-center text-accent">
                    {selectedItem == project.Title && "x"}
                  </span>
                </label>
              </li>
            ))}
            {!isAddingProject && (
              <li>
                <button
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  onClick={() => setIsAddingProject(true)}
                >
                  + Add Project
                </button>
              </li>
            )}
            {isAddingProject && (
              <li>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onBlur={handleAddProject}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddProject();
                    }
                  }}
                  placeholder="Enter project name"
                  className="w-full p-2 rounded bg-gray-800 text-white my-2"
                  autoFocus
                />
              </li>
            )}
          </ul>
        )}
      </div>
      {/* Add New Project Button */}
    </div>
  );
};

export default ProjectSelector;
