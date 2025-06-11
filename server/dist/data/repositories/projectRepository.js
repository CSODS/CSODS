import { Projects } from '../../db/schema.js';
import { Repository } from './abstractRepository.js';
export default class ProjectRepository extends Repository {
    constructor(context) {
        super(context, Projects);
    }
}
