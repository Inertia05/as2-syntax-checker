(()=>{"use strict";var e={265:function(e,t,n){var i=this&&this.__createBinding||(Object.create?function(e,t,n,i){void 0===i&&(i=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,i,o)}:function(e,t,n,i){void 0===i&&(i=n),e[i]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.activate=function(e){console.log('Congratulations, your extension "as2-syntax-checker" is now active!');const t=s.commands.registerCommand("as2-syntax-checker.helloWorld",(()=>{s.window.showInformationMessage("Hello World from AS2 Syntax Checker!")}));e.subscriptions.push(t);const n=s.languages.createDiagnosticCollection("actionscript2");function i(e){if("actionscript"!==e.languageId)return;let t=[];t.push(...function(e){let t=[],n=e.getText().split(/\r?\n/);for(let e=0;e<n.length;e++){let i=n[e].trim();if(!(""===i||i.startsWith("//")||i.endsWith(";")||i.endsWith("{")||i.endsWith("}"))){let n=new s.Range(e,i.length,e,i.length),o=new s.Diagnostic(n,"缺少分号",s.DiagnosticSeverity.Warning);t.push(o)}}return t}(e)),t.push(...function(e){let t=[],n=e.getText(),i=[],o=0,r=0;for(let e=0;e<n.length;e++){let u=n[e];if("\n"!==u){if(r++,"("===u||"{"===u||"["===u)i.push({char:u,position:new s.Position(o,r)});else if(")"===u||"}"===u||"]"===u){let e=i.pop();if(!(e&&(a=e.char,c=u,"("===a&&")"===c||"{"===a&&"}"===c||"["===a&&"]"===c))){let e=new s.Range(o,r,o,r),n=new s.Diagnostic(e,`不匹配的括号: ${u}`,s.DiagnosticSeverity.Error);t.push(n)}}}else o++,r=0}for(var a,c;i.length>0;){let e=i.pop(),n=new s.Range(e.position,e.position),o=new s.Diagnostic(n,`不匹配的括号: ${e.char}`,s.DiagnosticSeverity.Error);t.push(o)}return t}(e)),n.set(e.uri,t)}e.subscriptions.push(n),s.workspace.onDidOpenTextDocument(i),s.workspace.onDidChangeTextDocument((e=>i(e.document)))},t.deactivate=function(){};const s=r(n(398))},398:e=>{e.exports=require("vscode")}},t={},n=function n(i){var o=t[i];if(void 0!==o)return o.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}(265);module.exports=n})();