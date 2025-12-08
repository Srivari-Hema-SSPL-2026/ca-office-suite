---
document_type: "Standard"
version: "1.0"
status: "Active"
audience: ["Developers"]
---

# Code Quality and Linting

This project uses various tools to ensure code quality and consistency.

## Markdown Linting

We use `markdownlint-cli2` to ensure our documentation follows standard markdown practices.

### Markdown Configuration

The configuration is split between two files:

1. **`.markdownlint-cli2.yaml`**: Contains the execution configuration, including globs and ignores.
2. **`.markdownlintignore`**: Specifies files and directories to exclude from linting.

**Note on `node_modules`**:
We explicitly ignore `node_modules` to prevent linting third-party dependencies. This is configured in `.markdownlint-cli2.yaml` using the `ignores` list:

```yaml
ignores:
  - "node_modules"
  - "**/node_modules"
```

### Running the Linter

To check for markdown errors across the entire project:

```powershell
npx markdownlint-cli2
```

To automatically fix fixable errors:

```powershell
npx markdownlint-cli2 --fix "**/*.md"
```

### Common Issues

- **MD040 (fenced-code-language)**: All code blocks must have a language specified (e.g., `javascript`, `markdown`, `plaintext`).
- **MD024 (no-duplicate-heading)**: Avoid duplicate headings within the same document.
- **MD009 (no-trailing-spaces)**: Avoid trailing spaces at the end of lines.

## Link Checking

We use `lychee` to check for broken links in our documentation.

### Lychee Configuration

The configuration is stored in `lychee.toml`. It defines:

- Excluded URLs (e.g., localhost)
- Timeout settings
- Retry attempts

### Running the Link Checker

You can run `lychee` using Docker:

```powershell
docker run --init -it --rm -v ${PWD}:/input -w /input lycheeverse/lychee .
```

This command:

1. Mounts the current directory to `/input` in the container.
2. Sets the working directory to `/input`.
3. Scans all files in the current directory for broken links.
