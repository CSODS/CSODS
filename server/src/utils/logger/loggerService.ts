import winston from "winston";

const { combine, errors, json, timestamp, prettyPrint, align, printf } = winston.format;

export const ProjectsCacheLogger = winston.createLogger({
    level: 'info',
    format: combine(
        errors({stack: true}),
        timestamp( {
            format: 'YYYY-MM-DD hh:mm:ss.SSS A'
        }),
        align(),
        printf((info) => `[cache] [${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ dirname: 'logs', filename: 'project_cache.log'})
    ]
});

export const JobsLogger = winston.createLogger({
    level: 'info',
    format: combine(
        errors({stack: true}),
        timestamp( {
            format: 'YYYY-MM-DD hh:mm:ss.SSS A'
        }),
        align(),
        printf((info) => `[cron] [${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ dirname: 'logs', filename: 'jobs.log'})
    ]
});

export const FileLogger = winston.createLogger({
    level: 'info',
    format: combine(
        errors({stack: true}),
        timestamp( {
            format: 'YYYY-MM-DD hh:mm:ss.SSS A'
        }),
        align(),
        printf((info) => `[file] [${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console({ level: 'error' }),
        new winston.transports.File({ dirname: 'logs', filename: 'files.log'})
    ]
});

export const DbLogger = winston.createLogger({
    level: 'info',
    format: combine(
        errors({stack: true}),
        timestamp( {
            format: 'YYYY-MM-DD hh:mm:ss.SSS A'
        }),
        align(),
        printf((info) => `[database] [${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console({ level: 'error' }),
        new winston.transports.File({ dirname: 'logs', filename: 'database.log'})
    ]
});

export const RouteLogger = winston.createLogger({
    level: 'info',
    format: combine(
        errors({stack: true}),
        timestamp( {
            format: 'YYYY-MM-DD hh:mm:ss.SSS A'
        }),
        align(),
        printf((info) => {
            const durationMs = info.durationMs;

            const profilingMessage = durationMs ? `[${durationMs}ms]` : '';

            return `[route] [${info.timestamp}] ${info.level}: ${info.message} ${profilingMessage}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ dirname: 'logs', filename: 'routes.log'})
    ]
});