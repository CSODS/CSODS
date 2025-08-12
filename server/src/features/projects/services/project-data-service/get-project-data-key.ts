import { CACHE } from "@/data";
import { HashService } from "@/utils";
import type { ProjectFilter } from "../../types";
import { ProjectFilterUtil } from "../../utils";

/**
 * @param filenameGenerator
 * @param options
 * @returns
 */
export function getProjectDataKey(options?: {
  isHardBackup?: boolean;
  isToday?: boolean;
  date?: Date;
  filter?: ProjectFilter;
  isFiltered?: boolean;
}): string {
  //  Resolve options.
  const isHardBackup: boolean = options?.isHardBackup ?? false;
  const isToday: boolean = options?.isToday ?? false;
  //  todo: replace with static class method implementations for better readability.
  const filter = options?.filter;

  //  Assemble filename elements.
  const { HARD_BACKUP, BASE_NAME } = CACHE.PROJECT_CACHE;
  const baseName = isHardBackup ? HARD_BACKUP : BASE_NAME;

  const date: Date | undefined = isToday ? new Date() : options?.date;
  const dateString = date?.toISOString().split("T")[0] ?? "";

  const filterList = ProjectFilterUtil.getFilterList(filter);

  const hasSearchKey = !!filter?.ProjectTitle?.trim();

  filterList[0] = hasSearchKey
    ? HashService.simpleHash(filterList[0]) //  hashed searchkey
    : filterList[0];

  const filterString = filterList.join("_");

  return generateKey(baseName, filterString, dateString);
}

function generateKey(...keyElements: string[]) {
  const filtered = keyElements.filter(Boolean); // filter out falsy values.
  return keyElements.join("-");
}
