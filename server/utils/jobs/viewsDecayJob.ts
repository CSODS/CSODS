import cron from "node-cron";
import { ProjectsViewsDecayService } from "../viewDecay/projectsViewDecayService.js";

export function createViewsDecayJobService() {
    return new ViewsDecayJobService();
}

/**
 * Schedules viewsDecayJob
 */
export class ViewsDecayJobService {
    private readonly _projectsViewsDecayService: ProjectsViewsDecayService;

    public constructor() {
        this._projectsViewsDecayService = new ProjectsViewsDecayService(0.2);
    }

    public scheduleViewsDecay() {
        cron.schedule('0 * * * * *', async () => {
            await this._projectsViewsDecayService.decayCachePagesViews({ decayTopLevel: true });    // include top level decay
        });
    }
}