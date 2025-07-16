import { ProjectFrameworks } from '../../models/schema.js';
import { Repository } from './abstractRepository.js';
import { DbContext, ProjectFramework } from '../../viewmodels/dbModels.js';
import { eq } from 'drizzle-orm';

export default class ProjectFrameworkRepository extends Repository<typeof ProjectFrameworks>{

    public constructor (context: DbContext) {
        super(context, ProjectFrameworks);
    }

    public async FindManyByProjectId(projectId: number): Promise<ProjectFramework[]> {
        return await this._dbContext.query.ProjectFrameworks.findMany({
            where: eq(ProjectFrameworks.ProjectId, projectId)
        });
    }
}