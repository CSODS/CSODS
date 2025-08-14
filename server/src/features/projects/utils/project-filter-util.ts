import type { ProjectFilter } from "../types";

export class ProjectFilterUtil {
  public static getFilterList(filter?: ProjectFilter): string[] {
    const normalizedFilter = this.normalizeFilter(filter);
    if (!normalizedFilter) return ["nofilter"];

    const filterList = Object.values(normalizedFilter).map((value) =>
      value !== undefined ? value.toString() : "NA"
    );

    return filterList;
  }

  public static normalizeFilter(
    filter?: ProjectFilter
  ): ProjectFilter | undefined {
    if (!filter) return undefined;

    const title = filter.ProjectTitle?.trim();
    const normalizedFilter = {
      ...filter,
      ProjectTitle: title ? title : undefined,
    };

    if (this.isEmptyFilter(normalizedFilter)) return undefined;

    return normalizedFilter;
  }

  public static isEmptyFilter(filter?: ProjectFilter): boolean {
    if (!filter) return true;
    const hasFilter = Object.values(filter).some((val) => val !== undefined);
    return !hasFilter;
  }
}
