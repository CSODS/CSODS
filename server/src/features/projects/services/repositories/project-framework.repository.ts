import { eq } from "drizzle-orm";
import { DbContext } from "@/db/csods.js";
import { ProjectFramework } from "@models";
import { Repository } from "@services";
import { ProjectFrameworksTable, ProjectFrameworkViewModel } from "../../types";

export class ProjectFrameworkRepository extends Repository<ProjectFrameworksTable> {
  public constructor(context: DbContext) {
    super(context, ProjectFramework);
  }

  public async FindManyByProjectId(
    projectId: number
  ): Promise<ProjectFrameworkViewModel[]> {
    return await this._dbContext.query.ProjectFramework.findMany({
      where: eq(ProjectFramework.projectId, projectId),
    });
  }
}
