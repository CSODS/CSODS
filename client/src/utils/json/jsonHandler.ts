export class JsonHandler {
    public parseJson<TModel>(jsonString: string): TModel {
        return JSON.parse(jsonString);
    }
}