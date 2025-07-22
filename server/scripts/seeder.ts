import { DbContext, createContext } from "../src/db/csods.js";
import * as schema from "../src/models/schema.js";

async function main() {
    const context = await createContext();

    await seedDevtypes(context);

    await seedLanguages(context);
    
    await seedDbTechnologies(context);
    
    await seedApplicationIndustries(context);
    
    await seedGameDevFrameworks(context);
    await seedWebDevFrameworks(context);
    await seedSoftwareDevFrameworks(context);
    await seedApiDevFrameworks(context);

    await seedRoles(context);
}

main();

async function seedDevtypes(context: DbContext) {
    const devTypes = 'Game Development, Web Development, Software Development, API Development';
    await context.insert(schema.DevTypes)
    .values(
        devTypes.split(", ")
            .map((name) => ({
                DevTypeName: name
            })
        )
    ).onConflictDoNothing();
}

async function seedLanguages(context: DbContext) {
    const languages = 'C#, C, C++, Java, JavaScript/TypeScript, Python, Ruby';
    await context.insert(schema.ProgrammingLanguages)
    .values(
        languages.split(", ")
            .map((name) => ({
                LanguageName: name
            })
        )
    ).onConflictDoNothing();
}

async function seedDbTechnologies(context: DbContext) {
    const dbTechs = 'MySQL, PostgreSQL, Microsoft SQL Server, Oracle Database, SQLite, ' 
                    +'MariaDB, MongoDB, Cassandra, Redis, Firebase, DynamoDB';
    await context.insert(schema.DatabaseTechnologies)
    .values(
        dbTechs.split(", ")
            .map((name) => ({
                Database: name
            })
        )
    ).onConflictDoNothing();
}

async function seedApplicationIndustries(context: DbContext) {
    const appIndustries = 'Medical, Finance, Education, Retail, Manufacturing, '
                        + 'Telecommunications, Government, Non-profit, Sports';
    await context.insert(schema.ApplicationIndustry)
    .values(
        appIndustries.split(", ")
            .map((name) => ({
                Industry: name
            })
        )
    ).onConflictDoNothing();
}

async function seedGameDevFrameworks(context: DbContext) {
    const gameDevFrameworks = 'Unity, Unreal Engine, Godot';
    await context.insert(schema.Frameworks)
    .values(
        gameDevFrameworks.split(", ")
            .map((name) => ({
                DevTypeId: 1,
                FrameworkName: name
            })
        )
    ).onConflictDoNothing();
}

async function seedWebDevFrameworks(context: DbContext) {
    const webDevFrameworks = 'React, Angular, Vue.js, Svelte, Next.js, '
                            +'Nuxt.js, Django, Flask, Ruby on Rails, '
                            +'ASP.NET Core, Laravel, Spring Boot, Symfony';
    
    await context.insert(schema.Frameworks)
    .values(
        webDevFrameworks.split(", ")
            .map((name) => ({
                DevTypeId: 2,
                FrameworkName: name
            })
        )
    ).onConflictDoNothing();
}

async function seedSoftwareDevFrameworks(context: DbContext) {
    const softwareDevFrameworks = 'React Native, Flutter, Xamarin, Ionic, Electron, Qt, WPF';
    
    await context.insert(schema.Frameworks)
    .values(
        softwareDevFrameworks.split(", ")
            .map((name) => ({
                DevTypeId: 3,
                FrameworkName: name
            })
        )
    ).onConflictDoNothing();
}

async function seedApiDevFrameworks(context: DbContext) {
    const apiDevFrameworks = 'FastAPI, Express.js, Spring Boot, Gin, Koa';
    await context.insert(schema.Frameworks)
    .values(
        apiDevFrameworks.split(", ")
            .map((name) => ({
                DevTypeId: 4,
                FrameworkName: name
            })
        )
    ).onConflictDoNothing();
}

async function seedRoles(context: DbContext) {
    const roles = ['Guest', 'Student', 'Moderator', 'Administrator'];
    await context.insert(schema.Roles)
    .values(
        roles.map((role) => ({
            RoleName: role
        }))
    ).onConflictDoNothing();
}