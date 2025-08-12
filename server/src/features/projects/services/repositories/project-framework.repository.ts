import { eq } from "drizzle-orm";
import { DbContext } from "@/db/csods.js";
import { ProjectFramework } from "@models";
import { Repository } from "@services";
import type { Tables, ViewModels } from "../../types";

export class ProjectFrameworkRepository extends Repository<Tables.ProjectFrameworksTable> {
  public constructor(context: DbContext) {
    super(context, ProjectFramework);
  }

  public async FindManyByProjectId(
    projectId: number
  ): Promise<ViewModels.ProjectFramework[]> {
    return await this._dbContext.query.ProjectFramework.findMany({
      where: eq(ProjectFramework.projectId, projectId),
    });
  }
}
