import { eq } from 'drizzle-orm';
import { ProjectFrameworks } from '@models';
import { DbContext, ProjectFrameworkViewModel } from '@viewmodels';
import { Repository } from './abstractRepository.js';

export class ProjectFrameworkRepository extends Repository<typeof ProjectFrameworks>{

    public constructor (context: DbContext) {
        super(context, ProjectFrameworks);
    }

    public async FindManyByProjectId(projectId: number): Promise<ProjectFrameworkViewModel[]> {
        return await this._dbContext.query.ProjectFrameworks.findMany({
            where: eq(ProjectFrameworks.ProjectId, projectId)
        });
    }
}