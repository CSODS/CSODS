import { CachePageRecord, IProjectCache, IProjectDetails } from "../../types";

/**
 * @description A utility method that builds a new {@link IProjectCache} object
 * from the provided arguments..
 */
export function buildProjectsData(params: {
  totalPages: number;
  currentDate: Date;
  isBackup?: boolean;
  pageRecord: Record<number, IProjectDetails[]>;
}): IProjectCache {
  const { totalPages, currentDate, isBackup, pageRecord } = params;

  let cachePages: CachePageRecord = {};
  const recordEntries = Object.entries(pageRecord);
  recordEntries.forEach(([pageNumber, projects]) => {
    const numericKey = Number(pageNumber);
    cachePages[numericKey] = {
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
    cachePages,
  };
}
