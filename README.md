# PM2 Sentry Module
Forwards selected pm2 logs to Sentry.

It supports logs in both RAW and JSON formats of any structure. It does not use Sentry Scopes, Tags etc. at the moment. It simply pushes logs to Sentry in any given structure, with some basic capabilities to translate JSON as additional data passed to Sentry.

# Installation & setup:

Install pm2 module:
```
pm2 install mjaniszew/pm2-sentry
```

Set configs:
- **dsn** - valid DSN url
```
pm2 set pm2-sentry:dsn "https://{key}@{organizationID}.ingest.de.sentry.io/{projectID}"
```

- **processes** - Comma separated list of process names to filter logs. If not provided, nothing will be sent.
```
pm2 set pm2-sentry:processes "app1,app2"
```

- **message** (optional) - For JSON format it is possible to select which field from JSON will serve as message body. Rest of JSON will be passed ass additional data to Sentry.
```
pm2 set pm2-sentry:message_field "message"
```
