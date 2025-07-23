import { eq } from "drizzle-orm";
import { DbContext } from "@/db/csods.js";
import { ProjectFramework } from "@models";
import { ProjectFrameworksTable, ProjectFrameworkViewModel } from "@viewmodels";
import { Repository } from "./abstractRepository.js";

export class ProjectFrameworkRepository extends Repository<ProjectFrameworksTable> {
  public constructor(context: DbContext) {
    super(context, ProjectFramework);
  }

  public async FindManyByProjectId(
    projectId: number
  ): Promise<ProjectFrameworkViewModel[]> {
    return await this._dbContext.query.ProjectFrameworks.findMany({
      where: eq(ProjectFramework.ProjectId, projectId),
    });
  }
}
