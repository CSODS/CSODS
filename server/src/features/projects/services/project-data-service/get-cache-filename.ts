import { CACHE } from "@/data";
import { ProjectFilter } from "../repositories";
import { HashService } from "@/utils";

/**
 * todo: rename to getKey
 * @param filenameGenerator
 * @param options
 * @returns
 */
export function getCacheFilename(
  filenameGenerator: (...nameElements: string[]) => string,
  options?: {
    isHardBackup?: boolean;
    isToday?: boolean;
    date?: Date;
    filter?: ProjectFilter;
    isFiltered?: boolean;
  }
): string {
  //  Resolve options.
  const isHardBackup: boolean = options?.isHardBackup ?? false;
  const isToday: boolean = options?.isToday ?? false;
  //  todo: replace with static class method implementations for better readability.
  const filter: ProjectFilter | undefined = options?.filter;
  const isFiltered: boolean = options?.isFiltered ?? false;

  //  Assemble filename elements.
  const { HARD_BACKUP, BASE_NAME } = CACHE.PROJECT_CACHE;
  const baseName = isHardBackup ? HARD_BACKUP : BASE_NAME;

  const date: Date | undefined = isToday ? new Date() : options?.date;
  const dateString = date?.toISOString().split("T")[0] ?? "";

  const filterList = filter?.getFilterList() ?? ["nofilter"];

  const hasSearchKey = filter?.hasProjectSearchKey() ?? false;

  filterList[0] = hasSearchKey
    ? HashService.simpleHash(filterList[0]) //  hashed searchkey
    : filterList[0];

  const filterString = isFiltered ? filterList.join("_") : "nofilter";

  return filenameGenerator(baseName, filterString, dateString);
}
