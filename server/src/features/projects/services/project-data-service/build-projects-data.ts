import { Projects } from "../../types";

/**
 * @description A utility method that builds a new {@link Projects.ProjectStore} object
 * from the provided arguments..
 * todo: update docs
 */
export function buildProjectsData(params: {
  totalPages: number;
  currentDate: Date;
  isBackup?: boolean;
  pageRecord: Record<number, Projects.ProjectDetails[]>;
}): Projects.Store {
  const { totalPages, currentDate, isBackup, pageRecord } = params;

  let pages: Projects.PageRecord = {};
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
