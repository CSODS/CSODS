var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createContext } from "../db/csods.js";
import * as schema from "../db/schema.js";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const context = yield createContext();
        const devTypes = 'Game Development, Web Development, Software Development, API Development';
        yield context.insert(schema.DevTypes)
            .values(devTypes.split(", ")
            .map((name) => ({
            DevTypeName: name
        }))).onConflictDoNothing();
        const languages = 'C#, C, C++, Java, JavaScript/TypeScript, Python, Ruby';
        yield context.insert(schema.ProgrammingLanguages)
            .values(languages.split(", ")
            .map((name) => ({
            LanguageName: name
        }))).onConflictDoNothing();
        const dbTechs = 'MySQL, PostgreSQL, Microsoft SQL Server, Oracle Database, SQLite, '
            + 'MariaDB, MongoDB, Cassandra, Redis, Firebase, DynamoDB';
        yield context.insert(schema.DatabaseTechnologies)
            .values(dbTechs.split(", ")
            .map((name) => ({
            Database: name
        }))).onConflictDoNothing();
        const appIndustries = 'Medical, Finance, Education, Retail, Manufacturing, '
            + 'Telecommunications, Government, Non-profit, Sports';
        yield context.insert(schema.ApplicationIndustry)
            .values(appIndustries.split(", ")
            .map((name) => ({
            Industry: name
        }))).onConflictDoNothing();
        const gameDevFrameworks = 'Unity, Unreal Engine, Godot';
        yield context.insert(schema.Frameworks)
            .values(gameDevFrameworks.split(", ")
            .map((name) => ({
            DevTypeId: 1,
            FrameworkName: name
        }))).onConflictDoNothing();
        const webDevFrameworks = 'React, Angular, Vue.js, Svelte, Next.js, '
            + 'Nuxt.js, Django, Flask, Ruby on Rails, '
            + 'ASP.NET Core, Laravel, Spring Boot, Symfony';
        yield context.insert(schema.Frameworks)
            .values(webDevFrameworks.split(", ")
            .map((name) => ({
            DevTypeId: 2,
            FrameworkName: name
        }))).onConflictDoNothing();
        const softwareDevFrameworks = 'React Native, Flutter, Xamarin, Ionic, Electron, Qt, WPF';
        yield context.insert(schema.Frameworks)
            .values(softwareDevFrameworks.split(", ")
            .map((name) => ({
            DevTypeId: 3,
            FrameworkName: name
        }))).onConflictDoNothing();
        const apiDevFrameworks = 'FastAPI, Express.js, Spring Boot, Gin, Koa';
        yield context.insert(schema.Frameworks)
            .values(apiDevFrameworks.split(", ")
            .map((name) => ({
            DevTypeId: 4,
            FrameworkName: name
        }))).onConflictDoNothing();
    });
}
main();
