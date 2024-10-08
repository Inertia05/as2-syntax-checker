// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "as2-syntax-checker" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('as2-syntax-checker.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from AS2 Syntax Checker!');
	});

	context.subscriptions.push(disposable);

    // 创建一个诊断集合，用于存储发现的错误
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('actionscript2');
    context.subscriptions.push(diagnosticCollection);

    // 当文档被打开或修改时触发语法检查
    vscode.workspace.onDidOpenTextDocument(checkDocument);
    vscode.workspace.onDidChangeTextDocument(event => checkDocument(event.document));

    // 定义用于检查 AS2 文档的函数
    function checkDocument(document: vscode.TextDocument) {
        // 只检查 .as 文件（ActionScript 2.0 文件）
        if (document.languageId !== 'actionscript') {
            return;
        }

        let diagnostics: vscode.Diagnostic[] = [];

        // 检查缺少分号的错误
        diagnostics.push(...checkMissingSemicolons(document));
        // 检查括号不匹配的错误
        diagnostics.push(...checkUnmatchedBrackets(document));

        // 将诊断结果设置为当前文档的诊断集合
        diagnosticCollection.set(document.uri, diagnostics);
    }
}

// This method is called when your extension is deactivated
export function deactivate() {}


// 检查缺少分号的函数
function checkMissingSemicolons(document: vscode.TextDocument): vscode.Diagnostic[] {
    let diagnostics: vscode.Diagnostic[] = [];
    let lines = document.getText().split(/\r?\n/);

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        // 忽略空行和注释行
        if (line !== "" && !line.startsWith("//")) {
            // 检查行是否没有以分号结束，忽略大括号的行
            if (!line.endsWith(";") && !line.endsWith("{") && !line.endsWith("}")) {
                let range = new vscode.Range(i, line.length, i, line.length);
                let diagnostic = new vscode.Diagnostic(
                    range,
                    '缺少分号',
                    vscode.DiagnosticSeverity.Warning
                );
                diagnostics.push(diagnostic);
            }
        }
    }

    return diagnostics;
}

// 检查括号不匹配的函数
function checkUnmatchedBrackets(document: vscode.TextDocument): vscode.Diagnostic[] {
    let diagnostics: vscode.Diagnostic[] = [];
    let text = document.getText();
    let stack: { char: string, position: vscode.Position }[] = [];
    let line = 0, column = 0;

    // 遍历文档中的每一个字符
    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char === '\n') {
            line++;
            column = 0;
            continue;
        }

        column++;

        // 如果遇到开括号，压入栈中
        if (char === '(' || char === '{' || char === '[') {
            stack.push({ char, position: new vscode.Position(line, column) });
        } else if (char === ')' || char === '}' || char === ']') {
            // 如果遇到闭括号，检查是否有匹配的开括号
            let last = stack.pop();
            if (!last || !isMatchingPair(last.char, char)) {
                // 没有匹配的开括号，报告错误
                let range = new vscode.Range(line, column, line, column);
                let diagnostic = new vscode.Diagnostic(
                    range,
                    `不匹配的括号: ${char}`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnostics.push(diagnostic);
            }
        }
    }

    // 检查剩下的未闭合的开括号
    while (stack.length > 0) {
        let unmatched = stack.pop();
        let range = new vscode.Range(unmatched!.position, unmatched!.position);
        let diagnostic = new vscode.Diagnostic(
            range,
            `不匹配的括号: ${unmatched!.char}`,
            vscode.DiagnosticSeverity.Error
        );
        diagnostics.push(diagnostic);
    }

    return diagnostics;
}

// 检查是否匹配的括号
function isMatchingPair(open: string, close: string): boolean {
    return (open === '(' && close === ')') ||
           (open === '{' && close === '}') ||
           (open === '[' && close === ']');
}
