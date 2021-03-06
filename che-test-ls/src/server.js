/*
 * Copyright (c) 2012-2018 Red Hat, Inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Red Hat, Inc. - initial API and implementation
 */
'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
var vscodeLS = require("vscode-languageserver");
var connection = vscodeLS.createConnection();
console.log = connection.console.log.bind(connection.console);
console.error = connection.console.error.bind(connection.console);
var documents = new vscodeLS.TextDocuments();
documents.listen(connection);

connection.onInitialize(function (params) {
    setTimeout(()=>{
        connection.window.showErrorMessage("Error Message!!!!", {"title": "No"}, {"title": "Yes"}).then((action)=>{
            console.log(action.title);
        });
    }, 1000);
    return {
        capabilities: {
            // Tell the client that the server works in FULL text document sync mode
            textDocumentSync: documents.syncKind,
            completionProvider:  { resolveProvider: true, triggerCharacters: ['.'] },
            hoverProvider: true,
            documentSymbolProvider: true,
            documentRangeFormattingProvider: false
        }
    };
});



// Listen on the connection
connection.listen();
