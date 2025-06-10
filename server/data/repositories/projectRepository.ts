import { Projects } from '../../db/schema.js';
import { Repository } from './abstractRepository.js';
import { DbContext } from '../../viewmodels/dbModels.js';

export default class ProjectRepository extends Repository<typeof Projects>{

    public constructor (context: DbContext) {
        super(context, Projects);
    }
}
