# as2-syntax-checker README

# ActionScript 2.0 Syntax Checker

This is a simple VS Code extension that checks for common syntax errors in ActionScript 2.0 (AS2) files. It detects:

- Missing semicolons (`;`)
- Unmatched brackets (parentheses `()`, curly braces `{}`, square brackets `[]`)

## Features

- **Missing Semicolon Detection**: The extension will show a warning if a line in an AS2 file does not end with a semicolon.
- **Unmatched Brackets Detection**: The extension will report an error if there are unmatched parentheses, curly braces, or square brackets.

## How to Use

1. Install the extension from the VS Code Marketplace or manually from the `.vsix` package.
2. Open an ActionScript 2.0 (`.as`) file in VS Code.
3. The extension will automatically analyze the code and highlight any issues with missing semicolons or unmatched brackets.

## Known Issues

- The extension only checks for two types of errors: missing semicolons and unmatched brackets. More features may be added in future versions.

## Release Notes

### 1.0.0
- Initial release with basic syntax checking for missing semicolons and unmatched brackets.

