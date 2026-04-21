# Premium Plugins

Drop licensed WordPress plugin `.zip` files in this folder. The EC2 init container
(`aiaiai-wp-init` in `docker-compose.prod.yml`) will install and activate every
`*.zip` in here on first boot.

Typical contents for this project:

- `jet-engine.zip` — JetEngine Pro (required for page meta boxes)
- `seo-by-rank-math-pro.zip` — RankMath Pro (optional; free version is installed automatically)

`*.zip` files in this folder are git-ignored — never commit licensed plugin
archives.
