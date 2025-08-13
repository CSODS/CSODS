import type { ProjectStoreModels } from "../../types/store";

/**
 * @description A utility method that builds a new {@link ProjectStoreModels.ProjectStore} object
 * from the provided arguments..
 * todo: update docs
 */
export function buildProjectsData(params: {
  totalPages: number;
  currentDate: Date;
  isBackup?: boolean;
  pageRecord: Record<number, ProjectStoreModels.ProjectDetails[]>;
}): ProjectStoreModels.Store {
  const { totalPages, currentDate, isBackup, pageRecord } = params;

  let pages: ProjectStoreModels.PageRecord = {};
  const recordEntries = Object.entries(pageRecord);
  recordEntries.forEach(([pageNumber, projects]) => {
    const numericKey = Number(pageNumber);
    pages[numericKey] = {
      createdOn: currentDate,
      lastAccessed: currentDate,
      viewCount: 0,
      totalPages,
      projects,
    };
  });

  return {
    totalPages,
    createdOn: currentDate,
    lastAccessed: currentDate,
    viewCount: 1,
    isBackup: isBackup ?? false,
    pages,
  };
}
